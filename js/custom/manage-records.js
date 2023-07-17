$(document).ready(function () {
    $("#showrecord").DataTable({
        dom: "Bfrtip",
        bSort: false,
        buttons: [
            {
                extend: "print",
                footer: true,
                text: "Print",
                exportOptions: {
                    stripHtml: false
                },
            },
            {
                extend: "excel",
                footer: true,
                text: "Excel",
                exportOptions: {
                    stripHtml: false
                },
            }
        ],

        scrollX: false,
        paging: true,
        fixedHeader: true,
        responsive: true,
    });
});