window.addEventListener("load", function() {

  var submitBtn = document.getElementById("submit");
  submitBtn.addEventListener("click", onSubmitForm);

  var formIsValid;
  var validCheckMark = "&#10003";
  var validBorderColor = "#62f441";
  var errorBorderColor = "#f44242";
//  var errorImg = "images/errorIcon.png";



  function isValidDateFormat(dateString) {
    var regex = /^\d{2}-\d{2}-\d{4}$/;
    return regex.test(dateString);
}

function validateNotEmpty(inputFieldId, errorMsg) {
    var inputField = document.getElementById(inputFieldId);
    var errorField = document.getElementById(inputFieldId + "-error");
    //var errorListItem = errorField.closest('li.error');
    var valid = true;

    if (inputField.value === ""){
        inputField.style.borderColor = errorBorderColor;
        errorField.innerHTML = errorMsg;
        errorField.style.color = errorBorderColor;
        //errorField.style.image = errorImg;
        formIsValid = false;
        valid = false;
    }
    //GREEN TICKS
    // else {
    //     inputField.style.borderColor = validBorderColor;
    //     errorField.innerHTML = validCheckMark;
    //     errorField.style.color = validBorderColor;
    // }



  //  if (errorListItem != null) {
  //      errorListItem.style.marginBottom = "0.5em";
  //  }
    return valid;
}

function onSubmitForm(evt){
        formIsValid = true;

        // var valid;

        validateNotEmpty("departureLocation", "*Error: Please enter departure location");
        validateNotEmpty("arrivalLocation", "*Error: Please enter arrival location");
        validateNotEmpty("datepicker", "*Error: Please enter date");
        validateNotEmpty("datepicker2", "*Error: Please enter date");



        if (!formIsValid) {
            evt.preventDefault();
        }
        // else {
        //     //evt.preventDefault();
        // }
    };

})
