let infoArr = [];
let appLngArr = [];
function listLanguage() {
    listInfoDoc(urlLng, 0).then(r => {
        infoArr=r;    
        })
        .catch(error => console.log(error.message));
    listInfoDoc(urlLng, 1).then(r => {
        appLngArr=r;
        addFooter();                
        translate();    
        })
        .catch(error => console.log(error.message));    
}
function listInfoDoc(url, i) {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open('GET', url[i]);
        request.send();
        request.onload = () => {
            if (request.status == 200 && request.readyState == 4) {
                resolve(JSON.parse(request.responseText));
            }
            else {
                reject();
            }
        }
    })
}
function removeInfo() {
    try { document.querySelector('.info').remove(); } catch{ }
}
function docProperty(property) {
    if (infoSwitchValue) {
        let body = document.querySelector('body');
        removeInfo();
        let info = createEle(body, 'div', '', 'info');
        infoArr.forEach(e => {
            if (e.title == property) {
                let content = createEle(info, 'div', '', 'infoContent');
                let close = createEle(content, 'div', '', 'closeInfo');
                close.addEventListener('click', removeInfo);
                let title = createEle(content, 'div', '', 'title');
                createEle(title, 'h3', `${e.title}`, 'title');
                createEle(content, 'p', `${e.doc}`, 'doc');
                createEle(content, 'div', ``, 'valContent');
            } else { `nope ${e.title}` }
        });
        infoTip();
    }
}
function docPropertyValue(property, value) {
    let infoContent = document.querySelector('.info');
    if (infoContent) {
        let valContent = document.querySelector('.valContent');
        valContent.innerHTML = '';
        let prop = infoArr.filter((e) => {
            if (e.title == property)
                return e;
        });
        let val = prop[0].values.filter((e) => {
            if (e.key == value) {
                let modelBox = document.getElementsByClassName('propModel');
                let modelBoxArr = [].slice.call(modelBox);
                let boxModel;
                modelBoxArr.forEach(el1 => {
                    let elementStyle = el1.style.cssText;
                    if (modelBoxArr[0].classList[1] == 'childBox') {
                        elementStyle = el1.children[2].style.cssText;
                    }
                    if (property == 'flex-direction') elementStyle = elementStyle.replace(' wrap', '');
                    if (elementStyle.indexOf((` ${value};` || `${value + ' '}`)) > -1) {
                        boxModel = el1.cloneNode(true);;
                    }
                });
                let titleContent = createEle(valContent, 'div', ``, 'titleValue');
                try { titleContent.appendChild(boxModel); } catch (error) { }
                let title = createEle(titleContent, 'h4', `${e.key}`, 'titleValue');
                if (e.text.startsWith('(default)')) {
                    title.innerHTML = `${e.key}&ensp;<small>(default)</small>`;
                }
                createEle(valContent, 'p', `${e.text.replace('(default)', '')}`, 'docValue');
                return e;
            }
        });
    }
}