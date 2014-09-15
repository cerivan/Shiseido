

    // Wait for device API libraries to load
    //
    document.addEventListener("deviceready",onDeviceReady,false);

    // device APIs are available
    //
    

	function onDeviceReady() {

            // Retrieve image file location from specified source
            navigator.camera.getPicture(uploadPhoto,
                                        function(message) { alert('get picture failed'); },
                                        { quality: 50, 
                                        destinationType: navigator.camera.DestinationType.FILE_URI,
                                        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY }
                                        );

        }

        function uploadPhoto(imageURI) {
            var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";

            var params = new Object();
            params.value1 = "test";
            params.value2 = "param";

            options.params = params;

            var ft = new FileTransfer();
            ft.upload(imageURI, encodeURI("cerivanmutu2_shiseido:superdragon43@ftp-turbo.celeonet.fr"), win, fail, options);
        }

        function win(r) {
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
        }

        function fail(error) {
            alert("An error has occurred: Code = " = error.code);
        }

  


  /*   </script>
  </head>
  <body>
    <button onclick="capturePhoto();">Capture Photo</button> <br>
    <button onclick="capturePhotoEdit();">Capture Editable Photo</button> <br>
    <button onclick="getPhoto(pictureSource.PHOTOLIBRARY);">From Photo Library</button><br>
    <button onclick="getPhoto(pictureSource.SAVEDPHOTOALBUM);">From Photo Album</button><br>
    <img style="display:none;width:60px;height:60px;" id="smallImage" src="" />
    <img style="display:none;" id="largeImage" src="" />
  </body> */



//####################################################


//function postJson(action, obj, callback, needUserData) {
function postJson() {
		
				//jsonTosend = "data="+JSON.stringify(obj);
				jsonTosend = "data="+JSON.stringify(obj);
				//jsonTosend = JSON.stringify(obj);
				//alert(jsonTosend);
				//$("#debug").append(jsonTosend + "<br />");
				console.log("http://rb.cerivan.com/app/call/post.php?g=yes&"+jsonTosend);
    
				urlToSend = "http://rb.cerivan.com/app/call/post.php?"+Math.floor((Math.random()*1000)+1);
				console.log(urlToSend);
    
				$.ajax({
					type       : "POST",
					url        : urlToSend,
					data       : jsonTosend,
					dataType : "json",
					cache		: false,
					success    : function(response) {
						if (response.success == false) {
							$("#debug").append("Operation echoue ! : "+response.success + "<br />")
							jsonError(response);
							return false;
						}
						console.log(JSON.stringify(response));
						console.log('Works!');
						//alert("Good : "+JSON.stringify(response));
						$("#debug").append("Good : "+JSON.stringify(response) + "<br />");

						queueJSON.shift();
						//$("#debug").append(JSON.stringify(queueJSON) + "<br />");
						setStorageVal("queueJSON", JSON.stringify(queueJSON));
						
						//removeStorageVal("queueJSON");
						//setStorageVal("queueJSON", queueJSON);
						//alert(JSON.stringify(queueJSON));
						
						if (object.callback) {	        
			
							eval(object.callback+"(response)");
							// find object
							//var fn = window[fonction];
				 
							// is object a function?
							//if (typeof fn === "function") fn.apply(null, response);
						}
						
						if(remainingPosts > 0) {
							remainingPosts -= 1;
							postJson();
						}
						
						return response;
					},
					error      : function() {
						jsonError(false);
					}
				}); 
			
		}
	
