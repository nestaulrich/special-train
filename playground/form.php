<?php

        $from;$email;$comment;$captcha;
        if(isset($_POST['from'])){
          $from=$_POST['from'];
        if(isset($_POST['email'])){
          $email=$_POST['email'];
        }if(isset($_POST['comment'])){
          $comment=$_POST['comment'];
        }if(isset($_POST['g-recaptcha-response'])){
          $captcha=$_POST['g-recaptcha-response'];
	  }
        if(!$captcha){
          echo '<h2>Please check the the captcha form.</h2>';
          exit;
        }
	$secretKey = "6LeR7JcUAAAAAM2UR0qbJMSntDZNPHNXSZKppzEE";
	$ip = $_SERVER['REMOTE_ADDR'];

	// post request to server
	$url =  'https://www.google.com/recaptcha/api/siteverify?secret=' . urlencode($secretKey) .  '&response=' . urlencode($captcha);
	$response = file_get_contents($url);
	$responseKeys = json_decode($response,true);
	if($responseKeys["success"]) {
    echo "Thank You!" . " -" . "<a href='index.html' style='text-decoration:none;color:#ff0099;'> Return Home</a>";
    $formcontent=" From: $name \n Email: $email \n Message: $message";
        $recipient = "greg.ulrich@me.com";
        $subject = "Contact Form";
        $mailheader = "From: $email \r\n";
        mail($recipient, $subject, $formcontent, $mailheader) or die("Error!");
        
	} else {
		echo '<h2>You are spammer ! Get the @$%K out</h2>';
        }




        
?>
