

  $("body").on("click", ".reuploadimage", function () {
    var formData = new FormData();
    
    //CSRF Protection
    var CSRF_TOKEN = $("#CSRF_TOKEN").val();
    formData.append("CSRF_TOKEN", CSRF_TOKEN);
    //CSRF Protection
  
    var fileupload = $("#fileupload").val();
    //validaton start here
  
    if (fileupload == "") {
      $("#fileupload").focus();
      $.alert({
        title: "Alert!",
        content: "Please select the Banner Image",
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
  
  
  });
  

let imageInput = document.getElementById('fileupload');
imageInput.addEventListener('change', function() {
  let file = imageInput.files[0];
  let reader = new FileReader();

      reader.addEventListener('load', function() {
      let imageDataUrl = reader.result;
      // Do something with the image data URL (e.g., display it in an image element)
     

       $("body").on("click", ".reuploadimage", function () {
        var formData = new FormData();
        
        //CSRF Protection
        var CSRF_TOKEN = $("#CSRF_TOKEN").val();
        formData.append("CSRF_TOKEN", CSRF_TOKEN);
        //CSRF Protection
      
        formData.append("fileupload", imageDataUrl);
        var id = $(this).attr("id");
        formData.append("id", id);
        console.log(imageDataUrl);
        console.log(id);
        var fileupload = $("#fileupload").val();
        
        //validaton start here

        if (fileupload == "") {
          $("#fileupload").focus();
          $.alert({
            title: "Alert!",
            content: "Please select the Banner Image",
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
          url: "ajax/change-blogger-banner.php",
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

  });
    
  



  reader.readAsDataURL(file);
});
