/*
 * showuptrigger
 *
 * Usage:
 *
 * $('.scrollable-container').showuptrigger({
 *   trigger: '#last-element',
 *   callback: function() { alert('Welcome to the bottom!'); },
 * });
 *
 */
(function($) {
  /*
   * Instance methods
   */
  var methods = {
    init: function(options) {
      var settings = $.extend({
        trigger: '#showuptrigger',  // trigger element (jQeury object or selector)
        callback: function() {},    // callback function
      }, options);

      return this.each(function() {
        var showupTrigger = ShowupTrigger.createInstance(this, settings);
        showupTrigger.observe();
        $(this).data('showuptrigger', showupTrigger);
      });
    },

    off: function() {
      return this.each(function() {
        var showupTrigger = $(this).data('showuptrigger');
        showupTrigger.stopObserving();
      });
    },
  };

  /*
   * plugin
   */
  $.fn.showuptrigger = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' +  method + ' does not exist on jQuery.tooltip');
    }
  };

  /*
   * ShowupTrigger - Base
   */
  var ShowupTrigger = (function() {
    var ShowupTrigger = {};

    // factory method
    ShowupTrigger.createInstance = function(container, settings) {
      if (container === window) {
        return new WindowShowupTrigger(settings);
      } else {
        return new RegionShowupTrigger(container, settings);
      }
    };

    // instance methods
    ShowupTrigger.prototype = {
      observe: function() {
        this.eventId = this.generateId();
        var that = this;

        this.$container.on('scroll.' + this.eventId, function(e) {
          if (that.calcVisibleBottom() > that.calcTriggerTop()) {
            that.$container.off('.' + that.eventId);
            that.settings.callback();
          }
        });
      },

      stopObserving: function() {
        this.$container.off('.' + this.eventId);
      },

      generateId: function() {
        var randam = Math.floor(Math.random() * 1000);
        var time = new Date().getTime();
        return randam + time.toString();
      },
    };

    return ShowupTrigger;
  })();

  /*
   * WindowShowupTrigger
   *
   * - This is used when the scrollable container is the window object.
   */
  var WindowShowupTrigger = (function() {
    var WindowShowupTrigger = function(settings) {
      this.settings = settings;
      this.$container = $(window);
      this.$trigger = $(settings.trigger);
    };

    // instance methods
    $.extend(WindowShowupTrigger.prototype, ShowupTrigger.prototype, {

      calcVisibleBottom: function() {
        return this.$container.scrollTop() + this.$container.height();
      },

      calcTriggerTop: function() {
        return this.$trigger.offset().top;
      },
    });

    return WindowShowupTrigger;
  })();

  /*
   * RegionShowupTrigger
   *
   * - This is used when the scrollable container is an overflow element.
   *   For example, tbody set with 'overflow: scroll' in its css.
   */
  var RegionShowupTrigger = (function() {
    var RegionShowupTrigger = function(container, settings) {
      this.settings = settings;
      this.$container = $(container);
      this.$trigger = $(settings.trigger);
    };

    // instance methods
    $.extend(RegionShowupTrigger.prototype, ShowupTrigger.prototype, {

      calcVisibleBottom: function() {
        return this.$container.scrollTop() + this.$container.height() + this.$container.offset().top;
      },

      calcTriggerTop: function() {
        return this.$trigger.offset().top + this.$container.scrollTop();
      },
    });

    return RegionShowupTrigger;
  })();

})(jQuery);
