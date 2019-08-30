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

function validateCheckBoxes(boxesName, errorMsg) {
      var boxes = document.getElementsByName(boxesName);
      var errorField = document.getElementById(boxesName + "-error");
      // var count = 0;
      var valid;

      // for (var i = 0; i != boxes.length; i++) {
      //     var box = boxes[i];
      //     if (box.checked) {
      //         count++;
      //     }
      // }
      // valid = (count >= min && count <= max);
      if (valid) {
          errorField.innerHTML = validCheckMark;
          errorField.style.color = validBorderColor;
      }
      else {
          errorField.innerHTML = errorMsg;
          errorField.style.color = errorBorderColor;
          formIsValid = false;
      }
      return valid;
  }



function onSubmitForm(evt){
        formIsValid = true;

        var valid;

        validateNotEmpty("firstName", "Error: Please enter your first name");
        validateNotEmpty("lastName", "Error: Please enter your last name");
        validateNotEmpty("address", "Error: Please enter your address");
        validateNotEmpty("country", "Error: Please enter your country");
        validateNotEmpty("town", "Error: Please enter your country");
        validateNotEmpty("zip", "Error: Please enter your country");
        validateCheckBoxes("agree", "Error: Please check if you agree")
        validateNotEmpty("username", "Error: Please enter your username");
        // validateNotEmpty("arrivalLocation", "Please enter your arrival location");
        // validateNotEmpty("datepicker", "Please enter date");
        // validateNotEmpty("datepicker2", "Please enter date");



        if (!formIsValid) {
            evt.preventDefault();
        }
        // else {
        //     //evt.preventDefault();
        // }
    };

})
