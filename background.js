/* global browser */

let timerId;
let last_call = null;

function onCreated(tab) {
    //
    console.debug('=> onCreated ', tab.id);

    const now = Date.now();
    if(last_call === null){
        last_call = now;
    }
    if(  !tab.openerTabId &&
         (now - last_call) < 35
    ) {
        // queue this tab for focusing and stop any pending setTimeouts
        console.debug('==> queueing tab and clearing previously queued', tab.id);
        //
        clearTimeout(timerId);
        timerId = setTimeout(function() {
            //
            console.debug('===> activating tab ', tab.id);
            //browser.tabs.update(tab.id, { active: true }); // this only works with a fresh profile ... stangely enough
            browser.tabs.highlight({ tabs: [tab.index] });  // this seems to work in other cases too, so we go with this for now
        }, 1000);
    }
    last_call = now;
}

browser.tabs.onCreated.addListener(onCreated);

