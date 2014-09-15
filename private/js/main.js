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

    // Called when a photo is successfully retrieved
    //
    function onPhotoDataSuccess(imageData) {
      // Uncomment to view the base64-encoded image data
      // console.log(imageData);

      // Get image handle
      //
      var smallImage = document.getElementById('smallImage');
	  var bouton1 = document.getElementsById('bouton1');

      // Unhide image elements
      //
      smallImage.style.display = 'block';
		bouton1.style.display = 'none';
      // Show the captured photo
      // The in-line CSS rules are used to resize the image
      //
      smallImage.src = "data:image/jpeg;base64," + imageData;
	  document.getElementsById('message').innerHTML("Votre preuve d'achat a bien été envoyer <br> vous serez prévener par SMS de sa prise en compte");
    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoURISuccess(imageURI) {
      // Uncomment to view the image file URI
      // console.log(imageURI);

      // Get image handle
      //
      var largeImage = document.getElementById('largeImage');

      // Unhide image elements
      //
      largeImage.style.display = 'block';

      // Show the captured photo
      // The in-line CSS rules are used to resize the image
      //
      largeImage.src = imageURI;
    }

    // A button will call this function
    //
    function capturePhoto() {
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
        destinationType: navigator.camera.DestinationType.DATA_URL });
    }

    // A button will call this function
    //
    function capturePhotoEdit() {
      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
      destinationType: navigator.camera.DestinationType.DATA_URL });
    }

    // A button will call this function
    //
    function getPhoto(source) {
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
        destinationType: navigator.camera.destinationType.FILE_URI,
        sourceType: source });
    }

    // Called if something bad happens.
    //
    function onFail(message) {
      alert('Failed because: ' + message);
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
	
