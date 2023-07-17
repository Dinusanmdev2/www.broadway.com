//Initialation
$(document).ready(function () {
    $('#tblEmailTemp').DataTable();
  });
  //Initialation


$("body").on("click", "#addtemplate", function () {

        var formData = new FormData();


        //CSRF Protection
        var CSRF_TOKEN = $("#CSRF_TOKEN").val();
        formData.append("CSRF_TOKEN", CSRF_TOKEN);
        //CSRF Protection
    
        var signupemail = $("#signupemail").val();
        formData.append("signupemail", signupemail);

                var emailsubject = $("#emailsubject").val();
        formData.append("emailsubject", emailsubject);
    
        var emailbody = $('#emailbody').summernote('code');
        formData.append("contents", emailbody);
        
    
        console.log(emailsubject);
        console.log(emailbody);
        console.log(signupemail);

            if (signupemail == "") {
            $("#signupemail").focus();
            $.alert({
                title: "Alert!",
                content: "Please select the Template",
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

        if (emailsubject == "") {
            $("#emailsubject").focus();
            $.alert({
                title: "Alert!",
                content: "Please enter the Subject",
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

   

        if (emailbody == "<p><br></p>") {
            $("#emailbody").focus();
            $.alert({
                title: "Alert!",
                content: "Please enter the Body",
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
            url: "ajax/email-template.php",
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
   





    $("body").on("click", "#updatetemplate", function () {

        var formData = new FormData();


        //CSRF Protection
        var CSRF_TOKEN = $("#CSRF_TOKEN").val();
        formData.append("CSRF_TOKEN", CSRF_TOKEN);
        //CSRF Protection
    
        var signupemail = $("#signupemail").val();
        formData.append("signupemail", signupemail);

                var emailsubject = $("#emailsubject").val();
        formData.append("emailsubject", emailsubject);
    
        var emailbody = $('#emailbody').summernote('code');
        formData.append("contents", emailbody);
        
    
        console.log(emailsubject);
        console.log(emailbody);
        console.log(signupemail);

            if (signupemail == "") {
            $("#signupemail").focus();
            $.alert({
                title: "Alert!",
                content: "Please select the Template",
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

        if (emailsubject == "") {
            $("#emailsubject").focus();
            $.alert({
                title: "Alert!",
                content: "Please enter the Subject",
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

   

        if (emailbody == "<p><br></p>") {
            $("#emailbody").focus();
            $.alert({
                title: "Alert!",
                content: "Please enter the Body",
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
            url: "ajax/email-template.php",
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
                             window.location.href = "index.php?page=email-template";
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



//OTP Email 



    $("body").on("click", "#otpemail", function () {

        var formData = new FormData();


        //CSRF Protection
        var CSRF_TOKEN = $("#CSRF_TOKEN").val();
        formData.append("CSRF_TOKEN", CSRF_TOKEN);
        //CSRF Protection
    
        var otpemailsubject = $("#otpemailsubject").val();
        formData.append("otpemailsubject", otpemailsubject);
    
        var otpc = $('#otpemailtext').summernote('code');
        formData.append("otpcontents", otpc);  
    
        console.log(otpemailsubject);
        console.log(otpc);

                if (otpemailsubject == "") {
            $("#otpemailsubject").focus();
            $.alert({
                title: "Alert!",
                content: "Please enter the Subject",
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

        if (otpc == "<p><br></p>") {
            $("#otpcontents").focus();
            $.alert({
                title: "Alert!",
                content: "Please enter the Body",
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
            url: "ajax/otp-emailtemplate.php",
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
   


    delete
    $("body").on("click", ".deletetemplate", function () {
        var formData = new FormData();

        //CSRF Protection
        var CSRF_TOKEN = $("#CSRF_TOKEN").val();
        formData.append("CSRF_TOKEN", CSRF_TOKEN);
        //CSRF Protection

        var temname = $(this).attr("temname");
   
        formData.append("id", temname);

        console.log(temname);

        $.confirm({
            title: "Confirm!",
            content: "Are you sure want to delete ?",
            buttons: {
                confirm: function () {
                    $.ajax({
                        url: "ajax/email-template-delete.php",
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
    $("body").on("click", ".deletetemplated", function () {
        var formData = new FormData();

        //CSRF Protection
        var CSRF_TOKEN = $("#CSRF_TOKEN").val();
        formData.append("CSRF_TOKEN", CSRF_TOKEN);
        //CSRF Protection

        var temname = $(this).attr("temname");
       
        formData.append("id", temname);

        console.log(temname);

        $.confirm({
            title: "Confirm!",
            content: "Are you sure want to delete ?",
            buttons: {
                confirm: function () {
                    $.ajax({
                        url: "ajax/email-template-delete.php",
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
                                        window.location.href = "index.php?page=email-template";
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

  