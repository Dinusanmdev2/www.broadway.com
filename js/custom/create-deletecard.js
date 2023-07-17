
    let keyn = 0;
    let keyv = 0;


function createInputField() {

    const card = document.createElement('div');
    card.className = "card  card-raised shadow-10 mt-5 mt-xl-10 mb-5 ";
    card.id = "cardid";

    const brack = document.createElement("br");

    const body = document.createElement('div');
    body.className = "card-body p-4";

    const deletebtn = document.createElement('div');
    deletebtn.className = "d-grid gap-0 d-md-flex justify-content-md-end";

    const deletebtnclick = document.createElement('button');
    deletebtnclick.className = "btn btn-danger me-ms-2";
    deletebtnclick.type = "button";
    deletebtnclick.addEventListener("click", () => deleteinput());

    const deleteicon = document.createElement('i');
    deleteicon.className = "bi bi-trash";
    deleteicon.style = "font-size:18px";


    const createrow = document.createElement('div');
    createrow.className = "row";

    const coll = document.createElement('div');
    coll.className = "col order-last";

    const keytext = document.createElement('h4');
    keytext.textContent = "Key name";

    const keyvaluetext = document.createElement('h4');
    keyvaluetext.textContent = "value";
    

    const newcoll = document.createElement('div');
    newcoll.className = "col order-last";

    const keytextinput = document.createElement("input");
    keytextinput.className = "form-control";
    keytextinput.id = `keyname${keyn}`;
    keytextinput.type = "text";
    keytextinput.placeholder = "name";
    keytextinput.autocomplete = "off";

    const keyvaluearea = document.createElement("textarea");
    keyvaluearea.className = "form-control";
    keyvaluearea.id = `keyvalue${keyv}`;
    keyvaluearea.type = "text";
    keyvaluearea.placeholder = "value";
    keyvaluearea.style = "height: 150px";

    body.appendChild(deletebtn);
    deletebtn.appendChild(deletebtnclick);
    deletebtnclick.appendChild(deleteicon);
    deletebtnclick.appendChild(brack);
    body.appendChild(createrow);
    createrow.appendChild(coll);
    coll.appendChild(keytext);
    createrow.appendChild(newcoll);
    newcoll.appendChild(keytextinput);
    newcoll.appendChild(brack);
    body.appendChild(createrow);
    createrow.appendChild(coll);
    coll.appendChild(keyvaluetext);
    createrow.appendChild(newcoll);
    newcoll.appendChild(keyvaluearea);
   
    card.appendChild(body);

    // Add the input field to the container
    const container = document.getElementById("new-card");
    container.appendChild(card);

    var ex = `keyvalue${keyv}`;
    console.log(ex); 
   
   

   keyn++;
   keyv++;
    
  }
 


  function deleteinput() {
     const carda = document.getElementById('cardid');
      carda.remove();
    }


//save data in database 

    $("body").on("click", "#addsystemconf", function () {
        var formData = new FormData();
    


         //CSRF Protection
  var CSRF_TOKEN = $("#CSRF_TOKEN").val();
  formData.append("CSRF_TOKEN", CSRF_TOKEN);
  //CSRF Protection
    
        var keycategory = $("#keycategory").val();
        formData.append("keycategory", keycategory);
        value
        var keyname = $("#keyname").val();
        formData.append("keyname", keyname);

        var value = $("#value").val();
        formData.append("value", value);

        console.log(keycategory);
        console.log(keyname);
        console.log(value);

        //validation

        if (keycategory == "") {
            $("#keycategory").focus();
            $.alert({
                title: "Alert!",
                content: "Please enter the keycategory",
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


        if (keyname == "") {
            $("#keyname").focus();
            $.alert({
                title: "Alert!",
                content: "Please enter the keyname",
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



        if (value == "") {
            $("#value").focus();
            $.alert({
                title: "Alert!",
                content: "Please enter the value",
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

        //ajax system config
        $.ajax({
            url: "ajax/system-conf.php",
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
                    content: "Create <strong>Successfully!</strong>.",
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