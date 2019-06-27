'use strict';

/*Creation of the basic html for dialogs_box:
 | dialog_root
 | | dialog_panel
 | | | dialog_content
 | | | dialog_buttons
 */
let dialogs_holder = (function(){
  let dialog_root = document.createElement('div');
  dialog_root.setAttribute('id', 'jsdialog_box');

  let dialog_panel = document.createElement('div');
  dialog_panel.setAttribute('id', 'jsdialog_panel');
  let dialog_content_box = document.createElement('div');
  dialog_content_box.setAttribute('id', 'jsdialog_content_box');
  let dialog_button_box = document.createElement('div');
  dialog_button_box.setAttribute('id', 'jsdialog_buttons_box');

  dialog_panel.appendChild(dialog_content_box);
  dialog_panel.appendChild(dialog_button_box);

  dialog_root.appendChild(dialog_panel);

  document.getElementsByTagName('BODY')[0].appendChild(dialog_root);

  return dialog_root;
  })();

//inserting style tag in head with basic css for dialogs
document.getElementsByTagName('head')[0].appendChild((function(){

  let dialog_css = document.createElement('style');
  dialog_css.type = 'text/css';
  dialog_css.innerHTML = `#jsdialog_box{
      opacity:0;
      position: absolute;
      left: 0;
      top: 0;
      pointer-events: none;
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    #jsdialog_box.active{
      opacity: 1;
      pointer-events: auto;
    }

    #jsdialog_panel{
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }`;

  return dialog_css
})());

//shortcuts vars
let content_holder = dialogs_holder.children[0].children[0];
let buttons_holder = dialogs_holder.children[0].children[1];

//configurable values
let accept_button_label = 'Accept';
let cancel_button_label = 'Cancel';
let delay_time_to_clean = 0;

/*############################################################################*/

function set_accept_button_label(label_text){
  accept_button_label = label_text;
}

/*############################################################################*/

function set_cancel_button_label(label_text){
  cancel_button_label = label_text;
}

/*############################################################################*/

function set_delay_time_to_clean(delay_time){
  delay_time_to_clean = delay_time;
}

/*############################################################################*/

function hide(){
  /*hide and clean dialogs content and buttons. Cleaning has a delay
   option for better style in hide transition.
  */
  dialogs_holder.classList.remove('active');
  setTimeout(function(){
    content_holder.innerHTML = '';
    buttons_holder.innerHTML = '';
  }, delay_time_to_clean);
}

/*############################################################################*/

function show(){
  dialogs_holder.classList.add('active');
}

/*############################################################################*/

function set_dialog_content(html_content){

  if (typeof(html_content) === 'string') {
    content_holder.innerHTML = html_content;
  } else {
    /*if the content is a Node, save the old content_holder, clone the new
     content in the dialog attribute and add the id, and replace in the DOM
     the new content with the old one.*/
    let old_content_holder = content_holder;
    content_holder = html_content.cloneNode(true);
    content_holder.setAttribute('id', 'jsdialog_content');
    old_content_holder.replaceWith(content_holder);
  }
}

/*############################################################################*/

function add_accept_button(callback = false){
  let accept_button = document.createElement('button');
  accept_button.setAttribute('id', 'jsdialog_accept_button');
  accept_button.innerText = accept_button_label;
  accept_button.onclick = function(){
    hide();
    if (callback) {
      callback();
    }
  }
  buttons_holder.appendChild(accept_button);
}

/*############################################################################*/

function add_cancel_button(){
  let cancel_button = document.createElement('button');
  cancel_button.setAttribute('id', 'jsdialog_cancel_button');
  cancel_button.innerText = cancel_button_label;
  cancel_button.onclick = function(){
    hide();
  }
  buttons_holder.appendChild(cancel_button);
}

/*############################################################################*/

function run({dialog_content, is_confirmation_dialog}, callback){

  set_dialog_content(dialog_content);

  if (is_confirmation_dialog) {
    add_accept_button(callback);
    add_cancel_button();
  } else {
    add_accept_button(callback);
  }

  show();
}

export { set_accept_button_label, set_cancel_button_label, set_delay_time_to_clean, run };
