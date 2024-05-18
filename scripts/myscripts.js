let styleBoxesArr = [];
let numChilds = 6;
let infoSwitchValue = false;
let valueCommonWidth = '100px';
let valueCommonHeight = '100px';

// Page Load ////////////////////////////////////////////////////////////////////////////////////////////////////////////
addEventListener('load', () => {
    layout();
    listLanguage();
    addInfoSwitcher();
    containerEditor();
    addChild();
    showContainer();
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////
function infoSwitcher(father) {
    containerPral = createEle(father, 'section', '', `infoSwitcher `);
    createEle(containerPral, 'div', 'i', `infoLogo`).addEventListener('click', (e) => {
        if (!inputSwitch1.checked) {
            inputSwitch1.checked = infoSwitchValue = true;
        } else {
            inputSwitch1.checked = infoSwitchValue = false;
            removeInfo();
        }
    });
    let switch1 = createEle(containerPral, 'label', '', `switch`);
    let inputSwitch1 = createEle(switch1, 'input', '', `infoSwitch`);
    inputSwitch1.type = 'checkbox';
    if (infoSwitchValue) inputSwitch1.setAttribute('checked', '');
    inputSwitch1.addEventListener('click', (e) => {
        if (!e.target.checked) {
            infoSwitchValue = false;
            removeInfo();
        } else { infoSwitchValue = true; }
    });

    createEle(switch1, 'span', '', `slider round`);
}
function addInfoSwitcher() {
    infoSwitcher(document.querySelector('header'));
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
function containerEditor() {
    let container = document.querySelector('.properties');
    container.innerHTML = '';
    //contenedor propiedades caja
    fatherProperties = createEle(container, 'section', '', 'fatherProperties sectionProperties fadeIn');
    let flexBox = document.querySelector('#flexContainer');
    let tgglBtn = createEle(fatherProperties, 'div', 'CSS Rules', 'toggleStyles');
    tgglBtn.addEventListener('click', () => { toggleStyleBoxes(fatherProperties, flexBox.id) });
    tgglBtn.setAttribute('tgglTxt', 'CSS Rules');
    try { tgglBtn.innerText = appLngArr[0].CSS; } catch(err){ }

    let labelContainer = createEle(fatherProperties, 'div', ``, '');
    let label = createEle(labelContainer, 'label', `<span>container</span>`, '');
    label.addEventListener('click', containerEditor);
    label.style.cursor = 'pointer';

    let fatherOpt = createEle(fatherProperties, 'div', '', `fatherOptions childsSection`);
    //inputs de numero y tamaño de cajas
    boxChildsEditor(fatherOpt);
    //seccion opciones caja
    containerPral = createEle(fatherOpt, 'section', '', `fatherOptions sectionOptions`);
    inputs = createEle(containerPral, 'section', '', `inputs `);
    //inputs de estilo flex de caja contenedora
    fillBoxPropDropDown(inputs, 'flex', 'displayBox', 'display', 'display', ["flex", "inline-flex"]);
    fillBoxPropDropDown(inputs, 'row', 'flexDirectionBox', 'flex-direction', 'flex-direction', ["row", "row-reverse", "column", "column-reverse"]);
    fillBoxPropDropDown(inputs, 'nowrap', 'flexWrapBox', 'flex-wrap', 'flex-wrap', ["nowrap", "wrap", "wrap-reverse"]);
    fillBoxPropDropDown(inputs, '', 'justifyContentBox', 'justify-content', 'justify-content', ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"]);
    fillBoxPropDropDown(inputs, '', 'alignItemsBox', 'align-items', 'align-items', ["flex-start", "flex-end", "center", "baseline", "stretch"]);
    fillBoxPropDropDown(inputs, '', 'alignContentBox', 'align-content', 'align-content', ["flex-start", "flex-end", "center", "space-between", "space-around", "stretch"]);
    createBoxProperty(inputs, 'textInput', `flex-flow`, '', 'flex-flow', 'flexFlowBoxS', 'text', '', true, showOptionsContainer).addEventListener('mouseover', flexFlowListener);

    fillPropValues();
    //seccion opciones propiedad (contenedor vacio)
    containerOptions = createEle(containerPral, 'section', '', `flexOptions`);
}
function boxChildsEditor(father) {
    containerPral = createEle(father, 'section', '', `children `);
    //Propiedades comunes de las cajas
    createBoxProperty(containerPral, 'childs', `numChilds`, 'Number of children', '# items <small>x</small> ', 'numChilds', 'number', numChilds, false, addChild);
    childSize = createEle(containerPral, 'div', '', `childSize`);

    createBoxProperty(childSize, 'minWidth', `childsSize`, 'Min. Width', 'W:', 'valueWidth', 'number', 100, false, applyChildrensStyles);
    createBoxProperty(childSize, 'minHeight', `childsSize`, 'Min. Height', 'H:', 'valueHeight', 'number', 100, false, applyChildrensStyles);
    valueCommonWidth = document.getElementById('valueWidth');
    valueCommonHeight = document.getElementById('valueHeight');
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
function boxEditor(e) {
    box = e;
    if (box.tagName == 'SPAN') box = e.parentElement;
    let container = document.querySelector('.properties');
    container.innerHTML = '';
    //contenedor propiedades caja
    childrenProperties = createEle(container, 'section', '', 'childrenProperties sectionProperties fadeIn');
    let tgglBtn = createEle(childrenProperties, 'div', 'CSS Rules', 'toggleStyles');
    tgglBtn.addEventListener('click', () => { toggleStyleBoxes(childrenProperties, box.id) });
    tgglBtn.setAttribute('tgglTxt', 'CSS Rules');
    let label1 = createEle(childrenProperties, 'div', '', box.id);
    let parentLabel = createEle(label1, 'label', `<span>Container</span>`, box.id);
    parentLabel.addEventListener('click', containerEditor);
    parentLabel.style.cursor = 'pointer';
    let boxselected = createEle(label1, 'label', `<span>${box.id.replace('_item', '#')}</span>`, box.id);
    //seccion opciones caja
    containerPral = createEle(childrenProperties, 'section', '', `childsOptions ${box.id} sectionOptions`);
    container = createEle(containerPral, 'section', '', `childrenOptions ${box.id}`);
    //inputs de tamaño de caja
    let sizeContainer = createEle(container, 'div', '', 'sizeContainer');
    fillBoxProp(sizeContainer, box.style.minWidth, 'min-width', 'min-width', 'px');
    fillBoxProp(sizeContainer, box.style.minHeight, 'min-height', 'min-height', 'px');
    //inputs de estilo flex de caja hijo
    let propertiesContainer = createEle(container, 'div', '', 'propertiesContainer');
    fillBoxProp(propertiesContainer, box.style.order, 'order', 'order');
    fillBoxProp(propertiesContainer, 0, 'flex-grow', 'flex-grow');
    fillBoxProp(propertiesContainer, 1, 'flex-shrink', 'flex-shrink');
    let basis = fillBoxProp(propertiesContainer, 'auto', 'flex-basis', 'flex-basis', '', 'text');
    fillBoxPropDropDown(propertiesContainer, box.style.alignItems, 'alignItemsBox', 'align-self', 'align-self', ["flex-start", "flex-end", "center", "baseline", "stretch"]);
    fillBoxProp(propertiesContainer, box.style.flex, 'flex', 'flex', '', 'text').addEventListener('mouseover', flexFlowListener);

    fillPropValues(document.getElementById(propertiesContainer.parentElement.classList[1]));
    //seccion opciones propiedad
    containerOptions = createEle(containerPral, 'section', '', `propertiesOptions`);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**Llenar los inputs con los valores actuales de la cajas o el contenedor*/
function fillPropValues(box) {
    if (box != null) {
        fillBoxPropValues(box);
    } else {
        fillBoxPropValues(document.querySelector(`#${document.querySelector('.container').children[0].id}`));
        fillFlexFlow();
    }
}
function fillBoxPropValues(box) {
    //vaciamos el contenido de los inputs
    let emptyBoxes = document.getElementsByClassName('boxProp');
    for (let i in emptyBoxes) { emptyBoxes[i].value = ''; }
    //llenamos los inputs con los valores actuales de la caja
    for (let i in box.style) {
        try {
            let inputProp = document.querySelector(`.${box.style[i]}`);
            if (inputProp.type == 'text') {
                //asignamos el valor actual de la propiedad a su input correspondiente
                inputProp.value = box.style.getPropertyValue(box.style[i]);
            } else {
                inputProp.children[1].value = box.style.getPropertyValue(box.style[i]);
                if (inputProp.children[1].type == 'number') inputProp.children[1].value = parseFloat(box.style.getPropertyValue(box.style[i]));
            }
            if ((box.style[i] == 'flex-basis') || (box.style[i] == 'flex-grow') || (box.style[i] == 'flex-shrink')) {
                fillFlex();
            }
        } catch(err){ }
    }
}
function fillFlexFlow() {
    const valueFlexDirectionS = document.getElementById('flexDirectionBoxS');
    const valueFlexWrapS = document.getElementById('flexWrapBoxS');
    let valueFlexFlowS = document.getElementById('flexFlowBoxS');
    valueFlexFlowS.value = showFlexFlow(valueFlexDirectionS.value, valueFlexWrapS.value);
}
function fillFlex() {
    const valueFlexGrowS = document.getElementById('flex-grow');
    const valueFlexShrinkS = document.getElementById('flex-shrink');
    const valueFlexBasisS = document.getElementById('flex-basis');
    let valueFlexS = document.getElementById('flex');
    let result = showFlex(valueFlexGrowS.value, valueFlexShrinkS.value, valueFlexBasisS.value);
    valueFlexS.value = result;
    valueFlexS.disabled = true;
    return result;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
function flexFlowListener(e) {
    if (e.target.tagName == 'INPUT') {
        try {
            let container = document.getElementsByClassName('flexOptions');
            container[0].innerHTML = '';
        } catch (error) { }
        showInfoDoc(e.target);
    }
}
function showInfoDoc(target) {
    let classProp = target.classList[0];
    docProperty(classProp);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
function showFlexFlow(direction = 'row', wrap = 'nowrap') {
    if (direction == '') direction = 'row';
    if (wrap == '') wrap = 'nowrap';
    return `${direction} ${wrap}`;
}
function showFlex(grow = 0, shrink = 1, basis = 'auto') {
    if (grow == '') grow = '0';
    if (shrink == '') shrink = '1';
    if (basis == '') basis = 'auto';
    return `${grow} ${shrink} ${basis}`;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
function showOptionsCommon(target, className, classProp) {
    target.focus();//aplicamos foco al input de la propiedad correspondiente
    showInfoDoc(target);//mostramos documentacion de la propiedad seleccionada
    /**Vaciamos el contenido del contenedor donde iran las nuevas opciones*/
    let container = document.getElementsByClassName(className);
    container[0].innerHTML = '';
    /**obtenemos el nombre de la propiedad y creamos el cuadro que mostrara los diferentes valores de la propiedad */
    let newDiv = createEle(container[0], 'div', '', `${classProp} border`);
    newDiv.addEventListener('mouseover', (event1) => {
        if ((event1.target.classList[0] == 'propValueBox') || (event1.target.classList[0] == 'clearValue')) {
            applyProperty(event1.target)
        }
    });
    //añadimos elemento 'clear' para borrar del input el valor de la propiedad seleccionado
    createClearDiv(newDiv);
    return newDiv;
}
function showOptionsContainer(e) {
    /**Mostramos info y creamos contenedor para las nuevas opciones */
    let classProp = e.target.classList[0];
    let newDiv = showOptionsCommon(e.target, 'flexOptions', classProp);
    //seleccionamos la lista de propiedades
    let opts = e.target.parentElement.children[2].options;
    let optArr = [].slice.call(opts);
    //creamos los elementos correspondientes a cada propiedad
    optArr.forEach(el => {
        let optCont = createEle(newDiv, 'div', '', 'propValueBox');
        optCont.setAttribute('dataClass', classProp);
        let boxModel = createEle(optCont, 'div', '', 'propModel fatherBox');
        boxModel.style.cssText = `align-items:stretch;flex-wrap:wrap;${classProp}:${el.value};`;
        let childs = 4;
        if ((el.value.includes('wrap')) || (classProp.includes('align-content'))) childs = 10;
        creaBoxModel(boxModel, childs);
        createEle(optCont, 'div', el.value, '').addEventListener('click', (ev) => {
            applyProperty(ev.target.parentElement);
            ev.stopPropagation();
        });
        ;
    });
}
function showOptionsChildrens(e) {
    /**Mostramos info y creamos contenedor para las nuevas opciones */
    let classProp = e.target.classList[0];
    let newDiv = showOptionsCommon(e.target, 'propertiesOptions', classProp);
    //seleccionamos la lista de propiedades
    let opts = e.target.parentElement.children[2].options;
    let optArr = [].slice.call(opts);
    //creamos los elementos correspondientes a cada propiedad
    optArr.forEach(el => {
        let optCont = createEle(newDiv, 'div', '', `propValueBox`);
        let boxModel = createEle(optCont, 'div', '', 'propModel childBox');
        boxModel.style.cssText = ``;
        creaBoxModel(boxModel, 4, el.value);
        let opt = createEle(optCont, 'div', el.value, `${classProp} ${el.value}`);
        opt.setAttribute('id', classProp);
        opt.addEventListener('click', (ev) => {
            applyProperty(ev.target.parentElement);
            ev.stopPropagation();
        });
    });
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**aplicamos estilo a la caja o contenedor segun la opcion seleccionada*/
function applyProperty(target) {
    let property = target.parentElement.classList[0];
    let value = target.children[1].innerText;
    /**Seleccionamos input correspondiente a la propiedad y le asignamos el valor seleccionado */
    let flexProp = document.getElementsByClassName(property);//flexDirectionBoxS
    flexProp[0].value = `${value}`;
    /**Llamamos a la funcion que muestra la documentacion en pantalla */
    docPropertyValue(property, value);
    /**Aplicamos los estilos despues de selecionar la nueva opcion al elemento o al contenedor segun a que pertenezca la propiedad */
    let classTarget = target.parentElement.parentElement.classList[0]
    if (classTarget == 'propertiesOptions') {
        applyBoxStyle(target.children[1], '');
    } else { showContainer() };
}
/**Aplicamos los estilos al elemento correspondiente */
function applyBoxStyle(e, un = '', r = '') {
    let id = e.parentElement.parentElement.parentElement.parentElement.classList[1];
    let flesComb = '';
    let box = document.getElementById(id);
    let grandpa = document.getElementsByClassName('childrenOptions');
    let styles = '';
    let father = grandpa[0].children;
    for (let i = 0; i < father.length; i++) {
        for (let index = 0; index < father[i].children.length; index++) {
            let value = father[i].children[index].children[1].value;
            {
                let unit = '';
                try { unit = father[i].children[index].children[1].attributes.units.value; } catch(err){ }
                let prop = father[i].children[index].children[1];
                let property = prop.id;
                if (prop.type == 'text') property = prop.classList[0];
                if (value == 'auto') unit = '';
                styles += `${property}:${value + unit};`;
            }
        }
    }
    let flex = fillFlex();
    box.style.cssText = styles + `flex: ${flex};`;
    saveStyleBox(box.style.cssText
        .replace(`min-width: ${valueCommonWidth.value}px;`, '')
        .replace(`min-height: ${valueCommonHeight.value}px;`, '')
        .replace(`flex: 0 1 auto;`, '')
        , id);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
function applyChildrensStyles() {
    let box = document.getElementsByClassName('flexBox');
    let styleSentence = changeProp('min-width:', valueCommonWidth.value, 'valueWidth', 'px') + changeProp('min-height:', valueCommonHeight.value, 'valueHeight', 'px') +
        (`flex-grow: 0;flex-shrink:1;flex-basis:auto;`)

    for (let i = 0; i < box.length; i++) {
        box[i].setAttribute('style', styleSentence);
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**añade los hijos al contenedor flex principal */
function addChild() {
    let numChildren = document.getElementById('numChilds');
    numChilds = numChildren.value;
    let container = document.getElementById('flexContainer');
    container.innerText = '';
    for (let i = 0; i < numChildren.value; i++) {
        let childBox = createEle(container, 'div', '', 'flexBox');
        childBox.id = '_item' + (i + 1);
        childBox.addEventListener('click', (e) => { boxEditor(e.target) });
        createEle(childBox, 'span', `${(i + 1)}`, 'editBox');
    }
    applyChildrensStyles();
    numChildren.focus();
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
function showContainer() {
    const valueDisplayS = document.getElementById('displayBoxS');
    const valueFlexDirectionS = document.getElementById('flexDirectionBoxS');
    const valueFlexWrapS = document.getElementById('flexWrapBoxS');
    const valueJustifyContentS = document.getElementById('justifyContentBoxS');
    const valueAlignItemsS = document.getElementById('alignItemsBoxS');
    const valueAlignContentS = document.getElementById('alignContentBoxS');
    let valueFlexFlowS = document.getElementById('flexFlowBoxS');
    valueFlexFlowS.value = showFlexFlow(valueFlexDirectionS.value, valueFlexWrapS.value);

    let container = document.getElementById('flexContainer');
    let styleSentence = changeProp('display:', valueDisplayS.value, 'displayBoxS') + //changeProp('flex-direction:', valueFlexDirectionS.value, 'flexDirectionBoxS') + changeProp('flex-wrap:', valueFlexWrapS.value, 'flexWrapBoxS')+ 
        changeProp('flex-flow:', valueFlexFlowS.value, 'flexFlowBoxS') +
        changeProp('justify-content:', valueJustifyContentS.value, 'justifyContentBoxS') + changeProp('align-items:', valueAlignItemsS.value, 'alignItemsBoxS') +
        changeProp('align-content:', valueAlignContentS.value, 'alignContentBoxS');
    container.setAttribute('style', styleSentence);
    saveStyleBox(styleSentence, container.id);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**Guardamos los estilos del elemento al array de estilos */
function saveStyleBox(styleSentence, id) {
    let founded = false;
    if (styleBoxesArr.length > 0) {
        styleBoxesArr.filter((e) => {
            if (e.box == id) {
                e.style = styleSentence;
                founded = true;
            }
        })
    } else {
        founded;
    }
    if (!founded) styleBoxesArr.push({ 'box': id, 'style': styleSentence });
}
function styleBoxes(styleSentence, i, id) {
    let styleBoxInline = document.getElementsByClassName('styleBoxInline');
    styleBoxInline[i].innerText = 'style="' + styleSentence + '"';
    let styleBoxInternal = document.getElementsByClassName('styleBoxInternal');
    styleBoxInternal[i].innerText = `<style>#${id}{${styleSentence}}</style>`;
    let styleBoxExternal = document.getElementsByClassName('styleBoxExternal');
    styleBoxExternal[i].innerHTML = `#${id}{<br>&emsp;${styleSentence.replace(/;/g, ';<br>&emsp;')}}`;
    styleBoxExternal[i].setAttribute('data-tip', 'click to copy to clipboard');
}
/**Alternador entre inputs y los estilos en formato CCS */
function toggleStyleBoxes(father, id) {
    removeInfo();
    if (document.getElementsByClassName('toggleStyles')[0].innerText.indexOf('CSS') > -1) {
        createCSSPropertiesBoxes(father, id);
    }
    else {
        let id = father.children[1].classList;
        if (id.length == 0) id = [''];
        if (id[0].startsWith('_item')) {
            boxEditor(document.getElementById(id));
            translate();
        } else { containerEditor(); }
    }
}
/**Añadimos de los contenedores de las reglas CSS */
function createCSSPropertiesBoxes(father, id) {
    father.removeChild(document.getElementsByClassName(father.children[2].classList[0])[0]);
    let styleSentence = document.getElementById(id).style.cssText;
    let styleBox = createEle(father, 'div', '', 'styleBox fadeIn');
    createEle(styleBox, 'label', `inline style #${id}`, 'inlineStyle');
    createEle(styleBox, 'span', '', 'styleBoxInline').addEventListener('click', (e) => { copyToClipboard(e.target, 'styleTextarea'); });
    createEle(styleBox, 'label', 'internal CSS stylesheets', '');
    createEle(styleBox, 'span', '', 'styleBoxInternal').addEventListener('click', (e) => { copyToClipboard(e.target, 'styleTextarea'); });
    createEle(styleBox, 'label', 'external CSS stylesheets', '');
    createEle(styleBox, 'span', '', 'styleBoxExternal').addEventListener('click', (e) => { copyToClipboard(e.target, 'styleTextarea'); });
    let styleTextarea = createEle(styleBox, 'textarea', '', 'styleTextarea');
    styleBoxesAll(styleSentence.replace(`min-width: ${valueCommonWidth.value}px;`, '').replace(`min-height: ${valueCommonHeight.value}px;`, ''), 0, `min-width: ${valueCommonWidth.value}px;min-height: ${valueCommonHeight.value}px;`);
    let tgglBtn = document.getElementsByClassName('toggleStyles')[0];
    tgglBtn.innerText = appLngArr[0].Inputs;
    tgglBtn.setAttribute('tgglTxt', appLngArr[0].Inputs);
}
/** Imprimir reglas CSS de la caja y globales en los contenedores de las reglas CSS*/
function styleBoxesAll(styleSentence, i, common) {
    let styleBoxInline = document.getElementsByClassName('styleBoxInline');
    styleBoxInline[i].innerText = 'style="' + styleSentence + '"';
    let styleBoxInternal = document.getElementsByClassName('styleBoxInternal');
    let largeSentence = '';
    styleBoxesArr.forEach(e => {
        if (e.style != ' ') {
            largeSentence += `\n#${e.box}{${e.style}}`;
        }
    });
    common = `\n[id^="_item"]{${common}}`;
    styleBoxInternal[i].innerText = `<style>\n${common.replace('\n', '')}\n${largeSentence.replace('\n', '')}\n</style>`;
    let styleBoxExternal = document.getElementsByClassName('styleBoxExternal');
    styleBoxExternal[i].innerHTML = `${common.replace(/;/g, ';<br>&emsp;').replace(/{/g, '{<br>&emsp;').replace(/}/g, '}<br>')}`;
    styleBoxExternal[i].innerHTML += `${largeSentence.replace(/;/g, ';<br>&emsp;').replace(/{/g, '{<br>&emsp;').replace(/}/g, '}<br>')}`;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**Copiamos el contenido del contenedor de estilos en el portapapeles */
function copyToClipboard(e, textarea) {
    copyTextToClipboard(e.innerText, textarea)
}
//Footer//////////////////////////////////////////////////////////////////////////////////////////////////
function addFooter() {
    let footer = document.querySelector('footer');
    showContact(footer);
}
//Not used//////////////////////////////////////////////////////////////////////////////////////////////////
function showWidthHeight() {
    valueWidth.disabled = false;
    valueHeight.disabled = false;
    editSize[0].style.display = 'none';
}
function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
        //if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
        if (/\s+/.test(match)) return "";
        return index == 0 ? match.toLowerCase() : match.toUpperCase();
    });
}
