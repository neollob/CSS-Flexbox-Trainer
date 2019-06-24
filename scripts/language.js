let ln=x=window.navigator.language||navigator.browserLanguage;
if ((ln != 'en')&&(ln != 'es')) {
    ln = 'en';
}
let urlLng = [`./data/documentation_${ln}.json`,`./data/app_${ln}.json`];

function translate(){
    document.querySelector('.toggleStyles').innerText=appLngArr[0].CSS;
}

