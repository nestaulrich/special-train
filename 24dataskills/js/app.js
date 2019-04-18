document.querySelector('#add-info').addEventListener('submit', formValidation);


//Validate form data function declaration
function formValidation() {

    //Form fields variable declarations
    const firstName  = document.getElementById('first-name');
    const lastName  = document.getElementById('last-name');
    const zipCode  = document.getElementById('zip');
    const phone  = document.getElementById('phone');
    const email  = document.getElementById('email');
    const checkBox = document.getElementById('check-box');
    const checkDiv = document.getElementById('check-div');
    const success = document.getElementById('success');

    //Error divs
    const errorFirst  = document.getElementById('error-first');
    const errorLast  = document.getElementById('error-last');
    const errorZip  = document.getElementById('error-zip');
    const errorPhone  = document.getElementById('error-phone');
    const errorEmail  = document.getElementById('error-email');
    const errorCheck  = document.getElementById('error-check');

    let errors = true;

    //RegEx variable declarations
    const nameRGEX = /^[A-Z a-z\s'.-]{1,20}$/;
    const phoneRGEX = /^[(]{1}[0-9]{3}[)]{1}[\s]{1}[0-9]{3}[-]{1}[0-9]{4}$/;
    const zipRGEX = /^[0-9]{5}$/;
    const emailRGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //Validate First Name
    let firstNameResult = nameRGEX.test(firstName.value);
    if (!firstNameResult || firstName.value === '') {
        errorFirst.innerHTML = 'Field Required. 20 Characters max.';
        firstName.style.border = 'red solid 1px';
        errors = false;
    } else {
        errorFirst.innerHTML = '';
        firstName.style.border = null;
    }

    //Validate Last Name
    let lastNameResult = nameRGEX.test(lastName.value);
    if (!lastNameResult || lastName.value === '') {
        errorLast.innerHTML = 'Field Required. 20 Characters max.';
        lastName.style.border = 'red solid 1px';
        errors = false;

    } else {
        errorLast.innerHTML = '';
        lastName.style.border = null;
        
    }

    //Validate zip
    let zipResult = zipRGEX.test(zipCode.value);
    if (!zipResult || zipCode.value === '') {
        errorZip.innerHTML = 'Field Required. Please provide a valid 5 digit zip code.';
        zipCode.style.border = 'red solid 1px';
        errors = false;
    } else {
        errorZip.innerHTML = '';
        zipCode.style.border = null;
    }

    //Validate phone
    let phoneResult = phoneRGEX.test(phone.value);
    if (!phoneResult || phone.value === '') {
        errorPhone.innerHTML = 'Field Required. Phone number must be in this format only: (555) 555-5555';
        phone.style.border = 'red solid 1px';
        errors = false;
    } else {
        errorPhone.innerHTML = '';
        phone.style.border = null;
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
