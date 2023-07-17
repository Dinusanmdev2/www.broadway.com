//Initialation
$(document).ready(function () {
  $(".selectize").selectize();

  $(".countrySelector").countrySelect({
    defaultCountry: "sg",
    preferredCountries: ["sg", "lk"],
    responsiveDropdown: true,
  });

  var input = document.querySelector(".teleSelector");
  window.intlTelInput(input, {
    formatOnDisplay: true,
    preferredCountries: ["sg", "lk"],
    separateDialCode: true,
    utilsScript: "source/telephone-select/js/utils.js",
  });
});
//Initialation

//Click Img to trigger input file
$("body").on("click", "#btnUploadDocProPicture", function () {
  $("#fileDocPictureUpload").trigger("click");
});
//Click Img to trigger input file

//Change img to Crop and Upload
var cropper;
var image = document.getElementById("imgCropable");
var $modal = $("#cropImageModal");

$("#fileDocPictureUpload").change(function (event) {
  var files = event.target.files;

  var reader = new FileReader();
  reader.onload = function (event) {
    image.src = reader.result;
    $modal.modal("show");
  };
  reader.readAsDataURL(files[0]);
});

$modal
  .on("shown.bs.modal", function () {
    cropper = new Cropper(image, {
      aspectRatio: 1,
      viewMode: 3,
    });
  })
  .on("hidden.bs.modal", function () {
    cropper.destroy();
    cropper = null;
  });

$("#btnImageCrop").click(function () {
  canvas = cropper.getCroppedCanvas({
    width: 400,
    height: 400,
  });

  canvas.toBlob(function (blob) {
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      var base64data = reader.result;
      $.ajax({
        url: "ajax/user-picture-uploder.php",
        method: "POST",
        data: { image: base64data },
        beforeSend: function () {
          $.LoadingOverlay("show");
        },
        success: function (data) {
          $modal.modal("hide");
          $.LoadingOverlay("hide");
          console.log(data);

          $.alert({
            title: "Success!",
            content: "Profile picture changed successfully!",
            icon: "fa fa-check-circle",
            type: "green",
            theme: "modern",
            buttons: {
              Okay: function () {
                location.reload();
              },
            },
          });
        },
      });
    };
  });
});
//Change img to Crop and Upload


