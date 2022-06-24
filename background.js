/* global browser */

let timerId = null;

// todo ignore singular tab creation
// time between the calls between 2 created calls should be smaller then human action (aka. < 25ms)

let last_call = null;

function onCreated(tab) {

    const now = tab.lastAccessed; //Date.now();
    //
    console.log(now,last_call, now-last_call);
    if(!tab.openerTabId && !tab.pinned && !tab.active && // this is obvious
        last_call !== null && (now - last_call) < 25  // we assume opening many tabs simultaniously has a very short call time
    ) {
        // queue this tab for focusing

        if(timerId !== null){
            clearTimeout(timerId);
        }
        timerId = setTimeout(async function() {
            browser.tabs.update(tab.id, { active: true });
        }, 500);
    //}
    }
    // ignore tab for focusing
    last_call = now;
}

browser.tabs.onCreated.addListener(onCreated);


