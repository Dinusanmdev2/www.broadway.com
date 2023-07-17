<?php
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

ob_start();
session_start();

$cashClear = date('s');

require_once 'vendor/autoload.php';
require_once 'include/functions.php';

date_default_timezone_set('Asia/Singapore'); //Set time zone

$allowedIps = ['127.0.0.1'];

if (in_array($_SERVER['REMOTE_ADDR'], $allowedIps) && isset($_GET['debug'])) {
    error_reporting(E_ALL);
    ini_set('display_errors', '1');
}


// //Globle Variables
// define('SMTP_SERVER', 'smtp.gmail.com');
// define('SMTP_USERNAME', 'priyanfbs01@gmail.com');
// define('SMTP_PASSWORD', 'uhaimvgabuinjqyj');
// define('SMTP_PORT', '587');
// //Globle Variables


//define('SMTP_SERVER', 'email-smtp.ap-southeast-1.amazonaws.com');
//define('SMTP_USERNAME', 'AKIAQFAC752JN3HYN2DB');
//define('SMTP_PASSWORD', 'BKSFtYyDNxwrKaAKp9BkIoeK2uDh9p7qi5ZtlMKYBAeY');
//define('SMTP_PORT', '2587');
?>

