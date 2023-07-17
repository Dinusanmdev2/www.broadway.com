
//phone number
$(document).ready(function () {
    $(".selectize").selectize({
        maxItems: null,
    });

    var input = document.querySelector(".teleSelector");
    window.intlTelInput(input, {
        formatOnDisplay: true,
        preferredCountries: ["sg", "ph"],
        separateDialCode: true,
        utilsScript: "source/telephone-select/js/utils.js",
    });


});

//location
$(document).ready(function () {
    $(".selectize").selectize({
        maxItems: null,
    });

    $(".countrySelector").countrySelect({
        defaultCountry: "sg",
        preferredCountries: ["sg", "ph"],
        responsiveDropdown: true,
    });

    $("#txtCity").selectize();
    $("#txtCountry").trigger("change");
});

$("body").on("change", "#txtCountry", function () {
$("#txtCity")[0].selectize.destroy();

  var formData = new FormData();
  const countryData = $("#txtCountry").countrySelect("getSelectedCountryData");
  var country = countryData.name;
  formData.append("country", country);

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
      $("#txtCity").html(responceData.cityOption);
      $("#txtCity").selectize();
    },
    error: function (data) {
      console.log(data);
      $("#mainloader").hide();

      ajaxError(data);
    },
  });;
});

//update


$(document).ready(function () {
    $(".selectize").selectize({
        maxItems: null,
    });

    $(".countrySelector").countrySelect({
        defaultCountry: "sg",
        preferredCountries: ["sg", "ph"],
        responsiveDropdown: true,
    });

    $("#updatetxtCity").selectize();
    $("#updatetxtCountry").trigger("change");
});

$("body").on("change", "#updatetxtCountry", function () {
    $("#updatetxtCity")[0].selectize.destroy();

    const countryData = $("#updatetxtCountry").countrySelect("getSelectedCountryData");
    var country = countryData.name;

    $.getJSON("json/city-list.json", function (data) {
        const cityList = data[country];

        if (cityList == undefined) {
            $("#updatetxtCity").html("<option value=''>City not found.</option>");
            $("#updatetxtCity").selectize();
        } else {
            var cityOption = "";
            $.each(cityList, function (index, value) {
                cityOption += "<option value='" + value + "'>" + value + "</option>";
            });

            $("#updatetxtCity").html(cityOption);
            $("#updatetxtCity").selectize();
        }
    });
});

