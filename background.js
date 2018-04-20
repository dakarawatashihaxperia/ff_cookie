'use strict';

let is_block;
initialize();

/**
 * Get current status and set browser icon.
 */
function initialize() {
    let conf = browser.privacy.websites.cookieConfig.get({});

    conf.then((config) => {
        is_block = (config.value.behavior === 'reject_all');
        reloadIcon();
    });
}

/**
 * On Click, toggle cookie Enable/Disable.
 */
browser.browserAction.onClicked.addListener(() => {
    toggleCookie();
});

/**
 * Toggle cookieConfig (Web API)
 */
function toggleCookie() {
    is_block = !is_block;

    if (is_block) {
        browser.privacy.websites.cookieConfig.set({value: {behavior: 'reject_all'}});
    }
    else {
        browser.privacy.websites.cookieConfig.set({value: {behavior: 'allow_all'}});
    }

    reloadIcon();
}

/**
 * Reload toolbar icon.
 */
function reloadIcon() {
    if (is_block) {
        browser.browserAction.setIcon({path: 'icons/icon_blocked.svg'});
    }
    else {
        browser.browserAction.setIcon({path: 'icons/icon.svg'});
    }
}