<?php

//Export data from array
function dataValue($data, $column)
{
    if (isset($data[$column])) {
        return $data[$column];
    } else {
        return '';
    }
}
//Export data from array

//Emailing Function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

function sendEmail($mailBody, $mailSubject, $mailTo)
{
    //Sent Mail
    $mail = new PHPMailer(true);
    try {
        //$mail->SMTPDebug = SMTP::DEBUG_SERVER;
        $mail->isSMTP();
        $mail->Host = SMTP_SERVER;
        $mail->SMTPAuth = true;
        $mail->Username = SMTP_USERNAME;
        $mail->Password = SMTP_PASSWORD;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = SMTP_PORT;

        $mail->setFrom(SMTP_USERNAME, 'MedicalPro');
        $mail->addAddress($mailTo); // Add a recipient

        $mail->isHTML(true);
        $mail->Subject = $mailSubject;
        $mail->Body = $mailBody;

        $mail->send();
        return "pass";
    } catch (Exception $e) {
        return $e;
    }
    //Sent Mail
}
//Emailing Function

//Random Code
function randomCode($lenth)
{
    $alphabet = 'ABCDEFGHIJKLMNOPQURSTUVWXYZabcdefghijklmnopqurstuvwxyz';
    $pass = [];
    $alphaLength = strlen($alphabet) - 1;
    for ($i = 0; $i < $lenth; $i++) {
        $n = rand(0, $alphaLength);
        $pass[] = $alphabet[$n];
    }
    return implode($pass);
}

function otprandomCode($lenth)
{
    $alphabet = '1234567890';
    $pass = [];
    $alphaLength = strlen($alphabet) - 1;
    for ($i = 0; $i < $lenth; $i++) {
        $n = rand(0, $alphaLength);
        $pass[] = $alphabet[$n];
    }
    return implode($pass);
}

function numberrandomCode($lenth)
{
    $alphabet = '1234567890';
    $pass = [];
    $alphaLength = strlen($alphabet) - 1;
    for ($i = 0; $i < $lenth; $i++) {
        $n = rand(0, $alphaLength);
        $pass[] = $alphabet[$n];
    }
    return implode($pass);
}
//Random Code

// Authorization 

function authorization($userType, $userId, $pageName){

    $superAdminPages = ['dashboard', 'superadmin-settings', 'manage-clinic', 'system-confic', 'email-template','usermanage-settings', 'blogger-tools', 'directories', 'manage-media', 'create-blogger', 
                        'create-location', 'edit-location', 'manage-doctors', 'edit-doctor', 'permission-module', 'permisson-manage', 'email-template-edit', 'manage-category', 'manage-association',
                        'category-edit', 'association-edit', 'add-country-city', 'edit-country-city', 'blogger-edit','banner-change','bulk-upload','doctor-bulk-upload','patient-bulk-upload','add-template', 
                        'manage-user', 'create-manage-user', 'create-association', 'create-chapter', 'create-association-user', 'chapter-edit-association'];
    $staffAdminPages = ['dashboard', 'directories', 'permisson-manage', 'manage-doctors', 'edit-doctor'];
    $associateAdminPages = ['dashboard', 'blogger-tools', 'directories', 'permisson-manage', 'manage-doctors', 'edit-doctor', 'create-blogger'];

    if($userType == "superAdmin"){
        if(in_array($pageName, $superAdminPages)){
            return true;
        }else{
            return false;
        }
    }else if ($userType == "staffAdmin"){
        if (in_array($pageName, $staffAdminPages)) {
            return true;
        } else {
            return false;
        }
    }else if ($userType == "associateAdmin") {
        if (in_array($pageName, $associateAdminPages)) {
            return true;
        } else {
            return false;
        }
    }else {
        return false;
    }
}