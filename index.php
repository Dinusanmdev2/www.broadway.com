<?php
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

require_once 'config.php';

if (!isset($_SESSION['SESS_USER_ID'])) {
    header('Location: logout.php');
}

// CSRF Protection
if (strtoupper($_SERVER['REQUEST_METHOD']) === 'GET') {
    $_SESSION['CSRF_TOKEN'] =  md5(uniqid(mt_rand(), true));
}
// CSRF Protection

$SESS_USER_ID = $_SESSION['SESS_USER_ID'];
$SESS_USER_EMAIL = $_SESSION['SESS_USER_EMAIL'];

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
    <title>Broadway</title>

    <!-- Custom fonts for this template-->
    <link href="css/googleFonts.css" rel="stylesheet" type="text/css">
    <link href="source/fontawesome-free/css/all.min.css" rel="stylesheet">
    <link href="source/layout/assets/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
    <link href="source/layout/assets/boxicons/css/boxicons.min.css" rel="stylesheet">
    <link href="https://cdn.datatables.net/1.13.4/css/dataTables.bootstrap5.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.2.0/css/bootstrap.min.css" rel="stylesheet">
    <link href="source/layout/assets/remixicon/remixicon.css" rel="stylesheet">
    <!-- Custom fonts for this template-->

    <!-- Bootsrap CSS -->
    <link href="source/layout/assets/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="source/layout/css/style.css" rel="stylesheet">
    <!-- Bootsrap CSS -->

    <!-- Confirm Js CSS -->
    <link href="source/confirm/confirm.min.css" rel="stylesheet">

    <!-- Selectize CSS -->
    <link href="source/selectize/css/selectize.bootstrap5.css" rel="stylesheet">

    <!-- Country Select CSS -->
    <link href="source/country-select/css/countrySelect.css" rel="stylesheet">

    <!-- Telephone Select CSS -->
    <link href="source/telephone-select/css/intlTelInput.css" rel="stylesheet">

    <!--Toastify-->
    <link rel="stylesheet" href="source/toastify/toastify.css">

    <!-- crop cdn -->
    <link rel="stylesheet" href="https://fengyuanchen.github.io/cropperjs/css/cropper.css" />

    <!--WaitMe-->
    <link rel="stylesheet" href="source/waitMe-31/waitMe.css">

    <!--Cropper CSS-->
    <link rel="stylesheet" href="source/cropper/croppie.css">

    <!-- fontawsome -->
    <!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous"> -->

    <!-- summernotes -->
    <link rel="stylesheet" href="source/summer/summernote.min.css">

    <!--Custom CSS File Add-->
    <link href='css/custom.css?v=<?= $cashClear ?>' rel='stylesheet' />
</head>

<body>

    <!-- ======= Header ======= -->
    <?php
    include 'include/top-bar.php';
    ?>
    <!-- ======= End Header =======  -->

    <!-- ======= Sidebar ======= -->
<?php
    // include 'include/side-bar.php';
    ?> 
    <!-- End Sidebar-->

    <!-- Main JS Files -->
    <script src="source/layout/assets/apexcharts/apexcharts.min.js"></script>
    <script src="source/layout/assets/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="source/jquery/jquery.min.js"></script>
    <script src="source/jquery-easing/jquery.easing.min.js"></script>
    <script src="source/layout/assets/chart.js/chart.min.js"></script>
    <script src="source/layout/assets/echarts/echarts.min.js"></script>
    <script src='js/moment.min.js'></script>
    <script src="source/layout/js/main.js"></script>
    <!-- Main JS Files -->

    <!-- firebase -->
    <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-auth.js"></script>

    <script type="module">
        // Import the functions you need from the SDKs you need
        import {
            initializeApp
        } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
        import {
            getAnalytics
        } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-analytics.js";
        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries

        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        const firebaseConfig = {
            apiKey: "AIzaSyDdPV4E51Yox7mvmcUkFA1BF-K_Z_dVPyg",
            authDomain: "broadwayapp-66c76.firebaseapp.com",
            databaseURL: "https://broadwayapp-66c76-default-rtdb.firebaseio.com",
            projectId: "broadwayapp-66c76",
            storageBucket: "broadwayapp-66c76.appspot.com",
            messagingSenderId: "520724193939",
            appId: "1:520724193939:web:b83f8f73306ee0d9b26366",
            measurementId: "G-9Y76TMYKJZ"
        };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);
    </script>

    <script src="source/datatables/datatables.js"></script>
    <script src="source/datatables/datatables.min.js"></script>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>



    <!-- Confirm JS -->
    <script src="source/confirm/confirm.min.js"></script>

    <!-- Selectize JS -->
    <script src="source/selectize/js/standalone/selectize.js"></script>


    <!-- Country Select JS -->
    <script src="source/country-select/js/countrySelect.js"></script>

    <!-- Telephone Select JS -->
    <script src="source/telephone-select/js/intlTelInput.js"></script>

    <!--Toastify-->
    <script src="source/toastify/toastify.js"></script>

    <!--WaitMe-->
    <script src="source/waitMe-31/waitMe.js"></script>

    <!-- crop cdn -->
    <script src="https://fengyuanchen.github.io/cropperjs/js/cropper.js"></script>

    <!--Loader Js-->
    <script src="source/loadingoverlay/loadingoverlay.min.js"></script>

    <!--Cropper Js-->
    <script src="source/cropper/croppie.js"></script>

    <!--tinymce js-->
    <script src='source/tinymce/tinymce.js?v=<?= $cashClear ?>'></script>

    <!-- summernote -->
    <link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.js"></script>

    <!-- cropeer -->
    <link rel="stylesheet" href="https://fengyuanchen.github.io/cropperjs/css/cropper.css" />
    <script src="https://fengyuanchen.github.io/cropperjs/js/cropper.js"></script>

    <!-- Custom JS -->
    <script src='js/custom/custom-functions.js?v=<?= $cashClear ?>'></script>

    <!-- Custom JS -->

    <!--Loaders-->
    <div id="overlay-Loader">
        <div class="overlay-spinner">
            <span class="spinner"></span>
        </div>
    </div>
    <!--Loaders-->

    <main id="main" class="main">
        <div class="container-fluid">
            <?php
            if (isset($_GET['page'])) {
                $page = filter_var($_GET['page'], FILTER_SANITIZE_URL);
                if (file_exists("pages/$page.php")) {
                    $access    = authorization($SESS_USER_TYPE, $SESS_USER_ID, $page);
                    if ($access == true) {
                        include("pages/$page.php");
                    } else {
                        include("404.php");
                    }
                } else {
                    include("404.php");
                }
            } else {
                include("pages/dashboard.php");
            }
            ?>
        </div>
        <br> <br>
    </main>

    <!-- CSRF Protection -->
    <input type="hidden" name="CSRF_TOKEN" id="CSRF_TOKEN" value="<?= isset($_SESSION['CSRF_TOKEN']) ? $_SESSION['CSRF_TOKEN'] : '' ?>">
    <!-- CSRF Protection -->

</body>

</html>