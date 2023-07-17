$("body").on("click", "#doctorfileupload", function () {
    $("#doctorfileupload").change(function (event) {
        var csvFile = document.getElementById("doctorfileupload").files[0];
        var fileReader = new FileReader();
        fileReader.onload = function (e) {
            var contents = e.target.result;
            var lines = contents.split('\n');
            var headerLine = lines[0];
            var headerFields = headerLine.split(',');
            //firstname
            var firstname = $('<select class="form-control" id="firstnameoption"><option value="" readonly>--select field---</option></select>');
            for (var i = 0; i < headerFields.length; i++) {
                var option = $('<option></option>').text(headerFields[i]).val(headerFields[i]);
                firstname.append(option);
            }
            $('#firstname').empty().append(firstname);

            //lastname
            var lastname = $('<select class="form-control"  id="lastnameoption"><option value="" readonly>--select field---</option></select>');
            for (var i = 0; i < headerFields.length; i++) {
                var option = $('<option></option>').text(headerFields[i]).val(headerFields[i]);
                lastname.append(option);
            }
            $('#lastname').empty().append(lastname);

            //Email
            var email = $('<select class="form-control" id="emailoption"><option value="" readonly>--select field---</option></select>');
            for (var i = 0; i < headerFields.length; i++) {
                var option = $('<option></option>').text(headerFields[i]).val(headerFields[i]);
                email.append(option);
            }
            $('#email').empty().append(email);

            //Main_Specialization
            var Main_Specialization = $('<select class="form-control"  id="Main_Specializationoption"><option value="" readonly>--select field---</option></select>');
            for (var i = 0; i < headerFields.length; i++) {
                var option = $('<option></option>').text(headerFields[i]).val(headerFields[i]);
                Main_Specialization.append(option);
            }
            $('#Main_Specialization').empty().append(Main_Specialization);

            //phone
            var phone = $('<select class="form-control"  id="phoneoption"><option value="" readonly>--select field---</option></select>');
            for (var i = 0; i < headerFields.length; i++) {
                var option = $('<option></option>').text(headerFields[i]).val(headerFields[i]);
                phone.append(option);
            }
            $('#phone').empty().append(phone);

            //country
            var country = $('<select class="form-control" id="countryoption"><option value="" readonly>--select field---</option></select>');
            for (var i = 0; i < headerFields.length; i++) {
                var option = $('<option></option>').text(headerFields[i]).val(headerFields[i]);
                country.append(option);
            }
            $('#country').empty().append(country);

            //city
            var city = $('<select class="form-control" id="cityoption"><option value="" readonly>--select field---</option></select>');
            for (var i = 0; i < headerFields.length; i++) {
                var option = $('<option></option>').text(headerFields[i]).val(headerFields[i]);
                city.append(option);
            }
            $('#city').empty().append(city);

            //Postal Code
            var PostalCode = $('<select class="form-control"  id="PostalCodeoption"><option value="" readonly>--select field---</option></select>');
            for (var i = 0; i < headerFields.length; i++) {
                var option = $('<option></option>').text(headerFields[i]).val(headerFields[i]);
                PostalCode.append(option);
            }
            $('#PostalCode').empty().append(PostalCode);

            //Address
            var Address = $('<select class="form-control" id="Addressoption"><option value="" readonly>--select field---</option></select>');
            for (var i = 0; i < headerFields.length; i++) {
                var option = $('<option></option>').text(headerFields[i]).val(headerFields[i]);
                Address.append(option);
            }
            $('#Address').empty().append(Address);

            

            //Sub_Specialization
            var Sub_Specialization = $('<select class="form-control"  id="Sub_Specializationoption"><option value="" readonly>--select field---</option></select>');
            for (var i = 0; i < headerFields.length; i++) {
                var option = $('<option></option>').text(headerFields[i]).val(headerFields[i]);
                Sub_Specialization.append(option);
            }
            $('#Sub_Specialization').empty().append(Sub_Specialization);

            console.log(headerFields);
        };
        fileReader.readAsText(csvFile);

        $('#showdoctorfile').show();
    });
});


