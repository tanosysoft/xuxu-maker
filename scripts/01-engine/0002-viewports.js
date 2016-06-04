'use strict'; {

let exports = xxm.viewports = {};

exports.create = (w, h) => {
    let $vp = $('<div>')
        .addClass('xxmViewport')
        .width(w)
        .height(h);

    return $vp;
};

let raf = requestAnimationFrame;

function updateScrolls() {
    raf(updateScrolls);

    let vpMargin = 64;

    $('.xxmViewport').each((i, vp) => {
        let $vp = $(vp);

        let $target = $vp.find('.xxmViewportTarget');

        if($target.length === 0) {
            return;
        }

        let tLeft = parseInt($target.css('left'));
        let tTop = parseInt($target.css('top'));

        let vpEffectiveMargin = vpMargin;

        if($target.closest('.xxmZoom').length !== 0) {
            tLeft *= 2;
            tTop *= 2;
            vpEffectiveMargin *= 2;
        }

        let vpWidth = $vp.width();
        let vpHeight = $vp.height();

        let vpScrollH = $vp.scrollLeft();
        let vpScrollV = $vp.scrollTop();

        let tw = xxm.cssVar.get(document.body, 'tw', 'int');
        let th = xxm.cssVar.get(document.body, 'th', 'int');

        if(tLeft < vpScrollH + vpEffectiveMargin) {
            $vp.scrollLeft(tLeft - vpEffectiveMargin);
        }

        if(tLeft > vpScrollH + vpWidth - vpEffectiveMargin - tw) {
            $vp.scrollLeft(tLeft - vpWidth + vpEffectiveMargin + tw);
        }

        if(tTop < vpScrollV + vpEffectiveMargin) {
            $vp.scrollTop(tTop - vpEffectiveMargin);
        }

        if(tTop > vpScrollV + vpHeight - vpEffectiveMargin - th) {
            $vp.scrollTop(tTop - vpHeight + vpEffectiveMargin + th);
        }
    });
}

updateScrolls();

}
