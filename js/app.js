document.querySelector('#info').addEventListener('submit', formValidation);


//Validate form data function declaration
function formValidation() {

    //Form fields variable declarations
    const name  = document.getElementById('ame'),
            email  = document.getElementById('email'),
            message  = document.getElementById('message'),
            checkBox = document.getElementById('check-box'),
            checkDiv = document.getElementById('check-div'),
            success = document.getElementById('success');

    //Error divs
    const errorName  = document.getElementById('error-name'),
            errorEmail  = document.getElementById('error-email'),
            errorMessage  = document.getElementById('error-message'),
            errorCheck  = document.getElementById('error-check');

    let errors = true;

    //RegEx variable declarations
    const nameRGEX = /^[A-Z a-z\s'.-]{1,20}$/,
   emailRGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //Validate First Name
    let nameResult = nameRGEX.test(name.value);
    if (!nameResult || name.value === '') {
        errorName.innerHTML = 'Field Required. 20 Characters max.';
        name.style.border = 'red solid 1px';
        errors = false;
    } else {
        errorName.innerHTML = '';
        firstName.style.border = null;
    }



    //Validate email
    let emailResult = emailRGEX.test(email.value);
    if (!emailResult || email.value === '') {
        errorEmail.innerHTML = 'Field Required. Please ensure you have provided a valid email address.';
        email.style.border = 'red solid 1px';
        errors = false;
    } else {
        errorEmail.innerHTML = '';
        email.style.border = null;
    }

        //Validate Message
        if ( message.value === '') {
            errorMessage.innerHTML = 'Field Required.';
            message.style.border = 'red solid 1px';
            errors = false;
        } else {
            errorMessage.innerHTML = '';
            message.style.border = null;
        }

    //Check if checkbox is checked
    if (!checkBox.checked){
        errorCheck.innerHTML = 'Check the consent box';
        checkDiv.style.border = 'red solid 1px';
        errors = false;
    } else {
        errorCheck.innerHTML = '';
        checkDiv.style.border = '';
    }

    return errors;
}