$("body").on("click", "#btnClinicSubmit", function () {
    var formData = new FormData();



    //CSRF Protection
    var CSRF_TOKEN = $("#CSRF_TOKEN").val();
    formData.append("CSRF_TOKEN", CSRF_TOKEN);
    //CSRF Protection

    var txtName = $("#txtName").val();
    formData.append("txtName", txtName);


    var txtAddress = $("#txtAddress").val();
    formData.append(
        "txtAddress",
        txtAddress
    );

    var txtCity = $(
        "#txtCity"
    ).val();
    formData.append(
        "txtCity",
        txtCity
    );

    const countryData = $("#txtCountry").countrySelect("getSelectedCountryData");
    var country = countryData.name;
    formData.append("txtCountry", country);

    var txtPostalCode = $("#txtPostalCode").val();
    formData.append("txtPostalCode", txtPostalCode);

    var txtLatitude = $("#txtLatitude").val();
    formData.append("txtLatitude", txtLatitude);

    var txtLongitude = $("#txtLongitude").val();
    formData.append("txtLongitude", txtLongitude);


    //validaton start here

    if (txtName == "") {
        $("#txtName").focus();
        $.alert({
            title: "Alert!",
            content: "Please enter the Name",
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

    if (txtAddress == "") {
        $("#txtAddress").focus();
        $.alert({
            title: "Alert!",
            content: "Please enter the Address",
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

    if (txtPostalCode == "") {
        $("#txtPostalCode").focus();
        $.alert({
            title: "Alert!",
            content: "Please enter the Postal Code",
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

    if (txtLatitude == "") {
        $("#txtLatitude").focus();
        $.alert({
            title: "Alert!",
            content: "Please enter the Latitude",
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

    if (txtLongitude == "") {
        $("#txtLongitude").focus();
        $.alert({
            title: "Alert!",
            content: "Please enter the Longitude",
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

    console.log(formData);
    $.ajax({
        url: "ajax/mag-clinic.php",
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
                       window.location.href = "index.php?page=manage-clinic";
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



delete
    $("body").on("click", ".btnDeleteClinic", function () {
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
                        url: "ajax/clinic-delete.php",
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
                cancel: function () { },
            },
        });
    });







//update 
$("body").on("click", "#btnUpdateClinic", function () {
    var formData = new FormData();


    //CSRF Protection
    var CSRF_TOKEN = $("#CSRF_TOKEN").val();
    formData.append("CSRF_TOKEN", CSRF_TOKEN);
    //CSRF Protection

    var txtName = $("#updatetxtName").val();
    formData.append("updatetxtName", txtName);


    var txtAddress = $("#updatetxtAddress").val();
    formData.append(
        "updatetxtAddress",
        txtAddress
    );


    var txtid = $("#updatetxtid").val();
    formData.append(
        "updatetxtid",
        txtid
    );

    var txtCity = $(
        "#updatetxtCity"
    ).val();
    formData.append(
        "updatetxtCity",
        txtCity
    );



    var txtid = $(
        "#updateid"
    ).val();
    formData.append(
        "updateid",
        txtid
    );

    const countryData = $("#updatetxtCountry").countrySelect("getSelectedCountryData");
    var country = countryData.name;
    formData.append("updatetxtCountry", country);

    var txtPostalCode = $("#updatetxtPostalCode").val();
    formData.append("updatetxtPostalCode", txtPostalCode);

    var txtLatitude = $("#updatetxtLatitude").val();
    formData.append("updatetxtLatitude", txtLatitude);

    var txtLongitude = $("#updatetxtLongitude").val();
    formData.append("updatetxtLongitude", txtLongitude);

    console.log(txtid);


    if (txtName == "") {
        $("#updatetxtName").focus();
        $.alert({
            title: "Alert!",
            content: "Please enter the Name",
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

    if (txtAddress == "") {
        $("#updatetxtAddress").focus();
        $.alert({
            title: "Alert!",
            content: "Please enter the Address",
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

    if (txtCity == "") {
        $("#updatetxtCity").focus();
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

    if (txtPostalCode == "") {
        $("#updatetxtPostalCode").focus();
        $.alert({
            title: "Alert!",
            content: "Please enter the Postal Code",
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

    if (txtLatitude == "") {
        $("#updatetxtLatitude").focus();
        $.alert({
            title: "Alert!",
            content: "Please enter the Latitude",
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

    if (txtLongitude == "") {
        $("#updatetxtLongitude").focus();
        $.alert({
            title: "Alert!",
            content: "Please enter the Longitude",
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

    console.log(formData);
    $.ajax({
        url: "ajax/edit-clinic.php",
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
                content: "Update <strong>Successfull!</strong>.",
                icon: "fa fa-check-circle",
                type: "green",
                buttons: {
                    okay: function () {
                        window.location.href = "index.php?page=manage-clinic";
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

);


//Edit view model
$(document).ready(function () {
    $(document).on('click', '.updateview', function () {
        $idnew = $(this).attr("id");
        $txtname = $(this).attr("name");
        $country = $(this).attr("country");
        $address = $(this).attr("address");
        $city = $(this).attr("city");
        $postalCode = $(this).attr("postalCode");
        $latitude = $(this).attr("latitude");
        $longitude = $(this).attr("longitude");


        console.log($idnew),

            $('#updatepracticelocation').modal('show');
        $('#updateid').val($idnew);
        $('#updatetxtName').val($txtname);
        $('#updatetxtAddress').val($address);
        $('#updatetxtCity').val($city);
        $('#updatetxtCountry').val($country);
        $('#updatetxtPostalCode').val($postalCode);
        $('#updatetxtLatitude').val($latitude);
        $('#updatetxtLongitude').val($longitude);

    });
});


