document.addEventListener('DOMContentLoaded', function () {
  // PeerJS server location
  var SERVER_IP = '192.168.0.106';
  var SERVER_PORT = 9000;

  // DOM elements manipulated as user interacts with the app
  var messageBox = document.querySelector('#messages');
  var callerIdEntry = document.querySelector('#caller-id');
  var pconnectBtn = document.querySelector('#pconnect');
  var recipientIdEntry = document.querySelector('#recipient-id');
  var dialBtn = document.querySelector('#dial');
  var remoteVideo = document.querySelector('#remote-video');
  var localVideo = document.querySelector('#local-video');
  var closeBtn = document.querySelector('#close');
  var connectBtn = document.querySelector('#connect');
  var sendBtn = document.querySelector('#submit');
  
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

 var sendData = 'nothing';
 var booldatachannel = 0;

  // the ID set for this client
  //var callerId = null;
 // var recipientId= null;

  // PeerJS object, instantiated when this client connects with its
  // caller ID
  var peer = null;
  var dcon = null;

  // the local video stream captured with getUserMedia()
  var localStream = null;



  function keyboardhandler (event){
    var key = event.keyCode;
    console.log(key);
    if(key==87){   //w
      send('w');
    }

    else if (key == 65 )//a
      send('a');
      else if (key == 83)//s
        send('s');
        else if (key ==68 )//d
          send('d');
          else if (key == 38)// up arrow
            send('8');
            else if (key == 40)//down
              send("5");
              else if (key == 37)//left
                send("4");
                else if (key == 39)//right
                  send("6");
                 else if(key == 72)
                    send('h');
  };

  function stopmoving(){
    send('q');
  };
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
      navigator.webkitGetUserMedia(
        {
          audio: true,
          video: true
        },

        function (stream) {
          localStream = stream;

          localVideo.src = window.URL.createObjectURL(stream);
          //dial();
          if (successCb) {
            successCb(stream);
          }
        },

        function (err) {
          logError('failed to access local camera');
          logError(err.message);
        }
      );
    }
  };
  

  // set the "REMOTE" video element source
  var showRemoteStream = function (stream) {
    remoteVideo.src = window.URL.createObjectURL(stream);
  };

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
  
  
  
  // (RX ) catch data meant for android :
  var androidData = function(data) {
		logMessage('Received:'+data);
		Android.showToast(data);
          connect();
		};
		
  // Handle a connection object.
	var dconnect =function (dcon) {
	
		dcon.on('open', function() {
        console.log("Connected with peer: "+recipientId);
			
		dcon.on('data', androidData);
		
		});
		
		dcon.on('close', function() {
          alert(dcon.peer + ' has left the chat.');
		  dcon.close();
		});
};
  

  
  
   
  
  // answer an incoming call
  var answer = function (call) {

    if (!peer) {
      logError('cannot answer a call without a connection');
      return;
    }

    if (!localStream) {
      logError('could not answer call as there is no localStream ready');
      return;
    }

    logMessage('incoming call answered');

    call.on('stream', showRemoteStream);

    call.answer(localStream);
    connect();
  };
  
  // Close a connection.
  var close = function() {
    dcon.close();
  };

  // Send a chat message to all active connections.
  send = function (sendData) {

        //console.log(sendData);	   
        dcon.send(sendData);

        
      };
    
  
  
  /* Goes through each active peer and calls FN on its connections.
  function eachActiveConnection(fn) {
    var actives = $('.active');
    var checkedIds = {};
    actives.each(function() {
      var peerId = $(this).attr('id');

      if (!checkedIds[peerId]) {
        var conns = peer.connections[peerId];
        for (var i = 0, ii = conns.length; i < ii; i += 1) {
          var conn = conns[i];
          fn(conn, $(this));
        }
      }

      checkedIds[peerId] = 1;
    });
  }*/
  
 
  // wire up button events
  // pconnectBtn.addEventListener('click',pconnect);
  // dialBtn.addEventListener('click',dial);

 
 
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
  //--------------Keyboard Events----------------------
  
  $(document).ready(function(){
   window.addEventListener("keydown", keyboardhandler, false);
    window.addEventListener("keyup",stopmoving,false);   
       
   //panel.addEventListener("click", mousedwn, false);

   $("#leftpanel").mousedown(mousedwn).mouseup(function() { send("q"); });       // mouse up event here <--------------

  
   

});


});