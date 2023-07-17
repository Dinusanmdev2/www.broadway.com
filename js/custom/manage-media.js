

function copyToClipboard(text) {
  var dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
  // document.getElementById("msg").innerHTML = "Copied";
}

delete
  $("body").on("click", "#deletebtn", function () {
    var formData = new FormData();

    //CSRF Protection
    var CSRF_TOKEN = $("#CSRF_TOKEN").val();
    formData.append("CSRF_TOKEN", CSRF_TOKEN);
    //CSRF Protection

    var image = $(this).attr("image");
    formData.append("image", image);

    console.log(image);

    $.confirm({
      title: "Confirm!",
      content: "Are you sure want to delete ?",
      buttons: {
        confirm: function () {
          $.ajax({
            url: "ajax/delete-image.php",
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

//pdf uploaded
// function getPDFUrl(input) {

//   if (input.files && input.files[0]) {

//     const reader = new FileReader();
//     reader.onload = function (e) {

//       const pdfUrl = e.target.result;
//       const ftype = input.files[0].type;
//       // console.log(pdfUrl);         // This will log the URL of the PDF file
//       //console.log(input.files[0].type);
//       //uploadpdf(pdfUrl);

//       uploaded(ftype, pdfUrl);
//     }
//     reader.readAsDataURL(input.files[0]);

//   }
// }


// function uploaded(ftype,pdfUrl) {
//   // console.log(pdfUrl);
//   // console.log(ftype);
//   if (ftype == 'application/pdf') {

//     var formData = new FormData();
//     formData.append("images", pdfUrl);
//     $.ajax({
//       url: "ajax/upload-pdf.php",
//       type: "POST",
//       cache: false,
//       processData: false,
//       contentType: false,
//       data: formData,
//       beforeSend: function () {
//         $("#overlay-Loader").show();
//       },
//       success: function (data) {
//         $("#overlay-Loader").hide();
//         console.log(data);
//         $.alert({
//           title: "Success!",
//           content: "Upload <strong>Successfull!</strong>.",
//           icon: "fa fa-check-circle",
//           type: "green",
//           buttons: {
//             okay: function () {
//               location.reload();
//             },
//           },
//         });
//         return false;
//       },
//       error: function (data) {
//         console.log(data);
//         $("#overlay-Loader").hide();


//       },
//     });

//   } else {
 
//   }
// }


   //cropper image
    $(document).ready(function () {
      var $modal = $('#modal_crop');
      var crop_image = document.getElementById('sample_image');
      var cropper;
      $('#fileupload').change(function (event) {
        var files = event.target.files;
        var done = function (url) {
          crop_image.src = url;
          $modal.modal('show');
        };
        if (files && files.length > 0) {
          reader = new FileReader();
          reader.onload = function (event) {
            done(reader.result);
          };
          reader.readAsDataURL(files[0]);
        }
      });
      $modal.on('shown.bs.modal', function () {
        cropper = new Cropper(crop_image, {
          aspectRatio: 1,
          viewMode: 3,
          preview: '.preview'
        });
      }).on('hidden.bs.modal', function () {
        cropper.destroy();
        cropper = null;
      });
      $('#crop_and_upload').click(function () {
        canvas = cropper.getCroppedCanvas({
          width: 400,
          height: 400,
        });
        canvas.toBlob(function (blob) {
          url = URL.createObjectURL(blob);
          var reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = function () {
            var base64data = reader.result;
            var formData = new FormData();
            //CSRF Protection
            var CSRF_TOKEN = $("#CSRF_TOKEN").val();
            formData.append("CSRF_TOKEN", CSRF_TOKEN);
            //CSRF Protection
            var image = base64data;
            formData.append("image", image);
            console.log(image)
            $modal.modal('hide');


            $("body").on("click", "#uploadbtn", function () {
              var formData = new FormData();

              var option = $("#option").val();
              formData.append("option", option);

              var filename = $("#filename").val();
              formData.append("filename", filename);

              var description = $("#description").val();
              formData.append("description", description);

              var fileupload = $("#fileupload").val();
              formData.append("fileupload", fileupload);

              var images = base64data;
              formData.append("images", images);
              console.log(images);
              //validation 

              if (option == "") {
                $("#option").focus();
                $.alert({
                  title: "Alert!",
                  content: "Please select the file type",
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

              if (filename == "") {
                $("#filename").focus();
                $.alert({
                  title: "Alert!",
                  content: "Please enter the filename",
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

              if (description == "") {
                $("#description").focus();
                $.alert({
                  title: "Alert!",
                  content: "Please enter the description",
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
                url: "ajax/upload-image.php",
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
                    content: "Upload <strong>Successfull!</strong>.",
                    icon: "fa fa-check-circle",
                    type: "green",
                    buttons: {
                      okay: function () {
                        location.reload();
                      },
                    },
                  });
                  return false;
                },
                error: function (data) {
                  console.log(data);
                  $("#overlay-Loader").hide();


                },
              });
            });
          };
        });
      });
    });

// function uploadpdf(pdfUrl) {



// }

















