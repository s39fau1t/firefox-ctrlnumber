function* reverse(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
        yield arr[i];
    }
}

browser.commands.onCommand.addListener(async command => {
    let idx = parseInt(command.slice(-1));

    let tabs = await browser.tabs.query({ currentWindow: true, hidden: false });

    if (idx === 9 || idx >= tabs.length) {
        tabs = reverse(tabs);

        idx = 1;
    }

    for (const tab of tabs) {
        if (tab.groupId !== -1) {
            const group = await browser.tabGroups.get(tab.groupId);

            if (group.collapsed) {
                continue;
            }
        }

        if (--idx === 0) {
            browser.tabs.update(tab.id, { active: true });

            break;
        }
    }
});