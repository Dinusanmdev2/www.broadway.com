<?php
require_once 'config.php';
// CSRF Protection
if (strtoupper($_SERVER['REQUEST_METHOD']) === 'GET') {
    $_SESSION['CSRF_TOKEN'] =  md5(uniqid(mt_rand(), true));
}
// CSRF Protection
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
    <title>MedicalPro | Forgot Password</title>

    <!-- Custom fonts for this template-->
    <link href="css/googleFonts.css" rel="stylesheet">
    <link href="source/fontawesome-free/css/all.min.css" rel="stylesheet">
    <link href="source/layout/assets/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
    <link href="source/layout/assets/boxicons/css/boxicons.min.css" rel="stylesheet">
    <link href="source/layout/assets/remixicon/remixicon.css" rel="stylesheet">
    <!-- Custom fonts for this template-->

    <!-- Bootsrap CSS -->
    <link href="source/layout/assets/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="source/layout/css/style.css" rel="stylesheet">
    <!-- Bootsrap CSS -->

    <!-- Login CSS -->
    <link href="source/login-theme/login-theme.min.css" rel="stylesheet">
    <link href="source/login-theme/login-theme.css" rel="stylesheet">
    <link href="source/login-theme/login-theme-icon.css" rel="stylesheet">
    <!-- Login CSS -->

    <!-- Confirm Js CSS -->
    <link href="source/confirm/confirm.min.css" rel="stylesheet">

    <!--Toastify-->
    <link href="source/toastify/toastify.css" rel="stylesheet">

    <!--WaitMe-->
    <link href="source/waitMe-31/waitMe.css" rel="stylesheet">

    <!--Custom CSS File Add-->
    <link href='css/custom.css?v=<?= $cashClear ?>' rel='stylesheet' />

</head>

<body id="gbsfd-body-wrap" class="nav-fixed bg-light page-5 gbsfd-bg-main gbsfd-dashboard-wrap gbsfd-bg-main gbsfd-have-bg gbsfd_dashboard">
    <!-- Layout wrapper-->
    <div id="layoutAuthentication">
        <!-- Layout content-->
        <div id="layoutAuthentication_content">
            <main>
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-sm-5">
                            <div class="card card-raised shadow-10 mt-5 mt-xl-10 mb-4">
                                <div class="row g-0">
                                    <div class="col-xl-12">
                                        <div class="card-body p-5">

                                            <!--Logo-->
                                            <div class="text-center">
                                                <img class="mb-3 register-logo" src="/upload/system/logo.png" alt="System Logo" />
                                            </div>
                                            <!--Logo-->

                                            <div id="gbsfd-form">

                                                <div id="partOne">
                                                    <div class="mb-4 form-floating gbsfd-username">
                                                        <input id="txtForgotEmail" type="email" class="form-control no-space" placeholder="Email Address" autocomplete="off">
                                                        <label for="txtForgotEmail">Email Address</label>
                                                    </div>
                                                    <div class="text-center">
                                                        <button id="btnResetPassword" class="btn btn-primary">
                                                            Reset password
                                                        </button>
                                                    </div>
                                                </div>

                                                <div id="partTwo" class="hidden">
                                                    <div class="alert alert-success bg-success text-light border-0 alert-dismissible fade show" id="otpSuccessSentAlert" role="alert">
                                                        OTP Sent Successfully
                                                    </div>
                                                    <p>
                                                        Please enter the OTP (One-Time Password) sent to your registered email address in the field below to complete your Password reset.
                                                    </p>
                                                    <div class="mb-4 form-floating gbsfd-username">
                                                        <input id="txtVerifyOtp" type="text" class="form-control no-space" placeholder="Enter OTP" autocomplete="off">
                                                        <label for="txtVerifyOtp">Enter OTP</label>
                                                    </div>
                                                    <div class="text-center">
                                                        <button id="btnVerifyOTP" class="btn btn-primary">
                                                            Verify OTP
                                                        </button>
                                                    </div>
                                                </div>

                                                <div id="partThree" class="hidden">
                                                    <div class="mb-4 form-floating gbsfd-password">
                                                        <input class="form-control" id="txtNewPassword" type="password" placeholder="Password" autocomplete="off">
                                                        <label for="txtNewPassword">New Password</label>
                                                        <small id="passwordHelpInline" class="text-muted"> (Must be at least 8 characters long)</small>
                                                        <i class="material-icons gbsfd-visibility passwordVisibility" data-visibility='0' data-target='#txtNewPassword'>visibility_off</i>
                                                    </div>

                                                    <div class="mb-4 form-floating gbsfd-password">
                                                        <input class="form-control" id="txtReNewPassword" type="password" placeholder="Password" autocomplete="off">
                                                        <label for="txtReNewPassword">Retype New Password</label>
                                                        <i class="material-icons gbsfd-visibility passwordVisibility" data-visibility='0' data-target='#txtReNewPassword'>visibility_off</i>
                                                    </div>

                                                    <div class="text-center">
                                                        <button id="btnUpdatePassword" class="btn btn-primary">
                                                            Update password
                                                        </button>
                                                    </div>
                                                </div>

                                                <div class="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                                                    <span>
                                                        Already have an account?
                                                        <a class="text-decoration-none login-here" href="/login.php">Login here </a>
                                                    </span>
                                                </div>
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

    <!-- CSRF Protection -->
    <input type="hidden" name="CSRF_TOKEN" id="CSRF_TOKEN" value="<?= isset($_SESSION['CSRF_TOKEN']) ? $_SESSION['CSRF_TOKEN'] : '' ?>">
    <!-- CSRF Protection -->
</body>

<!-- Main JS Files -->
<script src="source/layout/assets/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="source/jquery/jquery.min.js"></script>
<script src="source/jquery-easing/jquery.easing.min.js"></script>
<script src='js/moment.min.js'></script>
<script src="source/layout/js/main.js"></script>
<!-- Main JS Files -->

<!-- Confirm JS -->
<script src="source/confirm/confirm.min.js"></script>

<!--Toastify-->
<script src="source/toastify/toastify.js"></script>

<!--WaitMe-->
<script src="source/waitMe-31/waitMe.js"></script>

<!--Loader Js-->
<script src="source/loadingoverlay/loadingoverlay.min.js"></script>

<!-- Custom JS -->
<script src='js/custom/custom-functions.js?v=<?= $cashClear ?>'></script>
<script src="js/custom/forgot-password.js?v=<?= $cashClear ?>"></script>
<!-- Custom JS -->

</html>