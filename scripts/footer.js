function showContact(footer){
    footer.innerHTML='';
    footerContact();
}
function footerContact(){
    let contact=createEle(document.querySelector('footer'),'div','','contactInfo');
    /**mail address */
    let mail=createEle(contact,'span','','contactMail');
    let mailaddress=createEle(mail,'address','','');
    let mailLink=createEle(mailaddress,'a','© Dani Llobet 2019  - ','')
    mailLink.href="mailto:neollob@gmail.com";
    mailLink.title=appLngArr[0].Mail;
    /**Links */
    let linkContainer=createEle(contact,'div','','contactLinks');
    /**Linkedin */
    let aLinkedin=createEle(linkContainer,'a','','');
    aLinkedin.href="https://www.linkedin.com/in/daniel-llobet/";
    let imgLinkedin=createEle(aLinkedin,'img','','linkedin-logo lazy-load');
    imgLinkedin.setAttribute('data-src',"./assets/images/linkedin.png");
    imgLinkedin.src="./assets/logos/linkedin.png";
    imgLinkedin.alt="Linkedin";
    imgLinkedin.title=appLngArr[0].Linkedin;
    /**GitHub */
    let aGitHub=createEle(linkContainer,'a','','');
    aGitHub.href="https://github.com/neollob";
    let imgGitHub=createEle(aGitHub,'img','','github-logo lazy-load');
    imgGitHub.setAttribute('data-src',"./assets/images/GitHub.png");
    imgGitHub.src="./assets/logos/GitHub.png";
    imgGitHub.alt="GitHub";
    imgGitHub.title=appLngArr[0].GitHub;
    /**Codepen */
    let aCodepen=createEle(linkContainer,'a','','');
    aCodepen.href="https://codepen.io/neollob";
    let imgCodepen=createEle(aCodepen,'img','','codepen-logo lazy-load');
    imgCodepen.setAttribute('data-src',"./assets/images/Codepen.png");
    imgCodepen.src="./assets/logos/Codepen.png";
    imgCodepen.alt="Codepen";
    imgCodepen.title=appLngArr[0].Codepen;
    /**Stack Overflow */
    let aStackOverflow=createEle(linkContainer,'a','','');
    aStackOverflow.href="https://es.stackoverflow.com/users/127000/neollob";
    let imgStackOverflow=createEle(aStackOverflow,'img','','stackOverflow-logo lazy-load');
    imgStackOverflow.setAttribute('data-src',"./assets/images/StackOverflow.png");
    imgStackOverflow.src="./assets/logos/StackOverflow.png";
    imgStackOverflow.alt="Stack Overflow";
    imgStackOverflow.title=appLngArr[0].StackOverflow;
    
    return contact;
}

