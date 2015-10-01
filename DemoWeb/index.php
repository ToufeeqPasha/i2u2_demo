<!--
Author: W3layouts
Author URL: http://w3layouts.com
License: Creative Commons Attribution 3.0 Unported
License URL: http://creativecommons.org/licenses/by/3.0/
-->
<!DOCTYPE html>
<html>
<head>
		<meta charset="utf-8">
		<link href="css/style.css" rel='stylesheet' type='text/css' />
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } </script>
		<!--webfonts-->
		<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800' rel='stylesheet' type='text.css'/>
		<!--//webfonts-->
		<title>Registration</title>
</head>

<body> 
	
	<div class="main">	
		<form action="sign_in.php" id ="myForm" name="Registration" method="post">
    		<h1> <lable> I2u2 TeleControll Register </lable> </h1>
  			<div class="inset">
				<p>
				    <label>NAME</label>
				    <input type="text" name="name" placeholder=""  required/>
  				</p>
	  			<p>
	    		 <label>EMAIL ADDRESS</label>
   	 			<input type="text" name ="email" placeholder="" required/>
				</p>
  				<p>
				    <label>COUNTRY</label>
				    <input type="text" name= "country" placeholder="" required/>
  				</p>
				  
 			 </div>
 	 
			  <p class="p-container">
			   
			    <input type="submit" value="Submit" id="submit" onclick="resetFunction()">
			  </p>
		</form>
	</div>  
		
</body>
</html>