'use strict'; {

$(() => {
    let coreName = location.hash.slice(1);

    $('head').append(
        $('<script>').attr('src', `cores/${coreName}`)
    );
});

let lastHash = location.hash;

(function thisFn() {
    requestAnimationFrame(thisFn);

    if(location.hash !== lastHash) {
        lastHash = location.hash;
        location.reload();
    }
})();

}
