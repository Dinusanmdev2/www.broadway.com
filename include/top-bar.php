<?php
$userId = $SESS_USER_ID;

$proPic = "upload/userImg/$userId.png";
if (!file_exists("upload/userImg/$userId.png")) {
    $proPic = "upload/userImg/default.png";
}
?>

<header id="header" class="header fixed-top d-flex align-items-center">

    <!-- Logo -->
    <div class="d-flex align-items-center justify-content-between">
        <!-- <i class="bi bi-list toggle-sidebar-btn"></i> -->
        <a class="navbar-brand ms-2" href="#">
            <div class="font-monospace subheading-2">Broadway: <?= $SESS_USER_EMAIL?> Dashboard</div>
        </a>
    </div>
    <!-- End Logo -->

    <!-- Navigation -->
    <nav class="header-nav ms-auto">
        <ul class="d-flex align-items-center">

           
          

            <!-- Profile -->
            <li class="nav-item dropdown pe-3">
                <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                    <img src="<?= $proPic ?>" alt="Profile" class="rounded-circle">
                    <!-- <span class="d-none d-md-block dropdown-toggle ps-2"><?= $SESS_USER_NAME ?></span> -->
                </a>

                <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                    <!-- <li class="dropdown-header">
                        <h6><?= $SESS_USER_NAME ?></h6>
                        <span><?= $SESS_USER_TYPE ?></span>
                    </li> -->

                    <!-- <li>
                        <hr class="dropdown-divider">
                        <a class="dropdown-item d-flex align-items-center" href="index.php?page=user-profile">
                            <i class="bi bi-person"></i> <span>My Profile</span>
                        </a>
                    </li> -->

                   

                    <li>
                        <hr class="dropdown-divider">
                        <a class="dropdown-item d-flex align-items-center"
                            href="logout.php">
                            <i class="bi bi-box-arrow-right"></i> <span>Sign Out</span>
                        </a>
                    </li>
                </ul>
            </li>
            <!-- End Profile -->
        </ul>
    </nav>
    <!-- End Navigation -->
</header>