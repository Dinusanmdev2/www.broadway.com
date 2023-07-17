<?php
require_once 'config.php';

use Aws\DynamoDb\Exception\DynamoDbException;

//Geting Data
$id = filter_var($_GET['id'], FILTER_DEFAULT);
$key = filter_var($_GET['key'], FILTER_DEFAULT);
//Geting Data

//Data Retrive
$userInfo = [
    'TableName' => 'medpro-users',
    'Key' => [
        'id' => ['S' => $id]
    ]
];
//Data Retrive

//Get Doctor Info
try {
    $result = $dynamoDb->getItem([
        'TableName' => 'medpro-users',
        'Key' => [
            'id' => ['S' => $id]
        ]
    ]);
    $userRetrieve = $result['Item'];
} catch (DynamoDbException $e) {
    echo $e->getMessage();
    $userRetrieve = array();
}
//Get Doctor Info

$emailverified = $userRetrieve['emailverified']['S'];
$email = $userRetrieve['email']['S'];
$firstName = $userRetrieve['firstName']['S'];
$lastName = $userRetrieve['lastName']['S'];
$fullName = $firstName . " " . $lastName;
$userType = $userRetrieve['userType']['S'];

if ($emailverified == '1') {
    $status = 'alreadyDone';
} elseif ($emailverified == $key) {
    $updateExpression = 'SET emailverified = :val';
    $expressionAttributeValues = [
        ':val' => ['S' => '1']
    ];
    $putUserInfo = [
        'TableName' => 'medpro-users',
        'Key' => [
            'id' => ['S' => $id],
        ],
        'UpdateExpression' => $updateExpression,
        'ExpressionAttributeValues' => $expressionAttributeValues,
    ];
    $putResult = $dynamoDb->updateItem($putUserInfo);

    $status = 'success';

    activatedEmail($email, $fullName, $userType);
} else {
    $status = 'codeNotMatch';
}


function activatedEmail($email, $fullName, $userType)
{
    $currentUrl = "https://" . $_SERVER['HTTP_HOST'];

    $emailBody = "<!DOCTYPE html>
        <html>
        <head>
            <meta charset='UTF-8'>
            <title>Welcome to MedicalPro!</title>
            <style>
            /* CSS styles for email body */
            body {
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.5;
            }
            h1 {
                font-size: 24px;
                margin-top: 0;
            }
            p {
                margin-bottom: 20px;
            }
            .button {
                display: inline-block;
                background-color: #007bff;
                color: #fff !important;
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                font-size: 16px;
                cursor: pointer;
                text-decoration: none;
            }
            </style>
        </head>
        <body>";
    if ($userType == 'Doctor') {
        $emailBody .= "<p>Dear $fullName,</p>
            <p>Thank you for creating an account with Medical Pro. We are confident that our platform will be an asset to digitalizing your medical activities and records.</p>
            <p>As a MedicalPro subscriber, you now have access to all of our features and functionalities of the MedicalPro Doctor Account Dashboard.</p>
            <ul>
            <li>You can browse the list of patients that has registered with you.</li>
            <li>You can schedule and manage your appointment in MedicalPro Dashboard.</li>
            <li>You can have analytic and statistic data of your clinic performance.</li>
            <li>You can upload relevant Health articles for your patients. </li>
            </ul>
            <p>Our user-friendly interface and intuitive design make it easy for you to get started and begin using our MedicalPro right away.</p>
            <p>We take pride in our customer service and support. If you have any questions or concerns, don't hesitate to reach out to our customer support portal in your dashboard.</p>
            <p>Our team is happy to provide assistance and ensure that you have a smooth and enjoyable experience using our MedicalPro.</p>
            <p>We are excited to have you in the MedicalPro community and look forward to helping you achieve your health goals.</p>
            
            <a class='button' href='$currentUrl' target='_blank'>LOGIN TO YOUR ACCOUNT HERE</a>
            <br>

            <p>Best regards,</p>
            <p>
            <strong>Hershey Morgan</strong>
            <br>
            MedicalPro Asia/Founder
            <br>
            <a href='https://medicalproasia.com/' target='_blank'>www.medicalproasia.com</a>
            </p>";
    } else {
        $emailBody .= "<p>Dear $fullName,</p>
            <p>Thank you for creating an account with Medical Pro. We are confident that our platform will be an asset to digitalizing your medical activities and records.</p>
            <p>As a MedicalPro subscriber, you now have access to all of our features and functionalities of the MedicalPro Patient Account Dashboard.</p>
            <ul>
            <li>You can browse the list of doctors and clinics based on location and specialization.</li>
            <li>You can schedule and manage your appointment in MedicalPro Dashboard.</li>
            <li>You will have access to documents uploaded by your physicians such as prescriptions, medical reports, medical certificates, laboratory requests, and more.</li>
            <li>You can track all your health activities on the MedicalPro platform.</li>
            <li>You can save the doctors and clinics that you frequently engage in.</li>
            <li>You can get notifications on your next check-up schedule and other relevant information from your doctors and clinics.</li>
            <li>You can access curated relevant Health resources.</li>
            </ul>
            <p>Our user-friendly interface and intuitive design make it easy for you to get started and begin using our MedicalPro right away.</p>
            <p>We take pride in our customer service and support. If you have any questions or concerns, don't hesitate to reach out to our customer support portal in your dashboard.</p>
            <p>Our team is happy to provide assistance and ensure that you have a smooth and enjoyable experience using our MedicalPro.</p>
            <p>We are excited to have you in the MedicalPro community and look forward to helping you achieve your health goals. </p>
            
            <a class='button' href='$currentUrl' target='_blank'>LOGIN TO YOUR ACCOUNT HERE</a>
            <br>

            <p>Best regards,</p>
            <p>
            <strong>Hershey Morgan</strong>
            <br>
            MedicalPro Asia/Founder
            <br>
            <a href='https://medicalproasia.com/' target='_blank'>www.medicalproasia.com</a>
            </p>";
    }

    $emailBody .= "</body>
        </html>
        ";
    sendEmail($emailBody, 'Welcome to Medical Pro!', $email);
}
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="favicon.ico">
    <title>MedicalPro | Activation</title>

    <?php
    require_once 'common-header.php';
    ?>

