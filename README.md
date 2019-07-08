# JSDialogs
A minimal way to add modal dialogs on your web page with vanilla Javascript.

## Usage

#### Standar version (`jsdialogs.js` and `jsdialogs.min.js`)

In the simplest usage, you just need to add the js file and call `run()`, passing a message or html in text format or a Node Object, a boolean parameter (true to ask for confirmation, false to let it be just a fancy alert), and a callback for the accept case.

```html
<script src="/path_to_folder/jsdialogs.min.js" charset="utf-8"></script>
<script type="text/javascript">
  let trigger = document.getElementById('something');
  trigger.onclick = function(){
    jsdialog.run({dialog_content: 'this dialog was triggered', is_confirmation_dialog: true}, 
      function(){
        alert("you have accepted the dialog");
      })
  }
</script>
```

In order to avoid conflicts with namespaces of other libraries yo could be using, the code is wrapped in a class and then auto-instance an object called `jsdialog`. Thats why you must call `jsdialog.run()` instead of just `run()`.

NOTE: Your own js script must be placed at the end of `body`, or in `head` wrapping everything in a [`window.onload`](https://developer.mozilla.org/es/docs/Web/API/GlobalEventHandlers/onload) event ([here](https://stackoverflow.com/questions/21761954/load-external-javascript-file-after-onload) is an example of how load `jsdialogs` code after `window.onload` event), but for practiceness, placing it at the end of `body` is recomended. The scritp tag that load `jsdialogs` code must always be placing before your own js code.

#### Exportable version (`jsdialogs_module.js` and `jsdialogs_module.min.js`)

If your code works with javascript modules you just need to import it in your own js file as follows:

```javascript
"use strict";

import * as jsdialog from "/path_to_folder/jsdialogs_module.min.js";

```

From that, everything is the same as the standar version of `jsdialogs`.

---

#### `jsdialog.run({dialog_content, is_confirmation_dialog} [, callback])`
- **`dialog_content`** : Can be a simple phrase, HTML code in string format or a Node Object created with `document.createElement()`
- **`is_confirmation_dialog`** : A boolean. If `true`, will show accept and cancel buttons, otherwise just show an accept button.
- **`callback`** : the function that will be called only if accept button is clicked (can be used aswell for non confirmation dialogs). Being confirmation or alert, callback can be omitted.
  
The object unpacking `{dialog_content, is_confirmation_dialog}` purpose is, because those params are so related, could be comfy give them throw a function. E.g.:

```javascript
function event_validator(){
  //checking things
  return {dialog_content: "Are you sure?", is_confirmation_dialog: true};
}

event_trigger.onclick = function(){
  jsdialog.run(event_validator(), function(){console.log('done')} );
}
```

## Customization

`JSDialog` has 3 attributes:
- **accept_button_label**: default value is `'Accept'`. Will change the accept button text.
- **cancel_button_label**:  default value is `'Cancel'`. Will change the cancel button text.
- **delay_time_to_clean**: default value is `0`. After clicking accept or cancel button, the dialog is cleaned. If you made an animation for hide/show the dialog, it will be visible that the dialog turns empty. To avoid that you can set in ms the delay for cleaning the dialog.

These attributes can be changed wherever you want.
```javascript
jsdialog.set_accept_button_label('Aceptar');
jsdialog.set_cancel_button_label('Cancelar');
jsdialgo.set_delay_time_to_clean(150); //0.15s
```
---

`JSDialog` has 6 CSS #ids:
- **`#jsdialog_box`** : the box is, by default, a no visible div, with `position: absolute` and a size of the whole viewport. Used for centering the dialog. If you want to darken the background or make a transition for the show/hide, this is the proper id.
- **`#jsdialog_panel`** : the panel is the centered visible div where the content and buttons are holded.
- **`#jsdialog_content_box`** : the content holder div, if you use just text as content. Otherwise, could be better ignore it and use your own css for the html you created as content.
- **`#jsdialog_buttons_box`** : for the buttons holder div.
- **`#jsdialog_accept_button`** : for the accept button only.
- **`#jsdialog_cancel_button`** : for the cancel button only.

`jsdialog_box` and `jsdialog_panel` have a basic predefined css, just for make floating and centering the dialog. This predefined CSS can be found as `style` tag in the html `head`.
