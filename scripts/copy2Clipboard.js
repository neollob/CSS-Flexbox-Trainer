function fallbackCopyTextToClipboard(text,textarea) {
    let textArea = document.querySelector(`.${textarea}`);
    textArea.value = text;
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? appLngArr[0].Copy.success : appLngArr[0].Copy.unsuccess;
        showCopyResult(appLngArr[0].Copy.fallCopy + msg,text);
    } catch (err) {
        showCopyResult(appLngArr[0].Copy.fallError+ err,text);
    }
}
function copyTextToClipboard(text,textarea) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text,textarea);
        return;
    }
    navigator.clipboard.writeText(text).then(function () {
        showCopyResult(appLngArr[0].Copy.asyncCopy,text);
    }, function (err) {
        showCopyResult(`${appLngArr[0].Copy.asyncError}  ${err}`,text);
    });
}
function showCopyResult(msg,text){
    toastr(msg);
}