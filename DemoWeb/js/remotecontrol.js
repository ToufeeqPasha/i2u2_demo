document.addEventListener('DOMContentLoaded', function () {
	
	window.onload = maxWindow;
	
	function maxWindow() {
        window.moveTo(0, 0);


        if (document.all) {
            top.window.resizeTo(screen.availWidth, screen.availHeight);
        }

        else if (document.layers || document.getElementById) {
            if (top.window.outerHeight < screen.availHeight || top.window.outerWidth < screen.availWidth) {
                top.window.outerHeight = screen.availHeight;
                top.window.outerWidth = screen.availWidth;
            }
        }
    }
	
	document.onkeydown = keydownFunction;
	document.onkeyup = keyupFunction;
  // PeerJS server location
  var SERVER_IP = '192.168.0.99';
  var SERVER_PORT = 9000;
 
 // Compatibility shim
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

  // DOM elements manipulated as user interacts with the app
  var remoteVideo = document.querySelector('#remoteVideo');
 var localVideo = document.querySelector('#localVideo');
 var messageBox = document.querySelector('#messages');
  //var closeBtn = document.querySelector('#close');
  
   // ---------- Controls : --------------------       
  var fwdButton= document.querySelector('#fwdButton');
  var revButton= document.querySelector('#revButton');
  var leftButton= document.querySelector('#leftButton');
  var rightButton= document.querySelector('#rightButton');
  
  var ooperButton= document.querySelector('#tiltup');
  var neecheButton= document.querySelector('#tiltdown');
  var daayaButton= document.querySelector('#tiltleft');
  var baayaButton= document.querySelector('#tiltright');


  //----------------Design elements : ------------------
  var panel = document.querySelector('#leftpanel');
  var glasspanel = document.querySelector('#glasspanel');
  var pad1= document.querySelector('#pad1');
  var pad2= document.querySelector('#pad2');
  
  var localvid =document.querySelector("local-video");
  

 
  var glasspanelwidth=glasspanel.offsetWidth;
  //var padradius = (pad1.offsetWidth/2);
  //var pad2radius=(pad2.offsetWidth/2);
 var panelwidth = glasspanelwidth;

  var viewportwidth;
 var viewportheight;
  
 // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
  
 if (typeof window.innerWidth != 'undefined')
 {
      viewportwidth = window.innerWidth,
      viewportheight = window.innerHeight
 }



document.getElementById("leftpanel").style.width = glasspanelwidth+"px";
document.getElementById("leftpanel").style.height =viewportheight+70+"px";

//------------------------------------------------------------------------
document.getElementById("fwdButton").style.left =  0.5*panelwidth+"px";

document.getElementById("leftButton").style.left = 0.25*panelwidth+"px";
document.getElementById("leftButton").style.top = .125*viewportheight+"px";

document.getElementById("rightButton").style.left = 0.75*panelwidth+"px"
document.getElementById("rightButton").style.top  =.125*viewportheight+"px";

document.getElementById("revButton").style.left = 0.5*panelwidth+"px"
document.getElementById("revButton").style.top = 0.25*viewportheight+"px";

//-------------------------------------------------------------------------
document.getElementById("tiltup").style.left = panelwidth*0.5+"px";
document.getElementById("tiltup").style.top = 0.35*viewportheight+"px";

document.getElementById("tiltleft").style.left = 0.25*panelwidth+"px";
document.getElementById("tiltleft").style.top = 0.475*viewportheight+"px";

document.getElementById("tiltright").style.left = 0.75*panelwidth+"px";
document.getElementById("tiltright").style.top =  0.475*viewportheight+"px";

document.getElementById("tiltdown").style.left = 0.5*panelwidth+"px";
document.getElementById("tiltdown").style.top = 0.6*viewportheight +"px";
//--------------------------------------------------------------------------

document.getElementById("local-video").style.top =0.8*viewportheight+"px";
document.getElementById("local-video").style.left =0.25*panelwidth+"px";
  
  function mousedwn(e){

  if (e.target !== e.currentTarget) {

        var clickedItem = e.target.id;
       // alert("Hello " + clickedItem);            ----           use it to debug any clicks on specific id(s) *drops mics*
        if(e.target.id == "fwdButton")
          send('8');
          if(e.target.id == "revButton")
            send('5');
            if(e.target.id == "leftButton")
              send('4');
              if(e.target.id == "rightButton")
                send('6');
                if(e.target.id == "tiltup")
                  send('w');
                  if(e.target.id == "tiltdown")
                    send('s');
                    if(e.target.id == "tiltleft")
                      send('a');
                      if(e.target.id == "tiltright")
                        send('d');
    }
    e.stopPropagation();
};

  // PeerJS object, instantiated when this client connects with its
  // caller ID
  var peer = null;
  var dcon= null;
  
  // the local video stream captured with getUserMedia()
  var localStream = null;

  
  // DOM utilities
  var makePara = function (text) {
    var p = document.createElement('p');
    p.innerText = text;
    return p;
  };

  var addMessage = function (para) {
    if (messageBox.firstChild) {
      messageBox.insertBefore(para, messageBox.firstChild);
    }
    else {
      messageBox.appendChild(para);
    }
  };

  var logError = function (text) {
    var p = makePara('ERROR: ' + text);
    p.style.color = 'red';
    addMessage(p);
  };

  var logMessage = function (text) {
    addMessage(makePara(text));
  };
  
  // get the local video and audio stream and show preview in the
  // "LOCAL" video element
  // successCb: has the signature successCb(stream); receives
  // the local video stream as an argument
  var getLocalStream = function (successCb) {
    if (localStream && successCb) {
      successCb(localStream);
    }
    else {
      navigator.getUserMedia(
        {
          audio: true,
          video: true
        },

        function (stream) {
          localStream = stream;

          localVideo.src = window.URL.createObjectURL(stream);

          if (successCb) {
            successCb(stream);
          }
        },

        function (err) {
          
        }
      );
    }
  };  

  // set the "REMOTE" video element source
  var showRemoteStream = function (stream) {
    remoteVideo.src = window.URL.createObjectURL(stream);
  };

       // create connection to the ID server
     
	 /*peer = new Peer({host: SERVER_IP, port: SERVER_PORT}, {config: {'iceServers': [
    { url: 'stun:stun.l.google.com:19302' },
    { url: 'turn:homeo@turn.bistri.com:80', credential: 'homeo' }
  ]}});*/
		
		peer = new Peer({key:'xtl3h42kxgmygb9'}, {config: {'iceServers': [
    { url: 'stun:stun.l.google.com:19302' },
    { url: 'turn:homeo@turn.bistri.com:80', credential: 'homeo' },
	{ url: 'turn:numb.viagenie.ca', credential: 'muazkh', username: 'webrtc@live.com'}
 ]}}
  );
      // hack to get around the fact that if a server connection cannot
      // be established, the peer and its socket property both still have
      // open === true; instead, listen to the wrapped WebSocket
      // and show an error if its readyState becomes CLOSED
     

      // get local stream ready for incoming calls once the wrapped
      // WebSocket is open
      
       peer.on('open', getLocalStream); 
		
		
       
	
      // handle events representing incoming calls
      peer.on('call', answer);
	  
	  //Awaits for the connection
	peer.on('connection', dconnect);
	
	//handle disconnecting event
	peer.on('close', function() {
		alert('Control Disconnected!!');
	});
  
  // Handle a connection object.
	function dconnect(dcon) {
	
		dcon.on('open', function() {
        console.log("Connected with peer: i2u2");
		//alert("Connected with peer: i2u2");		
		});
		
		dcon.on('data', function(data) {			
		alert('Recvd:'+data);
		});
		
		dcon.on('close', function() {
         // alert(dcon.peer + ' has left the chat.');
		 //alert('I2u2 Remote control has been disconnected!' );
		  dcon.close();
		});
		
		dcon.on('error', function(){
			logError('Error in data connection');
		})
}

  // make an outgoing call
 
    if (peer) {     
           
    getLocalStream(function (stream) {
      var call = peer.call("i2u2", stream);
		
	
	
      call.on('stream', showRemoteStream);

      call.on('error', function (e) {
        
      });
    });	
	
	dcon=peer.connect("i2u2");
	
	dcon.on('open', function() {
        dconnect(dcon);		
		//logMessage('data channel created successfully');
		
      });  
		  dcon.on('error', function(){
		  
	  });
  }
 
   // answer an incoming call
  var answer = function (call) {
    if (!peer) {
        return;
    }

    if (!localStream) {
        return;
    }

    //call.on('stream', showRemoteStream);
	// Wait for stream on the call, then set peer video display
       call.on('stream', showRemoteStream);

    call.answer(localStream);
  };
  
  // Close a connection.
  var close = function() {
    dcon.close();	
	peer.destroy();
	peer.on('close', function() {
		
	});
  };
    
 function keyupFunction(){
	  if(dcon){
	  dcon.send('q');
	  }
  }
  
function keydownFunction(event){
	if(dcon){
		  
	  switch(event.keyCode){
		  case 37:dcon.send('4');						
					break;
				 //move left
		  case 39:dcon.send('6');
				 break;
				 //move right
		  case 38:dcon.send('8');
				 break;
				 //move forward
		  case 40:dcon.send('5');
				 break;
				 //move backward
		  case 87:dcon.send('w');
				 break;
				 //pan left
		  case 83:dcon.send('s');
				 break;
				 //pan right
		  case 65:dcon.send('a');
				 break;
				 //tilt forward
		   case 68:dcon.send('d');
				 break;
				 //tilt back
		  case 116:event.preventDefault();
				 break;
	  }
	}
	  
  }
  
 
  // wire up button events
 // closeBtn.addEventListener('click', close);  
 
  
});