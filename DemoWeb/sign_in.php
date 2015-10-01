<?php

//include "connect.php";
$connection = mysqli_connect('localhost', 'root', '', 'i2u2');
$name= $_POST['name'];
$mail= $_POST['email'];
$country= $_POST['country'];
//$checkMail="SELECT email FROM users WHERE email=$mail";

if((isset($_POST['name']) && ($_POST['name']!="")) && 
(isset($_POST['email']) && ($_POST['email']!="")) && 
(isset($_POST['country']) && ($_POST['country']!=""))){
	if (filter_var($mail, FILTER_VALIDATE_EMAIL)) {
	//	$sql=mysqli_query($connection, $checkMail );
 //if(mysqli_num_rows($sql)>=1)
 // {
   // echo"email already exists";
  // }
 //else{
$q= "INSERT INTO users(name, email, country) VALUES('$name', '$mail', '$country')";
//$q="SHOW TABLES";

//$r=mysql_query($q);
$r=mysqli_query($connection, $q);

//echo "database updated";
if($r){
	echo "<script>
             //alert('Registration Successfull!, Once Bot is available we will send a link to your mail. Thank You'); 			
             window.location='success.php';
			 exit;
     </script>";
}else
{
	echo "<script>
             alert('Connection Error!'); 
             window.history.back();
     </script>";
 }
 //}
}else{
	echo "<script>
             alert('Please enter valid mail id!'); 
            window.history.back();
     </script>";
}
}
else{
	echo "<script>
             alert('Please Fill all fields'); 
             window.history.back();
     </script>";
}
 
?>