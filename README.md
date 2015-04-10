fc-select-list
==============

jQuery script that converts any select element into an unorganized list.

Version: 0.2
Status: beta
Instruction status: beta

Requirements:
=============
- jquery-1.10.2 (still not tested with older versions)

Files required:
===================
Search the css and js files located in fc-select-list folder.
- fc-select-list.css
- fc-select-list.js




Basic Usage:
===================
To trigger invoke the function to the selector
```
$('#first').fc_select_list();
```

Basic Usage Code Example:
=========================
```
<script type="text/javascript" src="http://code.jquery.com/jquery-1.10.2.min.js" /></script>
<link href="fc-select-list/fc-select-list.css" rel="stylesheet" type="text/css">
<script src="fc-select-list/fc-select-list.js" type="text/javascript"></script>
<script type="text/javascript">
  $(document).ready(function() {
    $('#first').fc_select_list();
  });
</script>
```


