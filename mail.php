<?php
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

$formcontent=" From: $name \n Email: $email \n Message: $message";
$recipient = "gregu@24data.com";
$subject = "Contact Form";
$mailheader = "From: $email \r\n";
mail($recipient, $subject, $formcontent, $mailheader) or die("Error!");
echo "Thank You!" . " -" . "<a href='mailer.html' style='text-decoration:none;color:#ff0099;'> Return Home</a>";
?>