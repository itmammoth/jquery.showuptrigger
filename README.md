# jquery.showuptrigger
showuptrigger is a jQuery plugin that allows you to set a callback function when an element is showing up.
- Simple codebase (maybe too)
- Not too much options
- Adapted also for overflow elements

## Usage
Include jquery.showuptrigger-*VERSION*.min.js after jQuery like below
```
<script src="lib/jquery-1.11.x.min.js"></script>
<script src="showuptrigger-0.0.1.min.js"></script>
```

Then,
```
$('.scrollable-container').showuptrigger({
  trigger: '#last-element',
  callback: function() { alert('Welcome to the bottom!'); },
});
```

## Requirements
- Tested with jQuery 1.11.x

## Changelog
#### Version 0.0.1
- Initial version