//new
$("#mainloader").show();
//Initialation
$(document).ready(function () {
  $("#txtMainSpec").selectize({
    maxItems: null,
  });

  $("#txtPracticeLocation").selectize({
    maxItems: null,
  });

  $("#txtAssociations").selectize({
    maxItems: null,
  });

  $("#txtCity").selectize();
  $("#txtClinicCity").selectize();

  $(".countrySelector").countrySelect({
    defaultCountry: "sg",
    preferredCountries: ["sg", "id", "ph", "my"],
    responsiveDropdown: true,
  });

  var input = document.querySelector(".teleSelector");
  window.intlTelInput(input, {
    formatOnDisplay: true,
    preferredCountries: ["sg", "id", "ph", "my"],
    separateDialCode: true,
    utilsScript: "source/telephone-select/js/utils.js",
  });

  $("#txtOverview").summernote();

  //Get Doctor Infomation
  $.ajax({
    url: "ajax/get-doctor-info.php",
    type: "GET",
    cache: false,
    processData: false,
    contentType: false,
    success: function (data) {
      const responceData = JSON.parse(data);
      console.log(responceData);

      if (responceData["code"] == 200) {
        const userInfo = JSON.parse(responceData["userData"]);
        const locationOptions = responceData["locationOptions"];
        const cityOptions = responceData["cityOptions"];
        const associationsOptions = responceData["associationsOptions"];

        $("#txtPracticeLocation")[0].selectize.destroy();
        $("#txtPracticeLocation").append(locationOptions);
        $("#txtPracticeLocation").selectize({
          maxItems: null,
        });

        var mainSpecs = JSON.parse(userInfo["mainSpecialization"]["S"]);
        var country = userInfo["country"]["S"];
        var city = userInfo["city"]["S"];
        var phone = userInfo["phone"]["S"];
        var practiceLocations = JSON.parse(userInfo["practiceLocation"]["S"]);
        var associations = JSON.parse(userInfo["associations"]["S"]);
        var socialMedia = JSON.parse(userInfo["socialMedia"]["S"]);

        $("#txtFirstName").val(userInfo["firstName"]["S"]);
        $("#txtLastName").val(userInfo["lastName"]["S"]);
        $("#txtWebsite").val(userInfo["webSite"]["S"]);
        $("#txtAddress").val(userInfo["address"]["S"]);
        $("#txtPostCode").val(userInfo["postalCode"]["S"]);
        $("#txtSubSpec").val(userInfo["subSpecialization"]["S"]);

        $("#txtOverview").summernote("code", userInfo["overview"]["S"]);

        $("#txtFacebookUrl").val(socialMedia.facebook);
        $("#txtInstagramUrl").val(socialMedia.instagram);
        $("#txtLinkedinUrl").val(socialMedia.linkdin);
        $("#txtTwitterUrl").val(socialMedia.twitter);

        var contactInput = document.querySelector("#txtPhone");
        const contactData =
          window.intlTelInputGlobals.getInstance(contactInput);
        contactData.setNumber(phone);

        $("#txtCountry").countrySelect("setCountry", country);

        //City List Updating
        $("#txtCity")[0].selectize.destroy();
        $("#txtCity").append(cityOptions);
        $("#txtCity").selectize();

        $("#txtClinicCity")[0].selectize.destroy();
        $("#txtClinicCity").append(cityOptions);
        $("#txtClinicCity").selectize();
        //City List Updating

        //Associations List Updating
        $("#txtAssociations")[0].selectize.destroy();
        $("#txtAssociations").append(associationsOptions);
        $("#txtAssociations").selectize({
          maxItems: null,
        });
        //Associations List Updating

        $("#txtMainSpec")[0].selectize.setValue(mainSpecs);
        $("#txtPracticeLocation")[0].selectize.setValue(practiceLocations);
        $("#txtCity")[0].selectize.setValue(city);
        $("#txtAssociations")[0].selectize.setValue(associations);
        $("#mainloader").hide();
      } else {
        $("#mainloader").hide();
        $.alert({
          title: "Doctor info get Alert!",
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
    },
    error: function (data) {
      console.log(data);
      $("#mainloader").hide();
      ajaxError(data);
    },
  });
  //Get Doctor Infomation
});
//Initialation

//Click Img to trigger input file
$("body").on("click", "#btnUploadDocProPicture", function () {
  $("#fileDocPictureUpload").trigger("click");
});
//Click Img to trigger input file

//Change img to Crop and Upload
var cropper;
var image = document.getElementById("imgCropable");
var $modal = $("#cropImageModal");

$("#fileDocPictureUpload").change(function (event) {
  var files = event.target.files;

  var reader = new FileReader();
  reader.onload = function (event) {
    image.src = reader.result;
    $modal.modal("show");
  };
  reader.readAsDataURL(files[0]);
});

$modal
  .on("shown.bs.modal", function () {
    cropper = new Cropper(image, {
      aspectRatio: 1,
      viewMode: 3,
    });
  })
  .on("hidden.bs.modal", function () {
    cropper.destroy();
    cropper = null;
  });

$("#btnImageCrop").click(function () {
  canvas = cropper.getCroppedCanvas({
    width: 400,
    height: 400,
  });

  canvas.toBlob(function (blob) {
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      var base64data = reader.result;
      $.ajax({
        url: "ajax/user-picture-uploder.php",
        method: "POST",
        data: { image: base64data },
        beforeSend: function () {
          $("#mainloader").show();
        },
        success: function (data) {
          $modal.modal("hide");
          $("#mainloader").hide();
          console.log(data);

          $.alert({
            title: "Success!",
            content: "Profile picture changed successfully!",
            icon: "fa fa-check-circle",
            type: "green",
            theme: "modern",
            buttons: {
              Okay: function () {
                location.reload();
              },
            },
          });
        },
      });
    };
  });
});
//Change img to Crop and Upload

//CHANGE COUNTRY - START
$("body").on("change", "#txtCountry", function () {
  $("#mainloader").show();

  var formData = new FormData();

  const countryData = $("#txtCountry").countrySelect("getSelectedCountryData");
  var country = countryData.name;
  var countryCode = countryData.iso2;
  formData.append("country", country);

  var contactInput = document.querySelector("#txtPhone");
  const contactData = window.intlTelInputGlobals.getInstance(contactInput);
  contactData.setCountry(countryCode);

  $.ajax({
    url: "ajax/get-city-by-country.php",
    type: "POST",
    cache: false,
    processData: false,
    contentType: false,
    data: formData,
    beforeSend: function () {
      $("#mainloader").show();
    },
    success: function (data) {
      $("#mainloader").hide();
      const responceData = JSON.parse(data);
      $("#txtCity")[0].selectize.destroy();
      $("#txtClinicCity")[0].selectize.destroy();

      $("#txtCity").html(responceData.cityOption);
      $("#txtCity").selectize();

      $("#txtClinicCity").html(responceData.cityOption);
      $("#txtClinicCity").selectize();
    },
    error: function (data) {
      console.log(data);
      $("#mainloader").hide();

      ajaxError(data);
    },
  });
  //City List Updating

  //Clinic Location Update
  $.ajax({
    url: "ajax/get-clinic-location-by-contry.php",
    type: "POST",
    cache: false,
    processData: false,
    contentType: false,
    data: formData,
    beforeSend: function () {
      $("#mainloader").show();
    },
    success: function (data) {
      const responceData = JSON.parse(data);
      const locationOptions = responceData["locationOptions"];

      $("#txtPracticeLocation")[0].selectize.destroy();
      $("#txtPracticeLocation").html(locationOptions);
      $("#txtPracticeLocation").selectize({
        maxItems: null,
      });

      $("#mainloader").hide();
    },
    error: function (data) {
      console.log(data);
      $("#mainloader").hide();

      ajaxError(data);
    },
  });
  //Clinic Location Update
});
//CHANGE COUNTRY - START

//CHANGE ASSOCIATION - START
$("body").on("change", ".assSelector", function () {
  $("#mainloader").show();

  var formData = new FormData();

  const countryData = $("#txtCountry").countrySelect("getSelectedCountryData");
  var country = countryData.name;
  formData.append("country", country);

  var txtMainSpec = $("#txtMainSpec").val();
  formData.append("txtMainSpec", JSON.stringify(txtMainSpec));

  var txtAssociations = $("#txtAssociations").val();
  formData.append("txtAssociations", JSON.stringify(txtAssociations));

  $.ajax({
    url: "ajax/get-association.php",
    type: "POST",
    cache: false,
    processData: false,
    contentType: false,
    data: formData,
    beforeSend: function () {
      $("#mainloader").show();
    },
    success: function (data) {
      const responceData = JSON.parse(data);
      console.log(responceData);

      $("#txtAssociations")[0].selectize.destroy();
      $("#txtAssociations").html(responceData.associationsOptions);
      $("#txtAssociations").selectize({
        maxItems: null,
      });

      $("#txtAssociations")[0].selectize.setValue(txtAssociations);

      $("#mainloader").hide();
    },
    error: function (data) {
      console.log(data);
      $("#mainloader").hide();

      ajaxError(data);
    },
  });
});
//CHANGE ASSOCIATION - START

//SYNC SGLOCATE - START
$("body").on("click", "#btnSyncSglocate", function () {
  var formData = new FormData();

  const countryData = $("#txtCountry").countrySelect("getSelectedCountryData");
  var country = countryData.name;

  var txtPostCode = $("#txtPostCode").val();
  formData.append("txtPostCode", txtPostCode);

  if (country != "Singapore") {
    $.alert({
      title: "Only Available to Singapore!",
      content:
        "We're sorry, but this function is only available to users located in Singapore. If you are located outside of Singapore, you will not be able to access this feature. We apologize for any inconvenience this may cause. Thank you for your understanding.",
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
    return false;
  }

  $.ajax({
    url: "ajax/get-sg-locate.php",
    type: "POST",
    cache: false,
    processData: false,
    contentType: false,
    data: formData,
    beforeSend: function () {
      $("#mainloader").show();
    },
    success: function (data) {
      console.log(data);
      $("#mainloader").hide();

      if (data == "error") {
        $.alert({
          title: "Invalid Postal Code",
          content: "Address Could Not Be Found!",
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
        return false;
      } else {
        $("#txtAddress").val(data);
      }
    },
    error: function (data) {
      console.log(data);
      $("#mainloader").hide();

      ajaxError(data);
    },
  });
});
//SYNC SGLOCATE - END

//SYNC SGLOCATE CLINIC - START
$("body").on("click", "#btnSyncSglocateClinic", function () {
  var formData = new FormData();

  const countryData = $("#txtCountry").countrySelect("getSelectedCountryData");
  var country = countryData.name;

  var txtPostCode = $("#txtClinicPostalCode").val();
  formData.append("txtPostCode", txtPostCode);

  if (country != "Singapore") {
    $.alert({
      title: "Only Available to Singapore!",
      content:
        "We're sorry, but this function is only available to users located in Singapore. If you are located outside of Singapore, you will not be able to access this feature. We apologize for any inconvenience this may cause. Thank you for your understanding.",
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
    return false;
  }

  $.ajax({
    url: "ajax/get-sg-locate.php",
    type: "POST",
    cache: false,
    processData: false,
    contentType: false,
    data: formData,
    beforeSend: function () {
      $("#mainloader").show();
    },
    success: function (data) {
      console.log(data);
      $("#mainloader").hide();

      if (data == "error") {
        $.alert({
          title: "Invalid Postal Code",
          content: "Address Could Not Be Found!",
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
        return false;
      } else {
        $("#txtClinicAddress").val(data);
      }
    },
    error: function (data) {
      console.log(data);
      $("#mainloader").hide();

      ajaxError(data);
    },
  });
});
//SYNC SGLOCATE CLINIC - END

//UPDATE - START
$("body").on("click", "#btnUpdateDoctorProfile", function () {
  var formData = new FormData();

  //CSRF Protection
  var CSRF_TOKEN = $("#CSRF_TOKEN").val();
  formData.append("CSRF_TOKEN", CSRF_TOKEN);
  //CSRF Protection

  var txtFirstName = $("#txtFirstName").val();
  formData.append("txtFirstName", txtFirstName);

  var txtLastName = $("#txtLastName").val();
  formData.append("txtLastName", txtLastName);

  var txtWebsite = $("#txtWebsite").val();
  formData.append("txtWebsite", txtWebsite);

  var contactInput = document.querySelector("#txtPhone");
  const contactData = window.intlTelInputGlobals.getInstance(contactInput);
  var contactNo = contactData.getNumber();
  formData.append("txtPhone", contactNo);

  var txtAddress = $("#txtAddress").val();
  formData.append("txtAddress", txtAddress);

  const countryData = $("#txtCountry").countrySelect("getSelectedCountryData");
  var country = countryData.name;
  formData.append("txtCountry", country);

  var txtCity = $("#txtCity").val();
  formData.append("txtCity", txtCity);

  var txtPostCode = $("#txtPostCode").val();
  formData.append("txtPostCode", txtPostCode);

  var txtMainSpec = $("#txtMainSpec").val();
  formData.append("txtMainSpec", JSON.stringify(txtMainSpec));

  var txtSubSpec = $("#txtSubSpec").val();
  formData.append("txtSubSpec", txtSubSpec);

  var txtPracticeLocation = $("#txtPracticeLocation").val();
  formData.append("txtPracticeLocation", JSON.stringify(txtPracticeLocation));

  var txtAssociations = $("#txtAssociations").val();
  formData.append("txtAssociations", JSON.stringify(txtAssociations));

  var txtOverview = $("#txtOverview").val();
  formData.append("txtOverview", txtOverview);

  var txtFacebookUrl = $("#txtFacebookUrl").val();
  formData.append("txtFacebookUrl", txtFacebookUrl);

  var txtTwitterUrl = $("#txtTwitterUrl").val();
  formData.append("txtTwitterUrl", txtTwitterUrl);

  var txtInstagramUrl = $("#txtInstagramUrl").val();
  formData.append("txtInstagramUrl", txtInstagramUrl);

  var txtLinkedinUrl = $("#txtLinkedinUrl").val();
  formData.append("txtLinkedinUrl", txtLinkedinUrl);

  //VALIDATION
  if (txtFirstName == "") {
    $("#txtFirstName").focus();
    Toastify({
      text: "Please enter your first name.",
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

  if (txtLastName == "") {
    $("#txtLastName").focus();
    Toastify({
      text: "Please enter your last name.",
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

  if (txtMainSpec.length < 1) {
    $("#txtMainSpec").trigger("click");
    Toastify({
      text: "Please select atleast one Main Specialization.",
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

  if (txtCity == "") {
    $("#txtCity").focus();
    Toastify({
      text: "Please select your City.",
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
    url: "ajax/doctor-update-controller.php",
    type: "POST",
    cache: false,
    processData: false,
    contentType: false,
    data: formData,
    beforeSend: function () {
      $("#mainloader").show();
    },
    success: function (data) {
      const responceData = JSON.parse(data);
      console.log(responceData);

      if (responceData["code"] == 200) {
        $.alert({
          title: "Success!",
          content: "Your profile has been successfully updated.",
          icon: "fa fa-check-circle",
          type: "green",
          theme: "modern",
          buttons: {
            okay: {
              text: "Okay",
              btnClass: "btn-green",
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

      $("#mainloader").hide();
    },
    error: function (data) {
      console.log(data);
      $("#mainloader").hide();

      ajaxError(data);
    },
  });
});
//REGISTER - END

//ADD CLINIC - START
$("body").on("click", "#btnAddClinicSubmit", function () {
  var formData = new FormData();

  //CSRF Protection
  var CSRF_TOKEN = $("#CSRF_TOKEN").val();
  formData.append("CSRF_TOKEN", CSRF_TOKEN);
  //CSRF Protection

  var txtClinicName = $("#txtClinicName").val();
  formData.append("txtClinicName", txtClinicName);

  var txtClinicAddress = $("#txtClinicAddress").val();
  formData.append("txtClinicAddress", txtClinicAddress);

  var txtClinicCity = $("#txtClinicCity").val();
  formData.append("txtClinicCity", txtClinicCity);

  var txtClinicPostalCode = $("#txtClinicPostalCode").val();
  formData.append("txtClinicPostalCode", txtClinicPostalCode);

  const countryData = $("#txtCountry").countrySelect("getSelectedCountryData");
  var country = countryData.name;
  formData.append("txtCountry", country);

  //VALIDATION
  if (txtClinicName == "") {
    $("#txtClinicName").focus();
    Toastify({
      text: "Please enter location name.",
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

  if (txtClinicAddress == "") {
    $("#txtClinicAddress").focus();
    Toastify({
      text: "Please enter location address.",
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

  if (txtClinicCity == "") {
    $("#txtClinicCity").focus();
    Toastify({
      text: "Please enter location city.",
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

  if (txtClinicPostalCode == "") {
    $("#txtClinicPostalCode").focus();
    Toastify({
      text: "Please enter location postal code.",
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
    url: "ajax/clinic-add-controller.php",
    type: "POST",
    cache: false,
    processData: false,
    contentType: false,
    data: formData,
    beforeSend: function () {
      $("#mainloader").show();
    },
    success: function (data) {
      const responceData = JSON.parse(data);
      console.log(responceData);

      if (responceData["code"] == 200) {
        $.alert({
          title: "Success!",
          content: "Your practice location has been successfully updated.",
          icon: "fa fa-check-circle",
          type: "green",
          theme: "modern",
          buttons: {
            Okay: function () {
              refreshLocations();
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

      $("#mainloader").hide();
    },
    error: function (data) {
      console.log(data);
      $("#mainloader").hide();

      ajaxError(data);
    },
  });
});
//ADD CLINIC - START

//REFRESHING LOCATION
function refreshLocations() {
  console.log("okay");
  $("#txtClinicName").val("");
  $("#txtClinicAddress").val("");
  $("#txtClinicCity").val("");
  $("#txtClinicPostalCode").val("");
  $("#txtClinicName").val("");

  $("#addPracticelocationModal").modal("hide");

  //Get Doctor Infomation
  $.ajax({
    url: "ajax/get-clinic-info.php",
    type: "GET",
    cache: false,
    processData: false,
    contentType: false,
    success: function (data) {
      const responceData = JSON.parse(data);
      console.log(responceData);
      const locationOptions = responceData["locationOptions"];
      $("#txtPracticeLocation")[0].selectize.destroy();
      $("#txtPracticeLocation").append(locationOptions);
      $("#txtPracticeLocation").selectize({
        maxItems: null,
      });
      $("#mainloader").hide();
    },
    error: function (data) {
      console.log(data);
      $("#mainloader").hide();
      ajaxError(data);
    },
  });
  //Get Doctor Infomation
}
//REFRESHING LOCATION
