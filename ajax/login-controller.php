<?php
require_once '../config.php';
// require __DIR__ . '../vendor/autoload.php';

$statusCode = 0;
$statusMsg = '';

// use Aws\DynamoDb\Exception\DynamoDbException;

// CSRF Protection
$token = filter_var($_POST['CSRF_TOKEN'], FILTER_DEFAULT);
if (!$token || $token !== $_SESSION['CSRF_TOKEN']) {
    echo '<p class="error">Error: invalid form submission</p>';
    header($_SERVER['SERVER_PROTOCOL'] . ' 405 Method Not Allowed');
    exit;
}
// CSRF Protection

//Geting Data
$userEmail = filter_var($_POST['txtLoginEmail'], FILTER_DEFAULT);
$password = filter_var($_POST['txtLoginPassword'], FILTER_DEFAULT);
//Geting Data

use Kreait\Firebase\Factory;
use Kreait\Firebase\Auth;
use Kreait\Firebase\Exception\Auth\InvalidPassword;
use Kreait\Firebase\Exception\Auth\UserNotFound;
use \Kreait\Firebase\Exception\AuthException;

$serviceAccount ='../json/broadwayapp.json';




$factory = (new Factory())->withServiceAccount('../json/broadwayapp.json');
$auth = $factory->createAuth();



try {
    // Sign in with email and password
    $signInResult = $auth->signInWithEmailAndPassword($userEmail, $password);

    // Get the user's ID token
    $idToken = $signInResult->idToken();


    $_SESSION['SESS_USER_ID'] = $idToken;
    $_SESSION['SESS_USER_EMAIL'] = $userEmail;
 
     $statusMsg = 'lgin';
    // exit();
} catch (\Kreait\Firebase\Exception\Auth\InvalidPassword $e) {
    // Invalid password
    echo 'Invalid password';
} catch (\Kreait\Firebase\Exception\Auth\UserNotFound $e) {
    // User not found
    echo 'User not found';
} catch (\Exception $e) {
    // Other error occurred
    $statusMsg = $e->getMessage();
    // echo 'An error occurred: ' . $e->getMessage();
}



$responce = new stdClass();
$responce->code = $statusCode;
$responce->message = $statusMsg;
print_r(json_encode($responce, true));
