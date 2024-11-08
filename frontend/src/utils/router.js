import { renderHome } from '../pages/Home.js';
import { renderBlogs } from '../pages/Blogs.js';
import { renderAddBlog } from '../pages/AddBlog.js';
import { renderCategories } from '../pages/Categories.js';
import { renderAbout } from '../pages/About.js';
import { renderContact } from '../pages/Contact.js';
import { renderFeedback } from '../pages/Feedback.js';
import { renderProfilePage } from '../pages/BloggerProfile.js';
import { renderFullBlogPost } from '../pages/ReadMoreBlog.js';
import { renderTermsOfUse } from '../pages/TermsOfUse.js';
import { renderDiscussionForum } from '../pages/DiscussionForum.js';

const routes = {
    '/': renderHome,
    '/blogs': renderBlogs,
    '/add-blog': renderAddBlog,
    '/categories': renderCategories,
    '/about': renderAbout,
    '/contact': renderContact,
    '/feedback': renderFeedback,
    '/profile': renderProfilePage,
    '/discussion': renderDiscussionForum,
    '/readmore': renderFullBlogPost,
    '/termsOfUse': renderTermsOfUse,
};

export function router() {
    const path = window.location.pathname;
    const renderFunction = routes[path] || renderHome;
    const content = document.getElementById('content');
    content.innerHTML = '';
    renderFunction(content);
}

document.addEventListener('click', e => {
    if (e.target.matches('[data-link]')) {
        e.preventDefault();
        history.pushState(null, null, e.target.href);
        router();
    }
});
