'use strict'; {

let exports = xxm.viewports = {};

exports.set = $el => {
    $el = $($el);

    $el.addClass('xxmViewport');

    xxm.cssVar.setIfUnset($el[0], 'padding', 128);

    return $el;
};

let vpLastPadding;
let tLastX;
let tLastY;

(function thisFn() {
    requestAnimationFrame(thisFn);

    $('.xxmViewport').each((i, vp) => {
        let $vp = $(vp);

        let $target = $vp.find('.xxmViewportTarget');

        if($target.length === 0) {
            return;
        }

        let tx = parseInt($target.css('left'));
        let ty = parseInt($target.css('top'));
        let tw = $target.width();
        let th = $target.height();

        let vpPadding = xxm.cssVar.get($vp[0], 'padding', 'int');

        {
            let $zoom = $target.closest('.xxmZoom');

            if($zoom.length !== 0) {
                let factor = parseInt($zoom.css('zoom'));

                tx *= factor;
                ty *= factor;
                tw *= factor;
                th *= factor;

                vpPadding *= factor;
            }
        }

        if(vpPadding === vpLastPadding && tx === tLastX && ty === tLastY) {
            return;
        }

        vpLastPadding = vpPadding;
        tLastX = tx;
        tLastY = ty;

        let vpWidth = $vp.width();
        let vpHeight = $vp.height();

        let shouldScroll = {
            left: () => tx < $vp.scrollLeft() + vpPadding,
            right: () => tx > $vp.scrollLeft() + vpWidth  - tw - vpPadding,
            up: () => ty < $vp.scrollTop() + vpPadding,
            down: () => ty > $vp.scrollTop() + vpHeight - th - vpPadding,
        };

        let scrollCenterX = () => $vp.scrollLeft(
            tx - (vpWidth / 2) + (tw / 2)
        );

        let scrollCenterY = () => $vp.scrollTop(
            ty - (vpHeight / 2) + (th / 2)
        );

        if(shouldScroll.left()) {
            $vp.scrollLeft(tx - vpPadding);

            if(shouldScroll.right()) {
                scrollCenterX();
            }
        }
        else
        if(shouldScroll.right()) {
            $vp.scrollLeft(tx - vpWidth + tw + vpPadding);

            if(shouldScroll.left()) {
                scrollCenterX();
            }
        }

        if(shouldScroll.up()) {
            $vp.scrollTop(ty - vpPadding);

            if(shouldScroll.down()) {
                scrollCenterY();
            }
        }
        else
        if(shouldScroll.down()) {
            $vp.scrollTop(ty - vpHeight + vpPadding + th);

            if(shouldScroll.up()) {
                scrollCenterY();
            }
        }
    });
})();

}
