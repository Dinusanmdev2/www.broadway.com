//RESET PASSWORD - START
$("body").on("click", "#btnResetPassword", function () {
  var formData = new FormData();

  //CSRF Protection
  var CSRF_TOKEN = $("#CSRF_TOKEN").val();
  formData.append("CSRF_TOKEN", CSRF_TOKEN);
  //CSRF Protection

  var txtForgotEmail = $("#txtForgotEmail").val();
  formData.append("txtForgotEmail", txtForgotEmail);

  //VALIDATION
  if (validateEmail(txtForgotEmail) === false) {
    $("#txtForgotEmail").focus();
    Toastify({
      text: "Please enter the valid Email Address.",
      duration: 5000,
      newWindow: false,
      close: false,
      gravity: "top",
      position: "center",
      stopOnFocus: false,
      style: {
        background: "#fbeb61",
        color: "#2c2c2c",
      },
    }).showToast();
    return false;
  }
  //VALIDATION

  $.ajax({
    url: "ajax/reset-password-controller.php",
    type: "POST",
    cache: false,
    processData: false,
    contentType: false,
    data: formData,
    beforeSend: function () {
      $.LoadingOverlay("show");
    },
    success: function (data) {
      console.log(data);

      const responceData = JSON.parse(data);
      console.log(responceData);

      if (responceData["code"] == 200) {
        $("#partOne").hide();
        $("#partThree").hide();

        $("#partTwo").show();
      } else if (responceData["code"] == 404) {
        $("#txtForgotEmail").focus();
        $.alert({
          title: "Alert!",
          content: "User Not Found. Check your email first !",
          icon: "fa fa-exclamation-triangle",
          type: "red",
          theme: "modern",
          buttons: {
            okay: {
              text: "Okay",
              btnClass: "btn-red",
            },
          },
        });
      } else {
        $.alert({
          title: "Alert!",
          content: responceData["message"],
          icon: "fa fa-exclamation-triangle",
          type: "red",
          theme: "modern",
          buttons: {
            okay: {
              text: "Okay",
              btnClass: "btn-red",
            },
          },
        });
      }

      $.LoadingOverlay("hide");
    },
    error: function (data) {
      console.log(data);
      $.LoadingOverlay("hide");
      ajaxError(data);
    },
  });
});
//RESET PASSWORD - END

//VERIFY OTP - START
$("body").on("click", "#btnVerifyOTP", function () {
  var formData = new FormData();

  //CSRF Protection
  var CSRF_TOKEN = $("#CSRF_TOKEN").val();
  formData.append("CSRF_TOKEN", CSRF_TOKEN);
  //CSRF Protection

  var txtForgotEmail = $("#txtForgotEmail").val();
  formData.append("txtForgotEmail", txtForgotEmail);

  var txtVerifyOtp = $("#txtVerifyOtp").val();
  formData.append("txtVerifyOtp", txtVerifyOtp);

  //VALIDATION
  if (txtVerifyOtp.length != 6) {
    $("#txtVerifyOtp").focus();
    Toastify({
      text: "The number you entered is not 6 digits long. Please try again.",
      duration: 5000,
      newWindow: false,
      close: true,
      gravity: "top",
      position: "center",
      stopOnFocus: false,
      style: {
        background: "#fbeb61",
        color: "#2c2c2c",
      },
    }).showToast();
    return false;
  }
  //VALIDATION

  $.ajax({
    url: "ajax/reset-password-verify-otp-controller.php",
    type: "POST",
    cache: false,
    processData: false,
    contentType: false,
    data: formData,
    beforeSend: function () {
      $.LoadingOverlay("show");
    },
    success: function (data) {
      console.log(data);

      const responceData = JSON.parse(data);
      console.log(responceData);

      if (responceData["code"] == 200) {
        if (responceData["message"] == "success") {
          $("#partOne").hide();
          $("#partTwo").hide();

          $("#partThree").show();
        } else {
          $("#otpSuccessSentAlert").hide();
          $("#txtVerifyOtp").focus();
          $.alert({
            title: "Alert!",
            content: "OTP Doesn't match. Try again!",
            icon: "fa fa-exclamation-triangle",
            type: "red",
            theme: "modern",
            buttons: {
              okay: {
                text: "Okay",
                btnClass: "btn-red",
              },
            },
          });
        }
      } else if (responceData["code"] == 404) {
        $("#partTwo").hide();
        $("#partThree").hide();
        $("#partOne").show();

        $("#txtForgotEmail").focus();
        $.alert({
          title: "Alert!",
          content: "User Not Found. Check your email first !",
          icon: "fa fa-exclamation-triangle",
          type: "red",
          theme: "modern",
          buttons: {
            okay: {
              text: "Okay",
              btnClass: "btn-red",
            },
          },
        });
      } else {
        $.alert({
          title: "Alert!",
          content: responceData["message"],
          icon: "fa fa-exclamation-triangle",
          type: "red",
          theme: "modern",
          buttons: {
            okay: {
              text: "Okay",
              btnClass: "btn-red",
            },
          },
        });
      }

      $.LoadingOverlay("hide");
    },
    error: function (data) {
      console.log(data);
      $.LoadingOverlay("hide");

      ajaxError(data);
    },
  });
});
//VERIFY OTP - END

