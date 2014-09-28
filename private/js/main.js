	var pictureSource;   // picture source
    var destinationType; // sets the format of returned value

    // Wait for device API libraries to load
    //
    document.addEventListener("deviceready",onDeviceReady,false);

    // device APIs are available
    //
    function onDeviceReady() {
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    }
	function capturePhoto() {
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(uploadPhoto, onFail, { quality: 50,
        destinationType: destinationType.DATA_URL });
    }
	 function onFail(message) {
      alert('Failed because: ' + message);
    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoDataSuccess(imageData) {
      // Uncomment to view the base64-encoded image data
       //console.log(imageData);

      // Get image handle
      //
      var smallImage = document.getElementById('smallImage');
	  var bouton1 = document.getElementById('bouton1');
	  var message = document.getElementById('message');

      // Unhide image elements
      
		smallImage.style.display = 'block';		
		message.style.display = 'block';
      // Show the captured photo
      // The in-line CSS rules are used to resize the image
      //
      smallImage.src = "data:image/jpeg;base64," + imageData;	  
	  message.innerHTML = "Votre preuve d'achat a bien été envoyé <br> vous serez prévenez par SMS de sa prise en compte";
     	  
    }
	function getImage() {
            // Retrieve image file location from specified source
            navigator.camera.getPicture(uploadPhoto, function(message) {
			alert('get picture failed');
		},{
			quality: 50, 
			destinationType: navigator.camera.DestinationType.FILE_URI,
			sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
		}
            );
 
        }
 
        function uploadPhoto(imageData) {
        
            var options = new FileUploadOptions();
		options.headers = {
			Connection: "close"
			}
            var options = new FileUploadOptions();
            
            options.fileKey="file";
            options.fileName=imageData.substr(imageData.lastIndexOf('/')+1)+'.jpg';
            options.mimeType="image/jpeg";
 
            var params = new Object();
            
            params.value1 = "test";
            params.value2 = "param";
            options.params = params;
			options.chunkedMode = false;
            alert('transferring...');
     
     	    var url="http://ceri.es/app/post.php";
            var ft = new FileTransfer();
            ft.upload(imageData, url, win, fail, options);
			/* ft.upload(imageURI, encodeURI("http://archive.org/download/"), win, fail, options); */
        
        	
        	
        	
        	var message = document.getElementById('message');
        	message.style.display = 'block';
        	message.innerHTML = "Votre preuve d'achat a bien été envoyé <br> vous serez prévenez par SMS de sa prise en compte";
        }
 
        function win(r) {
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
            alert(r.response);
        }
 
        function fail(error) {
            alert("An error has occurred: Code = " + error.code);
        }
 
	
	 
	
  /*   



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
	
*/
