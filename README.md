# jquery.showuptrigger
showuptrigger is a jQuery plugin that allows you to set a callback function when a particular element is showing up.
- Simple codebase (maybe too)
- Not too much options
- Adapted also for overflow elements

## Usage
Include jquery.showuptrigger-*VERSION*.min.js after jQuery like below
```
<script src="jquery.min.js"></script>
<script src="js/min/showuptrigger-VERSION.js"></script>
```

Then,
```
$('.scrollable-container').showuptrigger({
  trigger: '#last-element',
  callback: function() { alert('Welcome to the bottom!'); },
});
```

## Methods

### $jqObj.showuptrigger('off')
You can stop a showuptrigger object from observing scroll event.
```
$container = $('.scrollable-container').showuptrigger({
  trigger: '#last-element',
  callback: function() { alert('Never called.'); },
});
...
...
$container.showuptrigger('off');  // Stop observing
```

## Requirements
- Tested with jQuery 1.11.x

## Contribution
- Fork me, then ```$ npm install```

## Changelog

#### Version 0.0.2
- Added 'off' method

#### Version 0.0.1
- Initial version
