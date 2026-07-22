/* Hide and Show Nav Bar */
$(document).ready(function () {

    $("#collapse_btn").click(function () {
        $("#sidebar").addClass("collapsed");
    });

    $("#menu_icon").click(function () {
        $("#sidebar").removeClass("collapsed");
    });

});


