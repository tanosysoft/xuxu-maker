'use strict'; {

$(() => {
    let coreName = window.location.hash.slice(1);

    $('head').append(
        $('<script>').attr('src', `cores/${coreName}`)
    );
});

}
