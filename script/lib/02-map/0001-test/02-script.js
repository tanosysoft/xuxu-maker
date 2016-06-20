'use strict'; {

xxm.db.maps[1].init = $el => {
    let seFlip = new Audio('data/se/Attack2.ogg');
    let seTransform = new Audio('data/se/Absorb1.ogg');

    let evEvilSister = $('.xxmEvEvilSister').data('xxmParentEvent');

    {
        let page = xxm.events.pageByName(evEvilSister, 'default');

        page.checkConditions = ev => {
            return !ev.isItAllOverYet;
        };

        page.trigger = 'action';

        page.exec = ev => {
            xxm.cssAnimations.add(ev.$spr, 'flip', '0.8s');
            seFlip.play();

            let deferred = Q.defer();

            (function thisFn() {
                if(ev.$spr.is('.animated')) {
                    requestAnimationFrame(thisFn);
                    return;
                }

                setTimeout(() => {
                    seTransform.play();

                    xxm.cssAnimations.add(ev.$spr, 'flash', '0.2s', 4);

                    ev.isItAllOverYet = true;

                    let $uiLayer = $('.demoUiLayer');

                    let [$msgBox, msgPromise] = xxm.messageBox.show(
                        $uiLayer, ["You've completed the quest, congratulations!"]
                    );

                    $msgBox.addClass('xxmFatMessageBox xxmBottomWindow xxmWaitCursor');

                    deferred.resolve(msgPromise);
                }, 150);
            })();

            return deferred.promise;
        };
    }

    {
        let page = xxm.events.pageByName(evEvilSister, 'allOver');

        page.trigger = 'action';

        page.exec = ev => {
            let $uiLayer = $('.demoUiLayer');

            let [$msgBox, msgPromise] = xxm.messageBox.show($uiLayer, [
                "Actually, I was your evil twin all along! ",
                "It's all over for you now!",
            ]);

            $msgBox.addClass('xxmFatMessageBox xxmBottomWindow xxmWaitCursor');

            return msgPromise.then(() => {
                ev.isItAllOverYet = false;
            });
        };
    }
};

}
