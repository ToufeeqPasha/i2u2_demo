<?php
	
	$connection = mysqli_connect('localhost', 'root', '', 'i2u2');
	$q="UPDATE users SET service=1 WHERE service=0 ORDER BY id ASC LIMIT 1";
	$r=mysqli_query($connection, $q);
	echo "<script>              
             window.location='sessioncomplete.php';
			exit;
     </script>";
?>