//UPDATE PASSWORD - START
$("body").on("click", "#btnUpdatePassword", function () {
  var formData = new FormData();

  //CSRF Protection
  var CSRF_TOKEN = $("#CSRF_TOKEN").val();
  formData.append("CSRF_TOKEN", CSRF_TOKEN);
  //CSRF Protection

  var txtForgotEmail = $("#txtForgotEmail").val();
  formData.append("txtForgotEmail", txtForgotEmail);

  var txtNewPassword = $("#txtNewPassword").val();
  formData.append("txtNewPassword", txtNewPassword);

  var txtReNewPassword = $("#txtReNewPassword").val();

  //VALIDATION
  if (txtNewPassword.length < 8) {
    $("#txtNewPassword").focus();
    Toastify({
      text: "Please enter the valid Password. Password lenth must 8 digits.",
      duration: 5000,
      newWindow: false,
      close: true,
      gravity: "top",
      position: "center",
      stopOnFocus: false,
      style: {
        background: "#fbeb61",
        color: "#2c2c2c",
      },
    }).showToast();
    return false;
  }

  if (txtNewPassword != txtReNewPassword) {
    $("#txtReNewPassword").focus();
    Toastify({
      text: "Please make sure that you enter the same password in both fields. Please try again and make sure that both passwords match.",
      duration: 5000,
      newWindow: false,
      close: true,
      gravity: "top",
      position: "center",
      stopOnFocus: false,
      style: {
        background: "#fbeb61",
        color: "#2c2c2c",
      },
    }).showToast();
    return false;
  }
  //VALIDATION

  $.ajax({
    url: "ajax/reset-password-update-controller.php",
    type: "POST",
    cache: false,
    processData: false,
    contentType: false,
    data: formData,
    beforeSend: function () {
      $.LoadingOverlay("show");
    },
    success: function (data) {
      console.log(data);

      const responceData = JSON.parse(data);
      console.log(responceData);

      if (responceData["code"] == 200) {
        $.alert({
          title: "Success!",
          content: "Password changed successfully!",
          icon: "fa fa-check-circle",
          type: "green",
          theme: "modern",
          buttons: {
            Okay: function () {
              location.replace("/login.php");
            },
          },
        });
      } else if (responceData["code"] == 404) {
        $("#partTwo").hide();
        $("#partThree").hide();
        $("#partOne").show();

        $("#txtForgotEmail").focus();
        $.alert({
          title: "Alert!",
          content: "User Not Found. Check your email first !",
          icon: "fa fa-exclamation-triangle",
          type: "red",
          theme: "modern",
          buttons: {
            okay: {
              text: "Okay",
              btnClass: "btn-red",
            },
          },
        });
      } else {
        $.alert({
          title: "Alert!",
          content: responceData["message"],
          icon: "fa fa-exclamation-triangle",
          type: "red",
          theme: "modern",
          buttons: {
            okay: {
              text: "Okay",
              btnClass: "btn-red",
            },
          },
        });
      }

      $.LoadingOverlay("hide");
    },
    error: function (data) {
      console.log(data);
      $.LoadingOverlay("hide");
      ajaxError(data);
    },
  });
});
//UPDATE PASSWORD - END
