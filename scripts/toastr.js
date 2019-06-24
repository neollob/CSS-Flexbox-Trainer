function toastr(msg) {
    const body = document.body;
    let toastr = document.createElement('div');
    toastr.classList = ('toastr');
    toastr.innerText = msg;
    body.appendChild(toastr);
    setTimeout(() => {
        fadeOutEffect(toastr, body)
    }, 2000);
}
function fadeOutEffect(e, father) {
    const fadeEffect = setInterval(()=> {
        if (!e.style.opacity) {
            e.style.opacity = 1;
        }
        if (e.style.opacity > 0) {
            e.style.opacity -= 0.1;
        } else {
            clearInterval(fadeEffect);
            father.removeChild(e);
        }
    }, 120);
}
