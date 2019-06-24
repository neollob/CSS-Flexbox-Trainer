function infoTip() {
    if (infoTipDone == false) {
        let infotip;
        setTimeout(() => {
            infoTipWarning = createEle(document.body, 'div', '', 'tip infoTip');
            let tipMsg = createEle(infoTipWarning, 'div', '', 'tipMsg');
            createEle(tipMsg, 'div', appLngArr[0].infoTip, '');
            createEle(tipMsg, 'div', '', '');
        }, 2000);
        setTimeout(() => {
            infoTipWarning.remove();
        }, 10000);
        infoTipDone = true;
    }
}
let infoTipDone = false
