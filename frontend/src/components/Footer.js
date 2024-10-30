import '../styles/footer.css';
import { renderLogin } from '../pages/Login';

export function renderFooter() {
    const footer = document.getElementById('footer');
    footer.innerHTML = `
        <footer class="bg-gray-800 text-white py-8">
            <div class="container mx-auto px-4">
                <div class="flex flex-wrap justify-between">
                    <div class="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 class="text-2xl font-bold mb-4">WordWise</h3>
                        <p class="text-gray-400">Empowering language learners worldwide through innovative and engaging educational tools.</p>
                    </div>
                    <div class="w-full md:w-1/3 mb-6 md:mb-0">
                        <h4 class="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul class="space-y-2">
                            <li><a href="/" class="text-gray-400 hover:text-white transition-colors duration-300">Home</a></li>
                            <li><a href="/about" class="text-gray-400 hover:text-white transition-colors duration-300">About</a></li>
                            <li><a href="/blogs" class="text-gray-400 hover:text-white transition-colors duration-300">Blog</a></li>
                            <li><a href="/contact" class="text-gray-400 hover:text-white transition-colors duration-300">Contact</a></li>
                        </ul>
                    </div>
                    <div class="w-full md:w-1/3">
                        <h4 class="text-lg font-semibold mb-4">Connect With Us</h4>
                        <div class="flex space-x-4 justify-center mb-4">
                            <!-- Social icons -->
                            <a href="#" class="text-gray-400 hover:text-white transition-colors duration-300">
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <!-- Facebook Icon -->
                                    <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.81v-9.294H9.692v-3.622h3.118V8.413c0-3.1 1.892-4.789 4.659-4.789 1.325 0 2.462.098 2.794.143v3.24h-1.918c-1.504 0-1.796.715-1.796 1.763v2.311h3.591l-.467 3.622h-3.124V24h6.125C23.407 24 24 23.407 24 22.675V1.325C24 .593 23.407 0 22.675 0z"/>
                                </svg>
                            </a>
                            <a href="#" class="text-gray-400 hover:text-white transition-colors duration-300">
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <!-- Twitter Icon -->
                                    <path d="M23.643 4.937c-.835.37-1.732.62-2.675.732 0.962-.576 1.7-1.49 2.048-2.578-.901.532-1.896.92-2.958 1.13-.851-.906-2.062-1.472-3.407-1.472-2.578 0-4.668 2.092-4.668 4.668 0 .366.042.724.12 1.067C7.728 8.091 4.1 6.13 1.671 3.149c-.403.69-.633 1.49-.633 2.35 0 1.62.826 3.048 2.081 3.886-.767-.024-1.486-.235-2.117-.588v.06c0 2.265 1.612 4.156 3.751 4.585-.393.106-.807.163-1.235.163-.302 0-.595-.03-.882-.084.595 1.858 2.32 3.21 4.362 3.25-1.6 1.254-3.62 2.002-5.815 2.002-.378 0-.752-.022-1.12-.066 2.074 1.33 4.54 2.107 7.19 2.107 8.63 0 13.348-7.147 13.348-13.347 0-.202 0-.406-.014-.607.916-.66 1.707-1.49 2.338-2.435z"/>
                                </svg>
                            </a>
                            <a href="https://github.com/ANSHIKA-26/WordWise" class="text-gray-400 hover:text-white transition-colors duration-300">
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <!-- GitHub Icon -->
                                    <path d="M12 .297C5.373.297 0 5.67 0 12.297c0 5.305 3.438 9.8 8.205 11.387.6.11.82-.26.82-.577v-2.17c-3.338.726-4.042-1.415-4.042-1.415-.547-1.387-1.335-1.757-1.335-1.757-1.09-.744.083-.729.083-.729 1.205.085 1.838 1.237 1.838 1.237 1.07 1.834 2.81 1.304 3.495.997.107-.774.418-1.304.762-1.604-2.665-.303-5.467-1.332-5.467-5.93 0-1.31.469-2.383 1.237-3.222-.124-.304-.536-1.527.118-3.18 0 0 1.008-.322 3.302 1.23a11.499 11.499 0 013.005-.404c1.02.005 2.046.138 3.005.404 2.292-1.552 3.297-1.23 3.297-1.23.655 1.653.243 2.876.12 3.18.77.839 1.237 1.913 1.237 3.222 0 4.61-2.806 5.624-5.478 5.92.43.37.812 1.102.812 2.222v3.293c0 .318.217.694.824.576 4.765-1.59 8.199-6.084 8.199-11.388C24 5.67 18.627.297 12 .297z"/>
                                </svg>
                            </a>
                        </div>
                        <div id="login-container" class="flex justify-center items-center"></div> 
                    </div>
                </div>
                <div class="mt-8 border-t border-gray-700 pt-8 text-center">
                    <p class="text-gray-400">&copy; ${new Date().getFullYear()} WordWise. All rights reserved.</p>
                    <p class="text-gray-400 mt-2">An open-source project dedicated to language learning.</p>
                </div>
            </div>
        </footer>
    `;

    // Now, call renderLogin to render login UI inside the div with id 'login-container'
    const loginContainer = document.getElementById('login-container');
    renderLogin(loginContainer);
}
