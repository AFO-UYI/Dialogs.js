# JSDialogs
A minimal way to add modal dialogs on your web page with vanilla Javascript.

## Usage

In the simplest usage, you just need to add the js file and call `run()`, passing a message or html in text format or a Node Object, if is to ask for confirmation or just a fancy alert, and a callback for the accept case.

```html
<script src="dialogs.js" charset="utf-8"></script>
<script type="text/javascript">
  let trigger = document.getElementById('something');
  trigger.onclick = function(){
    jsdialog.run({dialog_content: 'this dialog was triggered', is_confirmation_dialog: true}, 
      function(){
        alert("And now you accept the dialog");
      })
  }
</script>
```

To avoid conflicts with namespaces of other libraries you could using, the code is wrapped in a class and then auto-instance an object called `jsdialog`. Thats why you must call `jsdialog.run()` instead of just `run()`.

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
- **accept_button_label**: default value is `'Accept'`. Will change the text of accept button.
- **cancel_button_label**:  default value is `'Cancel'`. Will change the text of cancel button.
- **delay_time_to_clean**: default value is `0`. After clicking accept or cancel button, the dialog is cleaned. If you made an animation for hide/show the dialog, will be visible that the dialog turns empty. To avoid that you can set in ms the delay for cleaning the dialog.

These attributes can be changed wherever you want.
```javascript
jsdialog.accept_button_label = 'Aceptar';
jsdialog.cancel_button_label = 'Cancelar';
jsdialgo.delay_time_to_clean = 150; //0.15s
```

`JSDialog` has 6 CSS #ids:
- **`#jsdialog_box`** : the box is a, by default, no visible div, with `position: absolute` and a size of the whole viewport. Used for centering the dialog. If you want darken the background or make a transition for the show/hide, this is the proper id.
- **`#jsdialog_panel`** : the panel is the visible centered div where the content and buttons are holded.
- **`#jsdialog_content_box`** : the content holder div, if you use just text as content. Otherwise, could be better ignore it and use your own css of the html you created as content.
- **`#jsdialog_buttons_box`** : for the buttons holder div.
- **`#jsdialog_accept_button`** : for the accept button only.
- **`#jsdialog_cancel_button`** : for the cancel button only.

`jsdialog_box` and `jsdialog_panel` have a basic predefined css. Just for make floating and centering the dialog. This predefined CSS can be found as `style` tag in the html `head`.
