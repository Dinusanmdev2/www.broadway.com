$("#mainloader").show();
//Initialation
$(document).ready(function () {
    $('#assosiation').DataTable();

    $("#associationname").selectize({
        maxItems: null,
    });

    $("#associationname").selectize();

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

    // var phonenum = $("#phonenum").val();
    // console.log(phonenum);
    // var contactInput = document.querySelector("#updatecontactphonenumber");
    // const contactData = window.intlTelInputGlobals.getInstance(contactInput);
    // contactData.setNumber(phonenum);

});
//Initialation

$("body").on("click", "#adminbtn", function () {
    var formData = new FormData();
    //CSRF Protection
    var CSRF_TOKEN = $("#CSRF_TOKEN").val();
    formData.append("CSRF_TOKEN", CSRF_TOKEN);
    //CSRF Protection

    var txtCountry = $("#txtCountry").val();
    newtxtCountry = txtCountry.replace(/#/g, ' ');
    formData.append("txtCountry", newtxtCountry);

    var catname = $("#catname").val();
    newcatname = catname.replace(/#/g, ' ');
    formData.append("catname", newcatname);

    var associationname = $("#associationname").val();
    newassociation = associationname.replace(/#/g, ' ');
    formData.append("associationname", newassociation);


    if (catname == "") {
        $("#catname").focus();
        $.alert({
            title: "Alert!",
            content: "Please select the category",
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

    if (associationname == "") {
        $("#associationname").focus();
        $.alert({
            title: "Alert!",
            content: "Please enter the association Name",
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
        url: "ajax/manage-association.php",
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
                content: "<strong>Successfully!</strong>.",
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



$("body").on("click", "#addchapter", function () {

    var formData = new FormData();


    //CSRF Protection
    var CSRF_TOKEN = $("#CSRF_TOKEN").val();
    formData.append("CSRF_TOKEN", CSRF_TOKEN);
    //CSRF Protection

    var txtCountry = $("#txtCountry").val();
    newtxtCountry = txtCountry.replace(/#/g, ' ');
    formData.append("txtCountry", newtxtCountry);

    var catname = $("#catnamecheck").val();
    newcatname = catname.replace(/#/g, ' ');
    formData.append("catname", newcatname);

    var associationname = $("#associationname").val();
    newassociation = associationname.replace(/#/g, ' ');
    formData.append("associationname", newassociation);

    var address = $("#address").val();
    newaddress = address.replace(/#/g, ' ');
    formData.append("address", newaddress);

    var email = $("#email").val();
    newemail = email.replace(/#/g, ' ');
    formData.append("email", newemail);

    var personname = $("#personname").val();
    newpersonname = personname.replace(/#/g, ' ');
    formData.append("personname", newpersonname);

    // var contactphonenumber = $("#contactphonenumber").val();
    // newcontactphonenumber = contactphonenumber.replace(/#/g, ' ');
    // formData.append("contactphonenumber", newcontactphonenumber);

    var contactInput = document.querySelector("#contactphonenumber");
    const contactData = window.intlTelInputGlobals.getInstance(contactInput);
    var contactNo = contactData.getNumber();
    formData.append("contactphonenumber", contactNo);

    var chaptername = $("#chaptername").val();
    newchaptername = chaptername.replace(/#/g, ' ');
    formData.append("chaptername", newchaptername);


    // console.log(txtCountry);
    // console.log(catname);
    // console.log(associationname);
    // console.log(address);
    // console.log(email);
    // console.log(personname);

    if (catname == "") {
        $("#catname").focus();
        $.alert({
            title: "Alert!",
            content: "Please select the category",
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

    if (associationname == "") {
        $("#associationname").focus();
        $.alert({
            title: "Alert!",
            content: "Please enter the association Name",
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
        url: "ajax/create-chapter-association.php",
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
                content: "<strong>Successfully!</strong>.",
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


$("body").on("change", "#catnamecheck", function () {
    var formData = new FormData();

    var catname = $("#catnamecheck").val();
    formData.append("catname", catname);

    var txtCountry = $("#txtCountry").val();
    formData.append("txtCountry", txtCountry);

    console.log(txtCountry);
    console.log(catname);

    $.ajax({
        url: "ajax/chapter-association-controller.php",
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

            const responceData = JSON.parse(data);
            console.log(responceData);

            if (responceData["code"] == 200) {

                $("#associationname").html(responceData.category);
                $("#associationname")[0].selectize.destroy();
                $("#associationname").selectize();

            }

        },
        error: function (data) {
            console.log(data);
            $("#overlay-Loader").hide();


        },
    });

});

//user reset password
$("body").on("click", "#userresetpassword", function () {
    var formData = new FormData();

    var currentpassword = $("#currentpassword").val();
    formData.append("currentpassword", currentpassword);

    var newpassword = $("#newpassword").val();
    formData.append("newpassword", newpassword);

    var retypepassword = $("#retypepassword").val();
    formData.append("retypepassword", retypepassword);

    var accountemail = $('#accountemail').val();
    formData.append("accountemail", accountemail);

    if (currentpassword == "") {
        $("#currentpassword").focus();
        $.alert({
            title: "Alert!",
            content: "Please Enter The Current Password",
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

    if (newpassword == "") {
        $("#newpassword").focus();
        $.alert({
            title: "Alert!",
            content: "Please Enter The New Password",
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

    if (retypepassword == "") {
        $("#retypepassword").focus();
        $.alert({
            title: "Alert!",
            content: "Please Enter The Re-Type Password",
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

    if (retypepassword != newpassword) {
        $.alert({
            title: "Alert!",
            content: "Password Not Match Try Again!",
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
        url: "ajax/resetpassword-user-controller.php",
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

            const responceData = JSON.parse(data);
            console.log(responceData);

            if (responceData["code"] == 200) {
                $.alert({
                    title: "Success!",
                    content: "Reset<strong>Successfully!</strong>.",
                    icon: "fa fa-check-circle",
                    type: "green",
                    buttons: {
                        okay: function () {
                            location.reload();
                        },
                    },
                });

            }else if(responceData['code'] == 400){
                $.alert({
                    title: "Alert!",
                    content: "Current Password Wrong Try Again!",
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

        },
        error: function (data) {
            console.log(data);
            $("#overlay-Loader").hide();


        },
    });

});
//user reset password

$("body").on("change", "#txtCountry", function () {

    var formData = new FormData();

    var catname = $("#catnamecheck").val();
    formData.append("catname", catname);

    var txtCountry = $("#txtCountry").val();
    formData.append("txtCountry", txtCountry);

    console.log(txtCountry);
    console.log(catname);

    $.ajax({
        url: "ajax/chapter-association-controller.php",
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

            const responceData = JSON.parse(data);
            console.log(responceData);

            if (responceData["code"] == 200) {

                $("#associationname").html(responceData.category);
                $("#associationname").selectize();
                $("#associationname")[0].selectize.destroy();
            }

        },
        error: function (data) {
            console.log(data);
            $("#overlay-Loader").hide();


        },
    });

});


delete
    $("body").on("click", ".deleteassociate", function () {
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
                        url: "ajax/associate-delete.php",
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


$("body").on("click", ".deletechapter", function () {
    var formData = new FormData();

    //CSRF Protection
    var CSRF_TOKEN = $("#CSRF_TOKEN").val();
    formData.append("CSRF_TOKEN", CSRF_TOKEN);
    //CSRF Protection

    var id = $(this).attr("id");
    formData.append("id", id);

    var email = $(this).attr("email");
    formData.append("email", email);

    $.confirm({
        title: "Confirm!",
        content: "Are you sure want to delete ?",
        buttons: {
            confirm: function () {
                $.ajax({
                    url: "ajax/chapter-delete-controller.php",
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


delete
    $("body").on("click", ".deleteassociation", function () {
        var formData = new FormData();

        //CSRF Protection
        var CSRF_TOKEN = $("#CSRF_TOKEN").val();
        formData.append("CSRF_TOKEN", CSRF_TOKEN);
        //CSRF Protection

        var id = $(this).attr("id");
        formData.append("id", id);

        var contry = $(this).attr("contry");
        formData.append("contry", contry);


        console.log(contry);

        $.confirm({
            title: "Confirm!",
            content: "Are you sure want to delete ?",
            buttons: {
                confirm: function () {
                    $.ajax({
                        url: "ajax/associate-delete.php",
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
                                        window.location.href = "index.php?page=manage-association";
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

$("body").on("click", ".updatebtn", function () {

    var formData = new FormData();


    //CSRF Protection
    var CSRF_TOKEN = $("#CSRF_TOKEN").val();
    formData.append("CSRF_TOKEN", CSRF_TOKEN);
    //CSRF Protection

    var txtCountry = $("#txtCountry").val();
    newtxtCountry = txtCountry.replace(/#/g, ' ');
    formData.append("txtCountry", newtxtCountry);

    var catname = $("#catname").val();
    newcatname = catname.replace(/#/g, ' ');
    formData.append("catname", newcatname);

    var associationname = $("#associationname").val();
    newassociation = associationname.replace(/#/g, ' ');
    formData.append("associationname", newassociation);



    // var contactphonenumber = $("#contactphonenumber").val();
    // newcontactphonenumber = contactphonenumber.replace(/#/g, ' ');
    // formData.append("contactphonenumber", newcontactphonenumber);

    // var contactInput = document.querySelector("#contactphonenumber");
    // const contactData = window.intlTelInputGlobals.getInstance(contactInput);
    // var contactNo = contactData.getNumber();
    // formData.append("contactphonenumber", contactNo);

    // var chaptername = $("#chaptername").val();
    // newchaptername = chaptername.replace(/#/g, ' ');
    // formData.append("chaptername", newchaptername);

    var id = $(this).attr("id");
    formData.append("id", id);




    if (catname == "") {
        $("#catname").focus();
        $.alert({
            title: "Alert!",
            content: "Please select the category",
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

    if (associationname == "") {
        $("#associationname").focus();
        $.alert({
            title: "Alert!",
            content: "Please enter the association Name",
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
        url: "ajax/association-edit.php",
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
                content: "<strong>Successfully!</strong>.",
                icon: "fa fa-check-circle",
                type: "green",
                buttons: {
                    okay: function () {
                        window.location.href = "index.php?page=manage-association";
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


$("body").on("click", "#updatechapter", function () {

    var formData = new FormData();


    //CSRF Protection
    var CSRF_TOKEN = $("#CSRF_TOKEN").val();
    formData.append("CSRF_TOKEN", CSRF_TOKEN);
    //CSRF Protection

    var txtCountry = $("#updatetxtCountry").val();
    newtxtCountry = txtCountry.replace(/#/g, ' ');
    formData.append("txtCountry", newtxtCountry);

    var catname = $("#updatecatnamecheck").val();
    newcatname = catname.replace(/#/g, ' ');
    formData.append("catname", newcatname);

    var associationname = $("#updateassociationname").val();
    newassociation = associationname.replace(/#/g, ' ');
    formData.append("associationname", newassociation);

    var address = $("#updateaddress").val();
    newaddress = address.replace(/#/g, ' ');
    formData.append("address", newaddress);

    var email = $("#updateemail").val();
    newemail = email.replace(/#/g, ' ');
    formData.append("email", newemail);

    var personname = $("#updatepersonname").val();
    newpersonname = personname.replace(/#/g, ' ');
    formData.append("personname", newpersonname);

    // var contactphonenumber = $("#contactphonenumber").val();
    // newcontactphonenumber = contactphonenumber.replace(/#/g, ' ');
    // formData.append("contactphonenumber", newcontactphonenumber);

    var contactInput = document.querySelector("#updatecontactphonenumber");
    const contactData = window.intlTelInputGlobals.getInstance(contactInput);
    var contactNo = contactData.getNumber();
    formData.append("contactphonenumber", contactNo);

    var chaptername = $("#updatechaptername").val();
    newchaptername = chaptername.replace(/#/g, ' ');
    formData.append("chaptername", newchaptername);


    var chapterid = $("#chapterid").val();
    newchapterid = chapterid.replace(/#/g, ' ');
    formData.append("chapterid", newchapterid);

    // console.log(txtCountry);
    // console.log(catname);
    // console.log(associationname);
    // console.log(address);
    // console.log(email);
    // console.log(personname);

    if (catname == "") {
        $("#catname").focus();
        $.alert({
            title: "Alert!",
            content: "Please select the category",
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

    if (associationname == "") {
        $("#associationname").focus();
        $.alert({
            title: "Alert!",
            content: "Please enter the association Name",
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
        url: "ajax/update-chapter-association.php",
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
                content: "<strong>Successfully!</strong>.",
                icon: "fa fa-check-circle",
                type: "green",
                buttons: {
                    okay: function () {
                        window.location.href = "index.php?page=manage-association";
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


//Edit view model
$(document).ready(function () {
    $(document).on('click', '.resetview', function () {
        $accountemail = $(this).attr("accountemail");

            $('#resetpasswordmodal').modal('show');
        $('#accountemail').val($accountemail);

    });
});