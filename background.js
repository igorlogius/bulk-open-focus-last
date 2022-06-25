/* global browser */

let timerId = null;
let last_call = Date.now();   // load time of the addon is fine i hope

function onCreated(tab) {

    const now = Date.now();
    //
    if( !tab.openerTabId &&      //
        !tab.pinned &&           //
        !tab.active &&           //
        (now - last_call) < 25   //
    ) {
        // queue this tab for focusing
        if(timerId !== null){
            clearTimeout(timerId);
        }
        timerId = setTimeout(async function() {
            browser.tabs.update(tab.id, { active: true });
            timerId = null;
        }, 500);
    }
    // ignore tab for focusing
    last_call = now;
}

browser.tabs.onCreated.addListener(onCreated);


