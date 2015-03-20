/*
 * scrolltrigger
 *
 * Usage:
 *
 * $('.scrollable-container').scrolltrigger({
 *   trigger: '#last-element',
 *   callback: function() { alert('Welcome to the bottom!'); },
 * });
 *
 */
(function($) {
  $.fn.scrolltrigger = function(options) {
    var settings = $.extend({
      trigger: '#scrolltrigger',  // trigger element (jQeury object or selector)
      callback: function() {},    // callback function
    }, options);

    return this.each(function() {
      var $container = $(this);
      var isContainerWindow = (this === window);
      var $trigger = (isContainerWindow ? $(settings.trigger) : $container.find(settings.trigger));
      var calcVisibleBottom = createVisibleBottomCalculator($container, isContainerWindow);
      var calcTriggerTop = createTriggerTopCalculator($container, isContainerWindow, $trigger);

      var eventId = generateId();

      $container.on('scroll.' + eventId, function(e) {
//        console.debug(calcVisibleBottom() + ':' + calcTriggerTop());
        if (calcVisibleBottom() > calcTriggerTop()) {
          $container.off('.' + eventId);
          settings.callback();
        }
      });
    });
  };

  function generateId() {
    var randam = Math.floor(Math.random() * 1000);
    var time = new Date().getTime();
    return randam + time.toString();
  }

  function createVisibleBottomCalculator($container, isContainerWindow) {
    if (isContainerWindow) {
      return function() {
        return $container.scrollTop() + $container.height();
      };
    } else {
      return function() {
        return $container.scrollTop() + $container.height() + $container.offset().top;
      };
    }
  }

  function createTriggerTopCalculator($container, isContainerWindow, $trigger) {
    if (isContainerWindow) {
      return function() {
        return $trigger.offset().top
      };
    } else {
      return function() {
        return $trigger.offset().top + $container.scrollTop();
      };
    }
  }
})(jQuery);




/*
 * main
 */
$(document).ready(function() {
  $(window).scrolltrigger({
    trigger: '#last1',
    callback: function() { alert('welcome to last1!'); },
  });
  $(window).scrolltrigger({
    trigger: '#last2',
    callback: function() { alert('welcome to last2!'); },
  });
  $('.container').scrolltrigger({
    trigger: '#last3',
    callback: function() { alert('welcome to last3!'); },
  });
  $('.fixed tbody').scrolltrigger({
    trigger: '#last4',
    callback: function() { alert('welcome to last4!'); },
  });
});
