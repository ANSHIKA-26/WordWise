import { renderNavbar } from './components/Navbar.js';
import { renderFooter } from './components/Footer.js';
import { router } from './utils/router.js';
import 'toastr/build/toastr.min.css';

document.addEventListener('DOMContentLoaded', () => {
    renderNavbar();
    renderFooter();
    router();
});

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

window.addEventListener('popstate', router);
