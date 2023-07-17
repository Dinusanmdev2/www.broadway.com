    $("body").on("click", "#savecat", function () {

        var formData = new FormData();


        //CSRF Protection
        var CSRF_TOKEN = $("#CSRF_TOKEN").val();
        formData.append("CSRF_TOKEN", CSRF_TOKEN);
        //CSRF Protection
    
        var icons = $("#icons").val();
        formData.append("icons", icons);

        var categoryname = $("#categoryname").val();
        formData.append("categoryname", categoryname);
    
    
        console.log(icons);
        console.log(categoryname);
   

            if (categoryname == "") {
            $("#categoryname").focus();
            $.alert({
                title: "Alert!",
                content: "Please enter the categoryname",
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

        if (icons == "") {
            $("#icons").focus();
            $.alert({
                title: "Alert!",
                content: "Please select the icon",
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
            url: "ajax/manage-category.php",
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
    $("body").on("click", ".deletecat", function () {
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
            content: "Are you sure want to delete ?",
            buttons: {
                confirm: function () {
                    $.ajax({
                        url: "ajax/category-delete.php",
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
    $("body").on("click", ".deletecategory", function () {
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
            content: "Are you sure want to delete ?",
            buttons: {
                confirm: function () {
                    $.ajax({
                        url: "ajax/category-delete.php",
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
                                        window.location.href = "index.php?page=manage-category";
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

//update category
    $("body").on("click", ".updatecat", function () {

        var formData = new FormData();


        //CSRF Protection
        var CSRF_TOKEN = $("#CSRF_TOKEN").val();
        formData.append("CSRF_TOKEN", CSRF_TOKEN);
        //CSRF Protection
    
        var icons = $("#icons").val();
        formData.append("icons", icons);

        var categoryname = $("#categoryname").val();
        formData.append("categoryname", categoryname);
    
        var id = $(this).attr("id");
        formData.append("id", id);
    
        console.log(icons);
        console.log(categoryname);
   

            if (categoryname == "") {
            $("#categoryname").focus();
            $.alert({
                title: "Alert!",
                content: "Please enter the categoryname",
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

        if (icons == "") {
            $("#icons").focus();
            $.alert({
                title: "Alert!",
                content: "Please select the icon",
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
            url: "ajax/edit-category.php",
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
                            window.location.href = "index.php?page=manage-category";
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