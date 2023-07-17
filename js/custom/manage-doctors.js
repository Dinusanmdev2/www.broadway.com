
//Initialation
$(document).ready(function () {
  var table = $('#managedoctor').DataTable({
    scrollY: "500px",
    scrollX: true,
    scrollCollapse: true,
    paging: true,
    columnDefs: [
      { width: '20%', targets: 0 }
    ],
    fixedColumns: false
  });

  $(".countrySelectornew").countrySelect({
    defaultCountry: "sg",
    preferredCountries: ["sg", "ph"],
    responsiveDropdown: true,
  });

  $('#filterSelect').on('change', function () {
    var status = $(this).val();
    console.log(status);
    table.column(11).search(status).draw();
  });

  $('#accounttype').on('change', function () {
    var type = $(this).val();
    console.log(type);
    table.column(10).search(type).draw();
  });

  $('#txtCountry').on('change', function () {
    var country = $(this).val();
    console.log(country);
    table.column(7).search(country).draw();
  });

  $('#specializationfilter').on('change', function () {
    var Specialization = $(this).val();
    console.log(Specialization);
    table.column(6).search(Specialization).draw();
  });

  //date range filter
  $.fn.dataTable.ext.search.push(
    function (settings, data, dataIndex) {
      var min = $('#fromdate').val();
      var max = $('#todate').val();
      var date = new Date(data[9]);

      if (
        (min === '' || new Date(min) <= date) &&
        (max === '' || new Date(max) >= date)
      ) {
        return true;
      }
      return false;
    }
  );


  // Handle the date range inputs
  $('#fromdate, #todate').change(function () {
    table.draw();
  });

});
  //Initialation




