import { renderNavbar } from './components/Navbar.js';
import { renderFooter } from './components/Footer.js';
import { router } from './utils/router.js';

document.addEventListener('DOMContentLoaded', () => {
    renderNavbar();
    renderFooter();
    router();
});

window.addEventListener('popstate', router);
