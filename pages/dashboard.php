<?php

include("firebaseRDB.php");

$db = new firebaseRDB($databaseURL);

$data = $db->retrieve("alldata");
$data = json_decode($data, 1);

?>
<div class="card shadow">
    <div class="card-header">
        <i class="fa fa-book" aria-hidden="true"></i> All Records
    </div>
    <div class="card-body">
        <br>
        <table class="table table-striped ver-center-table" id='showrecord'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Bank Name</th>
                    <th>Phone Number</th>
                    <th>Phone Status</th>
                </tr>
            </thead>
            <tbody>
                <?php
                $i = 1;
                if (is_array($data)) {
                    foreach ($data as $id => $details) {
                        echo "<tr>";
                        echo "<td>$i</td>";
                        echo "<td>{$details['bank']}</td>";
                        echo "<td>{$details['phonenumber']}</td>";
                        echo "<td>{$details['status']}</td>";
                        echo "</tr>";
                        $i++;
                    }
                };
                ?>
            </tbody>

        </table>
    </div>
</div>


<!-- Custom JS -->
<script src='js/custom/manage-records.js?v=<?= $cashClear ?>'></script>
<!-- Custom JS -->