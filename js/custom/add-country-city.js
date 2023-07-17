$("body").on("click", "#addcountrycity", function () {
  var formData = new FormData();

  //CSRF Protection
  var CSRF_TOKEN = $("#CSRF_TOKEN").val();
  formData.append("CSRF_TOKEN", CSRF_TOKEN);
  //CSRF Protection

  var txtCountry = $("#txtCountry").val();
  formData.append("txtCountry", txtCountry);

  var txtCity = $("#txtCity").val();
  formData.append("txtCity", JSON.stringify(txtCity));

  console.log(JSON.stringify(txtCity));
  console.log(txtCountry);

  //validaton start here

  if (txtCity == "") {
    $("#txtCity").focus();
    $.alert({
      title: "Alert!",
      content: "Please enter the City",
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

  if (txtCountry == "") {
    $("#txtCountry").focus();
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

  $.ajax({
    url: "ajax/add-country-city.php",
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
      $("#overlay-Loader").hide();
      $.alert({
        title: "Success!",
        content: "Create <strong>Successfully!</strong>.",
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
});

$(".countrySelector").countrySelect({
  defaultCountry: "sg",
  preferredCountries: ["sg", "ph"],
  responsiveDropdown: true,
});

delete $("body").on("click", ".deletecountrycity", function () {
  var formData = new FormData();

  //CSRF Protection
  var CSRF_TOKEN = $("#CSRF_TOKEN").val();
  formData.append("CSRF_TOKEN", CSRF_TOKEN);
  //CSRF Protection

  var country = $(this).attr("country");
  formData.append("country", country);

  var city = $(this).attr("city");
  formData.append("city", city);

  console.log(city);
  console.log(country);

  $.confirm({
    title: "Confirm!",
    content: "Are you sure want to delete ?",
    buttons: {
      confirm: function () {
        $.ajax({
          url: "ajax/city-country-delete.php",
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

//update

$("body").on("click", ".updateaddcountrycity", function () {
  var formData = new FormData();

  //CSRF Protection
  var CSRF_TOKEN = $("#CSRF_TOKEN").val();
  formData.append("CSRF_TOKEN", CSRF_TOKEN);
  //CSRF Protection

  var txtCountry = $("#txtCountry").val();
  formData.append("txtCountry", txtCountry);

  var txtCity = $("#txtCity").val();
  formData.append("txtCity", JSON.stringify(txtCity));

  var country = $(this).attr("country");
  formData.append("country", country);

  var city = $(this).attr("city");
  formData.append("city", city);

  console.log(country);
  console.log(city);
  //validaton start here

  if (txtCity == "") {
    $("#txtCity").focus();
    $.alert({
      title: "Alert!",
      content: "Please enter the City",
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

  if (txtCountry == "") {
    $("#txtCountry").focus();
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

  console.log(txtCity);
  console.log(txtCountry);

  $.ajax({
    url: "ajax/edit-country-city.php",
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
      $("#overlay-Loader").hide();
      $.alert({
        title: "Success!",
        content: " <strong>Successfully!</strong>.",
        icon: "fa fa-check-circle",
        type: "green",
        buttons: {
          okay: function () {
            window.location.href = "index.php?page=add-country-city";
          },
        },
      });
    },
    error: function (data) {
      console.log(data);
      $("#overlay-Loader").hide();
    },
  });
});

delete $("body").on("click", ".deletecity", function () {
  var formData = new FormData();

  //CSRF Protection
  var CSRF_TOKEN = $("#CSRF_TOKEN").val();
  formData.append("CSRF_TOKEN", CSRF_TOKEN);
  //CSRF Protection

  var cityName = $(this).attr("cityName");
  formData.append("cityName", cityName);

  var country = $(this).attr("country");
  formData.append("country", country);

  console.log(cityName);
  console.log(country);

  $.confirm({
    title: "Confirm!",
    content: "Are you sure want to delete ?",
    buttons: {
      confirm: function () {
        $.ajax({
          url: "ajax/city-country-delete.php",
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


// $("body").on("change", "#txtCountry", function () {

//   var txtCountry = $("#txtCountry").val();
//   console.log(txtCountry);
  

// });

// $(document).ready(function () {
//   $("#txtCountry").on("change", function () {
 
//     var selectedValue = $(this).val();
//     console.log(selectedValue);

//     var value = selectedValue;
// var xhr = new XMLHttpRequest();
// xhr.open("GET", "index.php?pages=add-country-city.php?data=" + value, true);
// xhr.send();


//     // $.ajax({
//     // 	type: 'POST',
//     // 	url: 'process.php',
//     // 	data: {selectedValue: selectedValue},
//     // 	success: function(response) {
//     // 		$('#result').html(response);
//     // 	}
//     // });
//   });
// });





