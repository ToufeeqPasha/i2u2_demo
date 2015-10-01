<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no">
  <meta charset="utf-8">
  <!-- Google material design icons : -->
      <link href='https://fonts.googleapis.com/css?family=Raleway:400,600' rel='stylesheet' type='text/css'>
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
	<link href="css/fancy.css" rel="stylesheet" type="text/css">
  
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/peerjs/0.3.14/peer.js"></script>
  
   
    <script src="grandpa.js"></script>
  
    <script src="peer.js"></script>
   
   <!-- <script src="main.js"></script> -->
	
    <title>Remote Controll</title>

 <!--  <style>
   
form.msg textarea{
		padding:5px;
		width:100%;
		background-color: #eee;
		border:1px solid #ccc;
		
	} 
    </style>-->
  </head>

  <body>   
  
  <?php
	$url ="https://i2u2.localtunnel.me/DemoWeb/success.php";
	if ($_SERVER['HTTP_REFERER'] != $url) {
		header('Location: index.php');
		exit();
	}
	else{	
	echo"
	<script type=\"text/javascript\">
	var seconds = 180;
	function secondPassed() {
		var minutes = Math.round((seconds - 30)/60);
		var remainingSeconds = seconds % 60;
		if (remainingSeconds < 10) {
			remainingSeconds = '0' + remainingSeconds;  
		}
		document.getElementById('countdown').innerHTML = minutes + ':' + remainingSeconds;
		if (seconds == 0) {
			clearInterval(countdownTimer);
			document.getElementById('countdown').innerHTML = 'Time Up!!';
			window.location='update.php';				
			exit;
			
		} else {
			seconds--;
		}
	}
	 
	var countdownTimer = setInterval('secondPassed()', 1000);
	</script>
	";
	}
	?>
      <!-- <button id="connect">Start Connection</button> <input type="text" id="text" placeholder="Enter message"><button id="submit">Send</button> <button id="close">Close Connection</button>
	  <br><br>   -->
            
  <div class="col-lg-1">
  <div class="timer">
	<p>Time Left:  <span id="countdown"  style="color:red;font-weight:bold" ></span></p>
	</div>
  </div>
  
  <div class="col-lg-7">
       <!--  <div id="credentials">
      <p>
        Connect as:
        <input type="text" id="caller-id" size="15">
        <button id="pconnect" class ="btn" >Connect</button>
      </p>
      
    </div>

    <div id="dialler" data-active="false">
      <p>
        Make call to:
        <input type="select" id="recipient-id">
        </input>
        <button id="dial" class ="btn" >Call</button>
      </p>
    </div> -->
    
    <br><br>
      <video id="remote-video"  autoplay align="middle"> </video>
</div>
      
      <div id="panelcontainer" class="col-lg-4">
        
        <div id ="glasspanel" class="glass" >
        </div>

      <div id="leftpanel">
          
      <div id="topcontrols">
        <!-- <img id="pad1" src="res/surface.png"> -->
      <img id="fwdButton" class="navbutton" src="res\ic_expand_less_black_48dp.png" > 
      <img id="leftButton" class="navbutton" src="res\ic_chevron_left_black_48dp.png" ><img id="rightButton" class="navbutton" src="res\ic_chevron_right_black_48dp.png" >    
      <img id="revButton" class="navbutton" src="res\ic_expand_more_black_48dp.png" >
   </div>
<br><br><br><br><br>
   <div ="bottomcontrols">
     <img id="pad2" src="res/mid.png">
      <img id="tiltup" class="navbutton" src="res\ic_expand_less_black_48dp.png" > 
      <img id="tiltleft" class="navbutton" src="res\ic_chevron_left_black_48dp.png" ><img id="tiltright" class="navbutton" src="res\ic_chevron_right_black_48dp.png" >    
      <img id="tiltdown" class="navbutton" src="res\ic_expand_more_black_48dp.png" >
  </div>
      <br><br>
      <br><br>
      <div id="localvidcontainer">
      <video id="local-video" autoplay align="middle"></video>
    </div>
    
  
   

    <div id="messages">
	<!--<div class="log" style="color:#FF7500;text-shadow:none;padding:15px;background:#eee"><strong>Connection status :</strong><br></div>-->
    </div>
</div>
	
	
	
  </body>
</html>