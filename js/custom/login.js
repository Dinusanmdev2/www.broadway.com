//LOGIN- START
$("body").on("click", "#btnLogin", function () {
  var formData = new FormData();

  //CSRF Protection
  var CSRF_TOKEN = $("#CSRF_TOKEN").val();
  formData.append("CSRF_TOKEN", CSRF_TOKEN);
  //CSRF Protection

  var txtLoginEmail = $("#txtLoginEmail").val();
  formData.append("txtLoginEmail", txtLoginEmail);

  var txtLoginPassword = $("#txtLoginPassword").val();
  formData.append("txtLoginPassword", txtLoginPassword);

  //VALIDATION
  if (validateEmail(txtLoginEmail) === false) {
    $("#txtLoginEmail").focus();
    Toastify({
      text: "Please enter the valid Email Address.",
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

  if (txtLoginPassword == "") {
    $("#txtLoginPassword").focus();
    Toastify({
      text: "Password filed Must Needed.",
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
    url: "ajax/login-controller.php",
    type: "POST",
    cache: false,
    processData: false,
    contentType: false,
    data: formData,
    beforeSend: function () {
      $("#divLoginFormCard").waitMe({
        effect: "timer",
        text: "Please Wait...",
        bg: "#ffffffbd",
        color: "#000",
        maxSize: "",
        waitTime: -1,
        textPos: "vertical",
        fontSize: "",
        source: "",
      });
    },
    success: function (data) {
      console.log('htt')
      console.log(data);

      const responceData = JSON.parse(data);
      console.log(responceData);

      if (responceData["message"] == 'lgin') {
        window.location.replace("/index.php");
      } else if (responceData["message"] == 'INVALID_PASSWORD') {
        $.alert({
          title: "Alert!",
          content: "Incorrect Password. Try Again !",
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
        $("#divLoginFormCard").waitMe("hide");
      } else if (responceData["message"] == 'EMAIL_NOT_FOUND') {
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
        $("#divLoginFormCard").waitMe("hide");
      } else {
        $.alert({
          title: "Alert!",
          content: "Some error please try again",
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
        $("#divLoginFormCard").waitMe("hide");
      }
    },
    error: function (data) {
      console.log(data);
      $("#divLoginFormCard").waitMe("hide");

      ajaxError(data);
    },
  });
});
//LOGIN- START
