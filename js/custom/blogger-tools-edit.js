
$("body").on("click", ".updatearticle", function () {
    var formData = new FormData();
    
    //CSRF Protection
    var CSRF_TOKEN = $("#CSRF_TOKEN").val();
    formData.append("CSRF_TOKEN", CSRF_TOKEN);
    //CSRF Protection

    var bloggerhead = $("#bloggerhead").val();
    formData.append("bloggerhead", bloggerhead);

    var bloggerbody = $("#bloggerbody").summernote("code");
    formData.append("contents", bloggerbody);

    var Category = $("#Category").val();
    formData.append("Category", Category);

    var id = $(this).attr("id");
    formData.append("id", id);
  
    console.log(bloggerhead);
    console.log(bloggerbody);
    console.log(Category);
    console.log(id);

    //validaton start here

    if (bloggerhead == "") {
      $("#bloggerhead").focus();
      $.alert({
        title: "Alert!",
        content: "Please enter the Article Title",
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

    if (Category == "") {
      $("#Category").focus();
      $.alert({
        title: "Alert!",
        content: "Please enter the Category",
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

 

    if (bloggerbody == "<p></p>") {
      $("#bloggerbody").focus();
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

    if (bloggerbody == "") {
        $("#bloggerbody").focus();
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

      if (bloggerbody == "<br>") {
        $("#bloggerbody").focus();
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
      url: "ajax/blogger-tools-edit.php",
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
  $("body").on("click", ".btnDeletearticle", function () {
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
                      url: "ajax/delete-blogger.php",
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


//pin update

$("body").on("click", ".btnupdatepin", function () {
  var formData = new FormData();

  //CSRF Protection
  var CSRF_TOKEN = $("#CSRF_TOKEN").val();
  formData.append("CSRF_TOKEN", CSRF_TOKEN);
  //CSRF Protection

  
  var id = $(this).attr("id");
  formData.append("id", id);

  var category = $(this).attr("category");
  formData.append("category", category);

  var title = $(this).attr("title");
  formData.append("title", title);

  console.log(category);
  console.log(id);

  $.ajax({
    url: "ajax/blogger-tools-pin.php",
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

//unpin update

$("body").on("click", ".btnupdateunpin", function () {
  var formData = new FormData();

  //CSRF Protection
  var CSRF_TOKEN = $("#CSRF_TOKEN").val();
  formData.append("CSRF_TOKEN", CSRF_TOKEN);
  //CSRF Protection

  var id = $(this).attr("id");
  formData.append("id", id);

  console.log(id);

  $.ajax({
    url: "ajax/blogger-tools-unpin.php",
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