//doctor bulk uploaded ajax
$("body").on("click", "#updatedoctormaping", function () {
    var formData = new FormData();
  
    //CSRF Protection
    var CSRF_TOKEN = $("#CSRF_TOKEN").val();
    formData.append("CSRF_TOKEN", CSRF_TOKEN);
    //CSRF Protection
  
    var firstnameoption = $("#firstnameoption").val();
    firstnameoption = firstnameoption.replace(/\r/g, '');
    formData.append("firstnameoption", firstnameoption);

    var lastnameoption = $("#lastnameoption").val();
    lastnameoption = lastnameoption.replace(/\r/g, '');
    formData.append("lastnameoption", lastnameoption);

    var emailoption = $("#emailoption").val();
    emailoption = emailoption.replace(/\r/g, '');
    formData.append("emailoption", emailoption);

    var Main_Specializationoption = $("#Main_Specializationoption").val();
    Main_Specializationoption = Main_Specializationoption.replace(/\r/g, '');
    formData.append("Main_Specializationoption", Main_Specializationoption);

    var phoneoption = $("#phoneoption").val();
    phoneoption = phoneoption.replace(/\r/g, '');
    formData.append("phoneoption", phoneoption);

    var countryoption = $("#countryoption").val();
    countryoption = countryoption.replace(/\r/g, '');
    formData.append("countryoption", countryoption);

    var cityoption = $("#cityoption").val();
    cityoption = cityoption.replace(/\r/g, '');
    formData.append("cityoption", cityoption);

    var PostalCodeoption = $("#PostalCodeoption").val();
    PostalCodeoption = PostalCodeoption.replace(/\r/g, '');
    formData.append("PostalCodeoption", PostalCodeoption);

    var Addressoption = $("#Addressoption").val();
    Addressoption = Addressoption.replace(/\r/g, '');
    formData.append("Addressoption", Addressoption);

    var Sub_Specializationoption = $("#Sub_Specializationoption").val();
    Sub_Specializationoption = Sub_Specializationoption.replace(/\r/g, '');
    formData.append("Sub_Specializationoption", Sub_Specializationoption);

    var csvFile = document.getElementById("doctorfileupload").files[0];
    formData.append("csvFile", csvFile);
  


    console.log(firstnameoption);
    console.log(Main_Specializationoption);
    console.log(Sub_Specializationoption);
  
    //validaton start here
  
    if (firstnameoption == "") {
      $("#firstnameoption").focus();
      $.alert({
        title: "Alert!",
        content: "Please select the firstname destination",
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

    if (lastnameoption == "") {
        $("#lastnameoption").focus();
        $.alert({
          title: "Alert!",
          content: "Please select the lastname destination",
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

      if (emailoption == "") {
        $("#emailoption").focus();
        $.alert({
          title: "Alert!",
          content: "Please select the email destination",
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

      if (Main_Specializationoption == "") {
        $("#Main_Specializationoption").focus();
        $.alert({
          title: "Alert!",
          content: "Please select the Main_Specialization destination",
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
      url: "ajax/doctor-bulk-upload.php",
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


  //patient bulk uploded ajax 
  $("body").on("click", "#updatepatientmaping", function () {
    var formData = new FormData();
  
    //CSRF Protection
    var CSRF_TOKEN = $("#CSRF_TOKEN").val();
    formData.append("CSRF_TOKEN", CSRF_TOKEN);
    //CSRF Protection
  
    var firstnameoption = $("#firstnameoption").val();
    firstnameoption = firstnameoption.replace(/\r/g, '');
    formData.append("firstnameoption", firstnameoption);

    var lastnameoption = $("#lastnameoption").val();
    lastnameoption = lastnameoption.replace(/\r/g, '');
    formData.append("lastnameoption", lastnameoption);

    var emailoption = $("#emailoption").val();
    emailoption = emailoption.replace(/\r/g, '');
    formData.append("emailoption", emailoption);

    var phoneoption = $("#phoneoption").val();
    phoneoption = phoneoption.replace(/\r/g, '');
    formData.append("phoneoption", phoneoption);

    var countryoption = $("#countryoption").val();
    countryoption = countryoption.replace(/\r/g, '');
    formData.append("countryoption", countryoption);

    var cityoption = $("#cityoption").val();
    cityoption = cityoption.replace(/\r/g, '');
    formData.append("cityoption", cityoption);

    var PostalCodeoption = $("#PostalCodeoption").val();
    PostalCodeoption = PostalCodeoption.replace(/\r/g, '');
    formData.append("PostalCodeoption", PostalCodeoption);

    var Addressoption = $("#Addressoption").val();
    Addressoption = Addressoption.replace(/\r/g, '');
    formData.append("Addressoption", Addressoption);



    var csvFile = document.getElementById("patientfileupload").files[0];
    formData.append("csvFile", csvFile);

    console.log(firstnameoption);

  
    //validaton start here
  
    if (firstnameoption == "") {
      $("#firstnameoption").focus();
      $.alert({
        title: "Alert!",
        content: "Please select the firstname destination",
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

    if (lastnameoption == "") {
        $("#lastnameoption").focus();
        $.alert({
          title: "Alert!",
          content: "Please select the lastname destination",
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

      if (emailoption == "") {
        $("#emailoption").focus();
        $.alert({
          title: "Alert!",
          content: "Please select the email destination",
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
      url: "ajax/patient-bulk-upload.php",
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


//patient uploaded option
  $("body").on("click", "#patientfileupload", function () {
    $("#patientfileupload").change(function (event) {
        var csvFile = document.getElementById("patientfileupload").files[0];
        var fileReader = new FileReader();
        fileReader.onload = function (e) {
            var contents = e.target.result;
            var lines = contents.split('\n');
            var headerLine = lines[0];
            var headerFields = headerLine.split(',');
            //firstname
            var firstname = $('<select class="form-control" id="firstnameoption"><option value="" readonly>--select field---</option></select>');
            for (var i = 0; i < headerFields.length; i++) {
                var option = $('<option></option>').text(headerFields[i]).val(headerFields[i]);
                firstname.append(option);
            }
            $('#firstname').empty().append(firstname);

            //lastname
            var lastname = $('<select class="form-control"  id="lastnameoption"><option value="" readonly>--select field---</option></select>');
            for (var i = 0; i < headerFields.length; i++) {
                var option = $('<option></option>').text(headerFields[i]).val(headerFields[i]);
                lastname.append(option);
            }
            $('#lastname').empty().append(lastname);

            //Email
            var email = $('<select class="form-control" id="emailoption"><option value="" readonly>--select field---</option></select>');
            for (var i = 0; i < headerFields.length; i++) {
                var option = $('<option></option>').text(headerFields[i]).val(headerFields[i]);
                email.append(option);
            }
            $('#email').empty().append(email);

  

            //phone
            var phone = $('<select class="form-control"  id="phoneoption"><option value="" readonly>--select field---</option></select>');
            for (var i = 0; i < headerFields.length; i++) {
                var option = $('<option></option>').text(headerFields[i]).val(headerFields[i]);
                phone.append(option);
            }
            $('#phone').empty().append(phone);

            //country
            var country = $('<select class="form-control" id="countryoption"><option value="" readonly>--select field---</option></select>');
            for (var i = 0; i < headerFields.length; i++) {
                var option = $('<option></option>').text(headerFields[i]).val(headerFields[i]);
                country.append(option);
            }
            $('#country').empty().append(country);

            //city
            var city = $('<select class="form-control" id="cityoption"><option value="" readonly>--select field---</option></select>');
            for (var i = 0; i < headerFields.length; i++) {
                var option = $('<option></option>').text(headerFields[i]).val(headerFields[i]);
                city.append(option);
            }
            $('#city').empty().append(city);

            //Postal Code
            var PostalCode = $('<select class="form-control"  id="PostalCodeoption"><option value="" readonly>--select field---</option></select>');
            for (var i = 0; i < headerFields.length; i++) {
                var option = $('<option></option>').text(headerFields[i]).val(headerFields[i]);
                PostalCode.append(option);
            }
            $('#PostalCode').empty().append(PostalCode);

            //Address
            var Address = $('<select class="form-control" id="Addressoption"><option value="" readonly>--select field---</option></select>');
            for (var i = 0; i < headerFields.length; i++) {
                var option = $('<option></option>').text(headerFields[i]).val(headerFields[i]);
                Address.append(option);
            }
            $('#Address').empty().append(Address);

            console.log(headerFields);
        };
        fileReader.readAsText(csvFile);

        $('#showpatientfile').show();
    });
});