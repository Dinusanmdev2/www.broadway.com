//table content view
// $(document).ready(function(){
//     $('#viewtable').DataTable();
// });

// //upload image view
// function readURL(input) {
//   if (input.files && input.files[0]) {
//     var reader = new FileReader();

//     reader.onload = function (e) {
//       $('#imageview').attr('src', e.target.result).width(400).height(400);
//     };

//     reader.readAsDataURL(input.files[0]);
//   }
// }

//cropper image
// $(document).ready(function () {
//   var $modal = $("#modal_crop");
//   var crop_image = document.getElementById("sample_image");
//   var cropper;
//   $("#fileupload").change(function (event) {
//     var files = event.target.files;
//     var done = function (url) {
//       crop_image.src = url;
//       $modal.modal("show");
//     };
//     if (files && files.length > 0) {
//       reader = new FileReader();
//       reader.onload = function (event) {
//         done(reader.result);
//       };
//       reader.readAsDataURL(files[0]);
//     }
//   });
//   $modal
//     .on("shown.bs.modal", function () {
//       cropper = new Cropper(crop_image, {
//         aspectRatio: 1,
//         viewMode: 3,
//         preview: ".preview",
//       });
//     })
//     .on("hidden.bs.modal", function () {
//       cropper.destroy();
//       cropper = null;
//     });
//   $("#crop_and_upload").click(function () {
//     canvas = cropper.getCroppedCanvas({
//       width: 400,
//       height: 400,
//     });
//     canvas.toBlob(function (blob) {
//       url = URL.createObjectURL(blob);
//       var reader = new FileReader();
//       reader.readAsDataURL(blob);
//       reader.onloadend = function () {
//         var base64data = reader.result;
//         var formData = new FormData();
//         //CSRF Protection
//         var CSRF_TOKEN = $("#CSRF_TOKEN").val();
//         formData.append("CSRF_TOKEN", CSRF_TOKEN);
//         //CSRF Protection
//         var image = base64data;
//         formData.append("image", image);
//         console.log(image);
//         $modal.modal("hide");


//       };
//     });
//   });
// });


let imageInput = document.getElementById('fileupload');
imageInput.addEventListener('change', function() {
    let file = imageInput.files[0];
    let reader = new FileReader();

        reader.addEventListener('load', function() {
        let imageDataUrl = reader.result;
        // Do something with the image data URL (e.g., display it in an image element)
       

         $("body").on("click", "#addarticle", function () {
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
        
          formData.append("fileupload", imageDataUrl);
          
          console.log(imageDataUrl);
          console.log(bloggerhead);
          console.log(bloggerbody);
          console.log(bloggerbody);

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

          if (bloggerbody == "<p><br></p>") {
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
            url: "ajax/blogger-tool.php",
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

var $mSelect = $("#Category").selectize({
  placeholder: "Select a Permission",
});





