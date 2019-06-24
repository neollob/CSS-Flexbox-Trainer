function showContact(footer) {
    footer.innerHTML = '';
    footerContact();
}
function link(father, href, name, image) {
    let aLink = createEle(father, 'a', '', '');
    aLink.href = href;
    let imgLink = createEle(aLink, 'img', '', `${name.replace(/ /g, '').toLowerCase()}-logo lazy-load`);
    imgLink.setAttribute('data-src', `./assets/images/${image}`);
    imgLink.src = `./assets/logos/${image}`;
    imgLink.alt = name;
    return imgLink;
}
function footerContact() {
    let contact = createEle(document.querySelector('footer'), 'div', '', 'contactInfo');
    /**mail address */
    let mail = createEle(contact, 'span', '', 'contactMail');
    let mailaddress = createEle(mail, 'address', '', '');
    let mailLink = createEle(mailaddress, 'a', '© Dani Llobet 2019  - ', '')
    mailLink.href = "mailto:neollob@gmail.com";
    mailLink.title = appLngArr[0].Mail;
    /**Links */
    let linkContainer = createEle(contact, 'div', '', 'contactLinks');
    /**Linkedin */
    link(linkContainer, 'https://www.linkedin.com/in/daniel-llobet/', 'Linkedin', 'linkedin.png').title = appLngArr[0].Linkedin;;
    /**GitHub */
    link(linkContainer, 'https://github.com/neollob', 'GitHub', 'GitHub.png').title = appLngArr[0].GitHub;;
    /**Codepen */
    link(linkContainer, 'https://codepen.io/neollob', 'Codepen', 'Codepen.png').title = appLngArr[0].Codepen;;
    /**Stack Overflow */
    link(linkContainer, 'https://es.stackoverflow.com/users/127000/neollob', 'Stack Overflow', 'StackOverflow.png').title = appLngArr[0].StackOverflow;;
    return contact;
}

