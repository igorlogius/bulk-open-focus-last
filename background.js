/* global browser */

let timerId = null;

function handleCreated(tab) {

    if(!tab.openerTabId && !tab.pinned && !tab.active){
        if(timerId !== null){
            clearTimeout(timerId);
        }
        timerId = setTimeout(async function() {
            browser.tabs.update(tab.id, { active: true });
        }, 500);
    }
}

browser.tabs.onCreated.addListener(handleCreated);


