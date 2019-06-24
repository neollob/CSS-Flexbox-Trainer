function createEle(father, e, text, clase) {
    let newDiv = document.createElement(e);
    newDiv.innerHTML = text;
    newDiv.setAttribute('class', clase);
    father.appendChild(newDiv);
    return newDiv;
}
/**Crear input propiedad CSS numérica */
function fillBoxProp(container, value, id = '', text = '', un = '',type='number') {
    let item = createEle(container, 'div', '', `${id} textInput`)
    //item.setAttribute('data-tip', id);
    let label = createEle(item, 'label', text, '')
    label.htmlFor = id;
    let input = createEle(item, 'input', '', `${id} boxProp`)
    input.type = type;
    input.id = id;
    input.value=value
    if (type=='number')input.value = parseInt(value);
    if (un == '') {
        input.addEventListener('change', (e) => { applyBoxStyle(e.target) }, false);
        input.addEventListener('keyup', (e) => { applyBoxStyle(e.target) }, false);
    }
    else {
        input.addEventListener('change', (e) => { applyBoxStyle(e.target, un) }, false);
        input.setAttribute('units', un);
    }
    input.addEventListener('mouseover',(e)=>{e.target.focus()});
    input.addEventListener('focus',(e)=>{docProperty(e.target.classList[0]);})
    return item;
}
/**Crear input y lista de propiedad CSS alfanumérica */
function fillBoxPropDropDown(container, value, idDL, id, text, data, un = '') {
    //declaramos la caja a la cual pertenecen las reglas
    let box = document.getElementById(container.parentElement.classList[1]);
    //creamos objeto dropdown
    let item = createEle(container, 'div', '', 'textInput');
    //item.setAttribute('data-tip', id);
    //añadimos etiqueta al dropdown
    let label = createEle(item, 'label', text, '');
    label.htmlFor = idDL + 'S';
    //añadimos input al dropdown asociado a la lista
    let input = createEle(item, 'input', '', id);
    input.type = 'text';
    input.setAttribute('list', idDL);
    input.name = input.id = idDL + 'S';
    input.value=value;
    //añadimos los listeners
    let cont = container.classList;
    if (cont[0] == 'inputs') {
        input.addEventListener('mouseover', showOptionsContainer);
        input.addEventListener('input', flexProp);
    } else {
        input.addEventListener('mouseover', showOptionsChildrens);
        input.addEventListener('change', (e) => { applyBoxStyle(e.target, '', 'C') });
    }
    //añadimos lista al dropdown
    let datalist = createEle(item, 'datalist', '', '');
    datalist.id = idDL;
    //añadimos opciones a la lista del dropdown
    data.forEach((e) => {
        if (cont[0] == 'inputs') {
            let classProp = datalist.attributes[1].textContent;
            let opt = createEle(datalist, 'option', '', `${id}`);
            opt.value = e;
        } else {
            let opt = createEle(datalist, 'option', '', `${id}`);
            opt.value = e;
        }
    });
    //llenamos el inputs con el valor de la caja
    if (box != null) {
        input.innerText = box.style;
    }
}
function createBoxProperty(containerPral, c, cont, dataTip, label, id, t, v, en, listener) {
    prop = createEle(containerPral, 'div', '', c);
    //prop.setAttribute('data-tip', dataTip);
    labelEle = createEle(prop, 'label', `<span>${label}</span>`, '');
    labelEle.setAttribute('for', id)
    
    inputEle = createEle(prop, 'input', '', cont);
    inputEle.id = id;
    inputEle.setAttribute('type', t);
    inputEle.setAttribute('value', v);
    inputEle.disabled = en;
    prop.addEventListener('change', listener);
    prop.addEventListener('keyup', listener);
    inputEle.addEventListener('mouseover', (e) => { e.target.focus(); });
    return prop;
}
function creaBoxModel(father,childs=4,value=''){
    for (let i=0;i<childs;i++){
        let boxModelChild=createEle(father,'div','',`boxModelChild${i+1}`)
        if ((father.style.cssText==``)&&(i==2)){
            boxModelChild.style.alignSelf=value; 
            boxModelChild.style.borderColor='#fffc';           
        }
    }
}
function createClearDiv(father) {
    let cleardiv = createEle(father, 'div', '', 'clearValue');
    createEle(cleardiv, 'div', '', 'propModelClear fatherBox');
    createEle(cleardiv, 'div', '', '');
    createEle(cleardiv, 'div', 'none', '');
    cleardiv.addEventListener('click', (e) => {        
        applyProperty(e.target.parentElement);
        e.stopPropagation();            
    });
}
function changeProp(prop, value, clase, unit = '') {
    let result = '';
    if (value != '')
        result = prop + value + unit + ';'
    document.getElementById(clase).innerText = result;
    return result;
}
function flexProp(e) {
    var val = e.target.value;
    var opts = e.target.nextElementSibling.childNodes;
    onSelect(val, opts);
}
function onSelect(val, opts) {
    for (var i = 0; i < opts.length; i++) {
        if (opts[i].value === val) {
            showContainer();
            break;
        }
    }
}