</head>

<body id="gbsfd-body-wrap" class="nav-fixed bg-light page-5 gbsfd-bg-main gbsfd-dashboard-wrap gbsfd-bg-main gbsfd-have-bg gbsfd_dashboard">
    <!-- Layout wrapper-->
    <div id="layoutAuthentication">
        <!-- Layout content-->
        <div id="layoutAuthentication_content">
            <main>
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-12">
                            <div class="card card-raised shadow-10 mt-5 mt-xl-10 mb-4">
                                <div class="row g-0">
                                    <div class="col-xl-12">
                                        <div class="card-body p-5" id="divLoginFormCard">

                                            <!--Logo-->
                                            <div class="text-center">
                                                <img class="mb-3 login-logo" src="/upload/system/logo.png" alt="System Logo" />
                                            </div>
                                            <!--Logo-->



                                            <div class="text-center">
                                                <?php
                                                if ($status == 'success') {
                                                    echo '<h4 class="text-theme">Congratulations! Your account has been successfully activated.</h4> <br>';
                                                    echo '<h5 class="text-theme">You can now log in and start using MedicalPro. If you have any questions or concerns, please feel free to contact our support team. Thank you for choosing MedicalPro!</h4><br>';
                                                    echo "<a href='/login.php' class='btn btn-primary btn-theme'>Login</a>";
                                                } elseif ($status == 'alreadyDone') {
                                                    echo '<h4 class="text-theme">We`re sorry, but it appears that your account has already been activated</h4> <br>';
                                                    echo '<h5 class="text-theme">You can log in to access MedicalPro. If you have forgotten your password, please use the "Forgot Password" feature to reset it. If you have any questions or concerns, please feel free to contact our support team. Thank you for choosing MedicalPro!</h4><br>';
                                                    echo "<a href='/login.php' class='btn btn-primary btn-theme'>Login</a>";
                                                } else {
                                                    echo '<h4 class="text-danger">We`re sorry, but there seems to be an error with the activation process for your account.</h4> <br>';
                                                    echo '<h5 class="text-danger">It looks like there may be some missing or incorrect information. Please double-check the activation key you received and try again. If the issue persists, please contact our support team for assistance. We apologize for any inconvenience this may have caused. Thank you for choosing MedicalPro!</h4><br>';
                                                }
                                                ?>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
        <!-- Layout content-->

        <!-- Layout footer-->
        <div id="layoutAuthentication_footer" style="z-index:9;">
            <footer class="p-4">
                <div class="d-flex flex-column flex-sm-row align-items-center justify-content-between small">
                    <div class="me-sm-3 mb-2 mb-sm-0">
                        <div class="fw-500 text-white">MedicalPro 2023 | Genesis Logistics Marketing &amp; Technologies Pte Ltd</div>
                    </div>
                    <div class="ms-sm-3">
                        <a class="fw-500 text-decoration-none link-white" href="https://medicalproasia.com/privacy-policy/">Privacy Policy</a>
                        <a class="fw-500 text-decoration-none link-white mx-4" href="https://medicalproasia.com/terms-of-use/">Terms of use</a>
                    </div>
                </div>
            </footer>
        </div>
        <!-- Layout footer-->

    </div>
</body>

<?php
require_once 'common-footer.php';
?>

</html>