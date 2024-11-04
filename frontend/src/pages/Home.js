export function renderHome(container) {
    container.innerHTML = `
        <section class="container mx-auto px-8 py-36 text-center sm:px-12">
            <h1 class="mb-12 text-5xl font-extrabold leading-tight text-gray-900 dark:text-white sm:text-6xl" data-aos="zoom-in">
                Share Your Story with the World
            </h1>
            <p class="mb-12 leading-relaxed text-gray-700 dark:text-gray-300" data-aos="fade-up" data-aos-delay="100">
                WordWise offers a platform for passionate writers to express their ideas and connect with readers worldwide. 
                Start your blogging journey today and join our community of creative minds.
            </p>
            <div class="mx-auto flex w-fit flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4" data-aos="fade-up" data-aos-delay="200">
                <button
                    class="rounded-md border-0 bg-violet-500 px-12 py-2 text-base text-white shadow-lg shadow-violet-300 transition hover:bg-violet-600 hover:shadow-violet-400 dark:shadow-violet-900/30"
                    onclick="window.location.href='/add-blog'"
                >
                    Start Writing
                </button>
                <button
                    class="rounded-md border-0 bg-gray-100 px-12 py-2 text-base text-gray-900 shadow-lg shadow-gray-200 transition hover:bg-white hover:shadow-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:shadow-gray-800/30 dark:hover:bg-gray-600"
                    onclick="window.location.href='/blogs'"
                >
                    Explore Blogs
                </button>
            </div>
        </section>
    `;
}
