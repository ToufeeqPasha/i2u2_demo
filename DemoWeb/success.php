<!DOCTYPE html>
<!--[if lt IE 8 ]><html class="no-js ie ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]><html class="no-js ie ie8" lang="en"> <![endif]-->
<!--[if (gte IE 8)|!(IE)]><!--><html class="no-js" lang="en"> <!--<![endif]-->
<head>

   <!--- Basic Page Needs
   ================================================== -->
   <meta charset="utf-8">
	<title>Registration Successfull </title>
	<meta name="description" content="">
	<meta name="author" content="pasha">
	<meta http-equiv="refresh" content="60">

   <!-- Mobile Specific Metas
   ================================================== -->
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

	<!-- CSS
    ================================================== -->
   <link rel="stylesheet" href="css/default.css">
	<link rel="stylesheet" href="css/layout.css">
   <link rel="stylesheet" href="css/media-queries.css">   
   <script src="js/sweetalert.min.js"></script>
	<link rel="stylesheet" type="text/css" href="css/sweetalert.css">
  

   <!-- Script
   ================================================== -->
	

   <!-- Favicons
	================================================== -->
	<link rel="shortcut icon" href="favicon.png" >

</head>

<body>
	
      	<header class="row">	 

			<div id="logo" >
				<a href="#" >
                 <img src="images/mylogo.gif" alt="I2U2">                  
              </a>					
			</div>

		   

   	</header> <!-- Header End -->   	

   	<div  id="main" class="row">

	   	<div class="twelve columns">
	   			
	   		<h1>Registration Successfull!!</h1>
			
	   		<h4>Thank You!</h4> 			
   			</div>	
		<p id="p1">All our robots are currently controlling by others, Below button will be activated once our robot is free</p>
		<button type="button" id="startButton" onclick="startConnection()" disabled>Start Controlling</button>	
		
         </div>
   
	<?php
	
	$connection = mysqli_connect('localhost', 'root', '', 'i2u2');
		
	$queryService= "SELECT id, COUNT(service) FROM users WHERE service=0 GROUP BY id";
	$result= mysqli_query($connection, $queryService);
	
	$myCount = mysqli_num_rows($result);
	
	if($myCount>1)
		{
		$timeLeft=($myCount*3)-3;
		
		echo "<script type=\"text/javascript\">
				 var myButton1=document.querySelector('#startButton'); 
				 myButton1.disabled=true; 
				 document.getElementById('p1').innerHTML ='Our bots are busy, come after $timeLeft minutes !';            
			  </script>
			";
		 
		}
		else{
		echo"<script type=\"text/javascript\">
				 var myButton1=document.querySelector('#startButton'); 
				 myButton1.disabled=false;  
				 document.getElementById('p1').innerHTML ='Congratulations! you got 3 minutes to remotely control i2u2 robot. Click Start button to start remote controlling !'; 
		 </script>";
			
		}
	
	?>	

  

   <!-- Java Script
   ================================================== -->
   <script>
swal("Security Alert!", "Please click on load unsafe scripts in right side of address bar to enable video streaming");
    //alert("Please click on load unsafe scripts in right side of address bar to enable video streaming!");
   function startConnection(){
   //document.getElementById("p1").innerHTML = "New text!";
   window.location='remotecontrol.php';//this page is our connection page
   };
   </script>
   <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
   <script>window.jQuery || document.write('<script src="js/jquery-1.10.2.min.js"><\/script>')</script>
   <script type="text/javascript" src="js/jquery-migrate-1.2.1.min.js"></script>   
   <script src="js/jquery.placeholder.js"></script>   
   <script src="js/init.js"></script>
   
</body>

</html>