//doctor updated function
$("body").on("click", "#updatedoctor", function () {
  var formData = new FormData();

  //CSRF Protection
  var CSRF_TOKEN = $("#CSRF_TOKEN").val();
  formData.append("CSRF_TOKEN", CSRF_TOKEN);
  //CSRF Protection

  var txtFName = $("#txtFName").val();
  newtxtFName = txtFName.replace(/#/g, " ");
  formData.append("txtFName", newtxtFName);

  var txtAddress = $("#txtAddress").val();
  newtxtAddress = txtAddress.replace(/#/g, " ");
  formData.append("txtAddress", newtxtAddress);

  var txtid = $("#txtid").val();
  newtxtid = txtid.replace(/#/g, " ");
  formData.append("txtid", newtxtid);

  var txtCity = $("#txtCity").val();
  newtxtCity = txtCity.replace(/#/g, " ");
  formData.append("txtCity", newtxtCity);

  var txtMainSpec = $("#txtMainSpec").val();
  formData.append("txtMainSpec", JSON.stringify(txtMainSpec));

  var contactInput = document.querySelector("#txtPhone");
  const contactData = window.intlTelInputGlobals.getInstance(contactInput);
  var contactNo = contactData.getNumber();
  formData.append("txtPhone", contactNo);

  console.log(txtMainSpec);
  const countryData = $("#txtCountry").countrySelect("getSelectedCountryData");
  var country = countryData.name;
  formData.append("txtCountry", country);

  var txtPostalCode = $("#txtPostalCode").val();
  newtxtPostalCode = txtPostalCode.replace(/#/g, " ");
  formData.append("txtPostalCode", newtxtPostalCode);

  var txtSubSpec = $("#txtSubSpec").val();
  newtxtSubSpec = txtSubSpec.replace(/#/g, " ");
  formData.append("txtSubSpec", newtxtSubSpec);

  var txtLastName = $("#txtLastName").val();
  newtxtLastName = txtLastName.replace(/#/g, " ");
  formData.append("txtLastName", newtxtLastName);

  var email = $("#email").val();
  formData.append("email", email);

  console.log(email);
  console.log(country);

  if (txtFName == "") {
    $("#txtFName").focus();
    $.alert({
      title: "Alert!",
      content: "Please enter the First name",
      icon: "fa fa-exclamation-triangle",
      type: "red",
      buttons: {
        okay: {
          text: "Okay",
          btnClass: "btn-red",
        },
      },
    });
    return false;
  }


  if (txtLastName == "") {
    $("#txtLastName").focus();
    $.alert({
      title: "Alert!",
      content: "Please enter the Last name",
      icon: "fa fa-exclamation-triangle",
      type: "red",
      buttons: {
        okay: {
          text: "Okay",
          btnClass: "btn-red",
        },
      },
    });
    return false;
  }

  if (email == "") {
    $("#email").focus();
    $.alert({
      title: "Alert!",
      content: "Please enter the Email",
      icon: "fa fa-exclamation-triangle",
      type: "red",
      buttons: {
        okay: {
          text: "Okay",
          btnClass: "btn-red",
        },
      },
    });
    return false;
  }

  if (txtMainSpec == "") {
    $("#txtMainSpec").focus();
    $.alert({
      title: "Alert!",
      content: "Please select atleast one Main Specialization.",
      icon: "fa fa-exclamation-triangle",
      type: "red",
      buttons: {
        okay: {
          text: "Okay",
          btnClass: "btn-red",
        },
      },
    });
    return false;
  }

  if (country == "") {
    $("#updatetxtCountry").focus();
    $.alert({
      title: "Alert!",
      content: "Please enter the Country",
      icon: "fa fa-exclamation-triangle",
      type: "red",
      buttons: {
        okay: {
          text: "Okay",
          btnClass: "btn-red",
        },
      },
    });
    return false;
  }




  console.log(txtid);
  console.log(txtFName);
  console.log(contactNo);

  console.log(formData);
  $.ajax({
    url: "ajax/edit-doctor.php",
    type: "POST",
    cache: false,
    processData: false,
    contentType: false,
    data: formData,
    beforeSend: function () {
      $("#overlay-Loader").show();
    },


    success: function (data) {
      console.log(data);

      const responceData = JSON.parse(data);
      console.log(responceData);

      if (responceData["code"] == 200) {
        $.alert({
          title: "Success!",
          content: "Update <strong>Successfull!</strong>.",
          icon: "fa fa-check-circle",
          type: "green",
          buttons: {
            okay: function () {
              window.location.href = "index.php?page=manage-doctors";
            },
          },
        });
       
      }  else if (responceData["code"] == 505) {
        $.alert({
          title: "Alert!",
          content: "Already registered Email Try Again!",
          icon: "fa fa-exclamation-triangle",
          type: "red",
          theme: "modern",
          buttons: {
            okay: function () {
              location.reload();
            },
          },
        });
      } 
    },
    error: function (data) {
      console.log(data);
      $("#overlay-Loader").hide();
    },
  });
});

//suspend account
$("body").on("click", ".suspentaccount", function () {
  var formData = new FormData();

  //CSRF Protection
  var CSRF_TOKEN = $("#CSRF_TOKEN").val();
  formData.append("CSRF_TOKEN", CSRF_TOKEN);
  //CSRF Protection

  var id = $(this).attr("id");
  formData.append("id", id);

  console.log(id);

  $.confirm({
    title: "Confirm!",
    content: "DO you want to suspended account?",
    buttons: {
      confirm: function () {
        $.ajax({
          url: "ajax/supent-account.php",
          type: "POST",
          cache: false,
          processData: false,
          contentType: false,
          data: formData,
          beforeSend: function () {
            $("#overlay-Loader").show();
          },
          success: function (data) {
            $("#overlay-Loader").hide();
            console.log(data);
            $.alert({
              title: "Success!",
              content: "Suspend <strong>Successfull!</strong>.",
              icon: "fa fa-check-circle",
              type: "green",
              buttons: {
                okay: function () {
                  location.reload();
                },
              },
            });
          },
          error: function (data) {
            console.log(data);
            $("#overlay-Loader").hide();
          },
        });
      },
      cancel: function () {},
    },
  });
});

//Activate account
$("body").on("click", ".activateaccount", function () {
  var formData = new FormData();

  //CSRF Protection
  var CSRF_TOKEN = $("#CSRF_TOKEN").val();
  formData.append("CSRF_TOKEN", CSRF_TOKEN);
  //CSRF Protection

  var id = $(this).attr("id");
  formData.append("id", id);

  console.log(id);

  $.confirm({
    title: "Confirm!",
    content: "Do you want to Activate account?",
    buttons: {
      confirm: function () {
        $.ajax({
          url: "ajax/activate-account.php",
          type: "POST",
          cache: false,
          processData: false,
          contentType: false,
          data: formData,
          beforeSend: function () {
            $("#overlay-Loader").show();
          },
          success: function (data) {
            $("#overlay-Loader").hide();
            console.log(data);
            $.alert({
              title: "Success!",
              content: "Activated <strong>Successfully</strong>.",
              icon: "fa fa-check-circle",
              type: "green",
              buttons: {
                okay: function () {
                  location.reload();
                },
              },
            });
          },
          error: function (data) {
            console.log(data);
            $("#overlay-Loader").hide();
          },
        });
      },
      cancel: function () {},
    },
  });
});

//mail verify account
$("body").on("click", ".verifyaccount", function () {
  var formData = new FormData();

  //CSRF Protection
  var CSRF_TOKEN = $("#CSRF_TOKEN").val();
  formData.append("CSRF_TOKEN", CSRF_TOKEN);
  //CSRF Protection

  var id = $(this).attr("id");
  formData.append("id", id);

  var firstName = $(this).attr("firstName");
  formData.append("firstName", firstName);

  var lastName = $(this).attr("lastName");
  formData.append("lastName", lastName);

  var email = $(this).attr("email");
  formData.append("email", email);

  console.log(id);

  $.confirm({
    title: "Confirm!",
    content: 'Do you want to Resend Email?',
    buttons: {
      confirm: function () {
        $.ajax({
          url: "ajax/doctor-activate.php",
          type: "POST",
          cache: false,
          processData: false,
          contentType: false,
          data: formData,
          beforeSend: function () {
            $("#overlay-Loader").show();
          },
          success: function (data) {
            $("#overlay-Loader").hide();
            console.log(data);
            $.alert({
              title: "Success!",
              content: "Email Sent <strong>Successfully</strong>.",
              icon: "fa fa-check-circle",
              type: "green",
              buttons: {
                okay: function () {
                  location.reload();
                },
              },
            });
          },
          error: function (data) {
            console.log(data);
            $("#overlay-Loader").hide();
          },
        });
      },
      cancel: function () {},
    },
  });
});

//view mail verify account

$("body").on("click", ".viewactiveemail", function () {
  var formData = new FormData();

  //CSRF Protection
  var CSRF_TOKEN = $("#CSRF_TOKEN").val();
  formData.append("CSRF_TOKEN", CSRF_TOKEN);
  //CSRF Protection

  var id = $(this).attr("id");
  formData.append("id", id);

  var email = $(this).attr("email");
  formData.append("email", email);

  

  $.alert({
    title: "Success!",
    content: email,
    icon: "fa fa-check-circle",
    type: "green",
    buttons: {
      okay: function () {
        location.reload();
      },
    },
  });
});

$(document).ready(function () {
  $(".selectize").selectize({
    maxItems: null,
  });

  $("#txtPracticeLocation").selectize({
    maxItems: null,
  });

  $("#txtCity").selectize();
  $("#txtClinicCity").selectize();

  $(".countrySelector").countrySelect({
    defaultCountry: "sg",
    preferredCountries: ["sg", "ph"],
    responsiveDropdown: true,
  });

  var input = document.querySelector(".teleSelector");
  window.intlTelInput(input, {
    formatOnDisplay: true,
    preferredCountries: ["sg", "ph"],
    separateDialCode: true,
    utilsScript: "source/telephone-select/js/utils.js",
  });

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

        $("#txtFirstName").val(userInfo["firstName"]["S"]);
        $("#txtLastName").val(userInfo["lastName"]["S"]);
        $("#txtWebsite").val(userInfo["webSite"]["S"]);
        $("#txtAddress").val(userInfo["address"]["S"]);
        $("#txtPostCode").val(userInfo["postalCode"]["S"]);
        $("#txtSubSpec").val(userInfo["subSpecialization"]["S"]);

        var contactInput = document.querySelector("#txtPhone");
        const contactData =
          window.intlTelInputGlobals.getInstance(contactInput);
        contactData.setNumber(phone);

        $("#txtCountry").countrySelect("setCountry", country);

        //City List Updating
        $.getJSON("json/city-list.json", function (data) {
          const cityList = data[country];

          if (cityList == undefined) {
            $("#txtCity").html("<option value=''>City not found.</option>");
            $("#txtClinicCity").html(
              "<option value=''>City not found.</option>"
            );

            $("#txtCity").selectize();
            $("#txtClinicCity").selectize();
          } else {
            var cityOption = "";
            $.each(cityList, function (index, value) {
              cityOption +=
                "<option value='" + value + "'>" + value + "</option>";
            });

            $("#txtCity")[0].selectize.destroy();
            $("#txtClinicCity")[0].selectize.destroy();

            $("#txtCity").html(cityOption);
            $("#txtClinicCity").html(cityOption);

            $("#txtCity").selectize();
            $("#txtClinicCity").selectize();
          }
        });
        //City List Updating

        $("#txtMainSpec")[0].selectize.setValue(mainSpecs);
        $("#txtPracticeLocation")[0].selectize.setValue(practiceLocations);

        $("#txtCity")[0].selectize.setValue(city);
        $("#mainloader").hide();
      } else {
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
        $("#mainloader").hide();
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

delete $("body").on("click", ".btnDeleteDoctor", function () {
  var formData = new FormData();

  //CSRF Protection
  var CSRF_TOKEN = $("#CSRF_TOKEN").val();
  formData.append("CSRF_TOKEN", CSRF_TOKEN);
  //CSRF Protection

  var id = $(this).attr("id");
  formData.append("id", id);

  $.confirm({
    title: "Confirm!",
    content: "Are you sure want to delete ?",
    buttons: {
      confirm: function () {
        $.ajax({
          url: "ajax/delete-doctor.php",
          type: "POST",
          cache: false,
          processData: false,
          contentType: false,
          data: formData,
          beforeSend: function () {
            $("#overlay-Loader").show();
          },
          success: function (data) {
            $("#overlay-Loader").hide();
            console.log(data);
            $.alert({
              title: "Success!",
              content: "Deleted <strong>Successfull!</strong>.",
              icon: "fa fa-check-circle",
              type: "green",
              buttons: {
                okay: function () {
                  location.reload();
                },
              },
            });
          },
          error: function (data) {
            console.log(data);
            $("#overlay-Loader").hide();
          },
        });
      },
      cancel: function () {},
    },
  });
});

var $mSelect = $("#txtMainSpec").selectize({
  placeholder: "Select ",
});



//Edit view model
$(document).ready(function () {
    $(document).on('click', '.viewactivate', function () {
        $firstname = $(this).attr("firstname");

        console.log($firstname),

            $('#viewactivation').modal('show');
        $('#firstnameview').val($firstname);


    });
});