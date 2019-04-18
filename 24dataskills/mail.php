<?php
$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];
$zip = $_POST['zip'];
$phone = $_POST['phone'];
$email = $_POST['email'];

$formcontent=" From: $firstname $lastname \n Zipcode: $zip \n Phone: $phone \n Email: $email";
$recipient = "greg.ulrich@me.com";
$subject = "Contact Form";
$mailheader = "From: $email \r\n";
mail($recipient, $subject, $formcontent, $mailheader) or die("Error!");
echo "Thank You!" . " -" . "<a href='index.html' style='text-decoration:none;color:#ff0099;'> Return Home</a>";
?>