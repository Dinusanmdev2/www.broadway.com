var $mSelect = $("#multi-select").selectize({
  placeholder: "Select a Permission",
});

//permission-module function
$("body").on("click", "#permisionstart", function () {
  var formData = new FormData();
  //CSRF Protection
  var CSRF_TOKEN = $("#CSRF_TOKEN").val();
  formData.append("CSRF_TOKEN", CSRF_TOKEN);
  //CSRF Protection

  var userid = $("#userid").val();
  formData.append("userid", userid);

  var multi_select = $("#multi-select").val();
  formData.append("multi-select", multi_select);

  var doctors = document.getElementById("managedoctor");
  var location = document.getElementById("practicelocation");

  if (doctors.checked == false && location.checked == false) {
    $("#managedoctor").focus();
    $.alert({
      title: "Alert!",
      content: "Please select the Module",
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
  } else if (doctors.checked == true && location.checked == false) {
    var managedoctor = "1";
    var managelocation = "0";
  } else if (location.checked == true && doctors.checked == false) {
    var managedoctor = "0";
    var managelocation = "1";
  } else if (doctors.checked == true && location.checked == true) {
    var managedoctor = "1";
    var managelocation = "1";
  }

  console.log(userid);
  console.log(managelocation);
  console.log(managedoctor);
  console.log(multi_select);

  formData.append("managedoctor", managedoctor);

  formData.append("managelocation", managelocation);

  if (userid == "") {
    $("#userid").focus();
    $.alert({
      title: "Alert!",
      content: "Please select the user",
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

  if (multi_select == "") {
    $("#multi-select").focus();
    $.alert({
      title: "Alert!",
      content: "Please select the permission",
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
    url: "ajax/permission-module.php",
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
        content: "permission <strong>Successfull!</strong>.",
        icon: "fa fa-check-circle",
        type: "green",
        buttons: {
          okay: function () {
            window.location.href = "index.php?page=permission-module";
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

function showSelectedValue() {
  var selectElement = document.getElementById("userid");
  var selectedValue = selectElement.value;
  var selectedValueLabel = document.getElementById("selectedValueLabel");
  selectedValueLabel.textContent = selectedValue;
}





delete
  $("body").on("click", ".deletedata", function () {
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
            url: "ajax/permission-delete.php",
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



  $("body").on("change", "#userid", function () {
    var userid = $("#userid").val();
    console.log(userid);
  });