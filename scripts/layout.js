function header() {
    let header=document.querySelector('header');
    createEle(header, 'h1', `Flex<span>Box</span> <small>trainer</small>`, '');
}
function main(){
    let main=document.querySelector('main');
    let workSpace=createEle(main, 'section', ``, 'workSpace');
    let container=createEle(workSpace, 'section', ``, 'container');
    let flexContainer=createEle(container, 'div', ``, 'flexContainer fadeInHalf');
    flexContainer.id='flexContainer';
    let properties=createEle(container, 'div', ``, 'properties fadeInHalf');
    properties.id='properties';
}
function layout() {
    header();
    main();
}