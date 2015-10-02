$(document).ready(function() {
  $(window).showuptrigger({
    trigger: '#last-of-body-contains',
    callback: function() { alert("Welcome to the last of 'window contains'"); },
  });

  $('.container').showuptrigger({
    trigger: '#last-of-div-contains',
    callback: function() { alert("Welcome to the last of 'div contains'"); },
  });

  $('.fixed tbody').showuptrigger({
    trigger: '#last-of-tbody-contains',
    callback: function() { alert("Welcome to the last of 'tbody contains'"); },
  });

  $(window).showuptrigger({
    trigger: '#last-of-off',
    callback: function() { alert('Never called'); },
  }).showuptrigger('off');
});
