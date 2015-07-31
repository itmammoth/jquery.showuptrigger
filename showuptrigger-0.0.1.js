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
   * jQuery plugin
   */
  $.fn.showuptrigger = function(options) {
    var settings = $.extend({
      trigger: '#showuptrigger',  // trigger element (jQeury object or selector)
      callback: function() {},    // callback function
    }, options);

    return this.each(function() {
      var showupTrigger = ShowupTrigger.createInstance(this, settings);
      showupTrigger.observe();
    });
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
        var eventId = this.generateId();
        var that = this;

        this.$container.on('scroll.' + eventId, function(e) {
          if (that.calcVisibleBottom() > that.calcTriggerTop()) {
            that.$container.off('.' + eventId);
            that.settings.callback();
          }
        });
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
