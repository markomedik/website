"use strict";

$(window).load(function () {

  function setError($input) {
    $input.parent().addClass("has-error")
    $input.focus();
    $input.select();
  }

  const $form = $("#navbar form");
  const $pane = $("#navbar span");

  $form.submit(event => {
    // Stopping the form from actually submitting data to the server
    event.preventDefault();

    const $mail = $form.find(`input[name="mail"]`);
    const $pass = $form.find(`input[name="pass"]`);

    // Serialization segment (Getting data from the form)
    const {mail, pass} = Object.fromEntries(
      $form
        .serializeArray()
        .reduce((acc, {name, value,}) => (acc.push([name, value]), acc), [])
    );

    // Validation segment (Validating data in the form)

    // Resetting the state of input validation
    $mail.parent().removeClass("has-error")
    $pass.parent().removeClass("has-error")

    if(!/^[a-z]\w{2,15}$/.test(mail)) {
      return setError($mail);
    }
    if(!pass.length) {
      return setError($pass);
    }

    // Simulating a simple authentication pattern
    // NOTE: NOT TO BE USED except for demo purposes as the BE should be doing this
    switch(mail) {
      case "marko":
        if(pass !== "malimojpass") {
          return setError($pass);
        }
        break;
      case "ostoja":
        if(pass !== "somelongpassword") {
          return setError($pass);
        }
        break;
      default:
        return setError($pass);
    }

    // Form submit successful resolution
    $pane.text(`Welcome ${mail}!`);
    $form.toggle();
    $pane.toggle();
  })
});
