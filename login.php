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
    <title>Broadway | Login</title>

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
                        <div class="col-sm-5 col-md-6 col-lg-5">
                            <div class="card card-raised shadow-10 mt-5 mt-xl-10 mb-4">
                                <div class="row g-0">
                                    <div class="col-xl-12">
                                        <div class="card-body p-5" id="divLoginFormCard">

                                            <!--Logo-->
                                            <div class="text-center">
                                                <img class="mb-3 login-logo" src="/images/broadwaylogo.png" alt="System Logo" />
                                            </div>
                                            <!--Logo-->

                                            <!-- Login submission form-->
                                            <div id="gbsfd-form">
                                                <div class="mb-4 form-floating gbsfd-username">
                                                    <input class="form-control no-space" id="txtLoginEmail" type="text" placeholder="Email" autocomplete="off">
                                                    <label for="txtLoginEmail">Email</label>
                                                </div>
                                                <div class="mb-4 form-floating gbsfd-password">
                                                    <input class="form-control" id="txtLoginPassword" type="password" placeholder="Password" autocomplete="off">
                                                    <label for="txtLoginPassword">Password</label>
                                                    <i class="material-icons gbsfd-visibility passwordVisibility" data-visibility='0' data-target='#txtLoginPassword'>visibility_off</i>
                                                </div>
                                                <!-- <div class="mb-4">
                                                    <div class="form-check">
                                                        <input class="form-check-input" id="checkLoginRemeber" type="checkbox" value="1">
                                                        <label class="form-check-label" for="gbsfd-remmber-me">Remember password</label>
                                                    </div>
                                                </div> -->

                                                <div class="form-group d-flex align-items-center justify-content-center mt-4 mb-0">
                                                    <!-- <a class="small fw-500 text-decoration-none login-forgot" href="/forgot-password.php">Forgot Password?</a> -->
                                                    <button id="btnLogin" class="btn btn-primary">
                                                        Login
                                                    </button>
                                                </div>
                                            </div>
                                            <!-- Login submission form-->
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
        <!-- <div id="layoutAuthentication_footer" style="z-index:9;">
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
        </div> -->
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
<script src="js/custom/login.js?v=<?= $cashClear ?>"></script>
<!-- Custom JS -->

</html>