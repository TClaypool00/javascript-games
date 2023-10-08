function createNavBar() {
    const appName = 'JavaScript Games'
    const pages = ['index'];

    const navbar = document.createElement('nav');
    navbar.classList.add('navbar');

    const navUL = document.createElement('ul');
    navbar.appendChild(navUL);

    for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        let url = '';

        if (page.indexOf(' ') > 0) {
            url = page.replace(' ', '-');
        } else {
            url = page;
        }

        url = url + '.html';
        
        const li = document.createElement('li');
        navUL.appendChild(li);

        const href = document.createElement('a');

        href.innerHTML = page;
        href.href = url;

        if (window.location.href.indexOf(url) > 0) {
            href.classList.add('active');
            document.title = `${page} - ${appName}`;
        }

        li.appendChild(href);
    }

    document.body.insertBefore(navbar, document.body.firstChild);
}