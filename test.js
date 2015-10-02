$(document).ready(function() {
  $(window).showuptrigger({
    trigger: '#last1',
    callback: function() { alert('welcome to last1!'); },
  });
  $(window).showuptrigger({
    trigger: '#last2',
    callback: function() { alert('welcome to last2!'); },
  });
  $('.container').showuptrigger({
    trigger: '#last3',
    callback: function() { alert('welcome to last3!'); },
  });
  $('.fixed tbody').showuptrigger({
    trigger: '#last4',
    callback: function() { alert('welcome to last4!'); },
  });
  $(window).showuptrigger({
    trigger: '#last5',
    callback: function() { alert('keep silence'); },
  }).showuptrigger('off');
});
