
$(document).ready(function () {
    $('#usermanage').DataTable();
});

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


//Admin account create
$("body").on("click", "#usercreate", function () {
    var formData = new FormData();

    var txtFName = $("#txtFName").val();
    formData.append("txtFName", txtFName);

    var txtLastName = $("#txtLastName").val();
    formData.append("txtLastName", txtLastName);

    var txtEmail = $("#txtEmail").val();
    formData.append("txtEmail", txtEmail);

    var contactInput = document.querySelector("#txtPhone");
    const contactData = window.intlTelInputGlobals.getInstance(contactInput);
    var contactNo = contactData.getNumber();
    formData.append("txtPhone", contactNo);

    var txtCountry = $("#txtCountry").val();
    formData.append("txtCountry", txtCountry);

    var txtCity = $("#txtCity").val();
    formData.append("txtCity", txtCity);

    var txtAddress = $("#txtAddress").val();
    formData.append("txtAddress", txtAddress);
    
    // var txtPostCode = $("#txtPostCode").val();
    // formData.append("txtPostCode", txtPostCode);
    
    var txtPassword = $("#txtPassword").val();
    formData.append("txtPassword", txtPassword);

    var txtRePassword = $("#txtRePassword").val();
    formData.append("txtRePassword", txtRePassword);
    
    var accounttype = $("#accounttype").val();
    formData.append("accounttype", accounttype);

    console.log(txtFName);
    console.log(txtCountry);
    console.log(contactNo);

    //Validation
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

    if (txtEmail == "") {
        $("#txtEmail").focus();
        $.alert({
            title: "Alert!",
            content: "Please enter the Email Address",
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

    if (txtPassword == "") {
        $("#txtPassword").focus();
        $.alert({
            title: "Alert!",
            content: "Please enter the Password",
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

    if (txtRePassword == "") {
        $("#txtRePassword").focus();
        $.alert({
            title: "Alert!",
            content: "Please enter the Password",
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

    if (txtPassword != txtRePassword) {
       
        $.alert({
            title: "Alert!",
            content: "Password Not Match!",
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
    //End Validation



    $.ajax({
        url: "ajax/manage-user-controller.php",
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
                content: "create <strong>Successfull!</strong>.",
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



