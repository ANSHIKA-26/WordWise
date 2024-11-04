export function renderTranslator(container) {
    const loadGoogleTranslateScript = () => {
        if (!document.getElementById('google_translate_script')) {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateInit';
            script.id = 'google_translate_script';
            script.onerror = () => console.error('Error loading Google Translate script');
            document.body.appendChild(script);
        }
    };

    const cleanUpGadgetText = () => {
        const gadgetElement = document.querySelector('.goog-te-gadget');
        if (gadgetElement) {
            const textNodes = gadgetElement.childNodes;
            textNodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE) {
                    node.textContent = ''; // Clear text content
                }
            });
        }
    };

    window.googleTranslateInit = () => {
        if (!window.google?.translate?.TranslateElement) {
            setTimeout(window.googleTranslateInit, 100);
        } else {
            new window.google.translate.TranslateElement(
                {
                    pageLanguage: 'en',
                    includedLanguages: 'en,hi,pa,sa,mr,ur,bn,es,ja,ko,zh-CN,es,nl,fr,de,it,ta,te,gu',
                    layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
                    defaultLanguage: 'en',
                    autoDisplay: false,
                },
                container
            );
        }
        cleanUpGadgetText();
    };

    loadGoogleTranslateScript();

    if (window.google && window.google.translate) {
        window.googleTranslateInit();
    }

    // Add custom styles
    const style = document.createElement('style');
    style.innerHTML = `
      .goog-te-combo {
        background-color: #272d39;
        border-radius: 0.4rem;
        padding: 0.5rem;
        font-size: 0.8rem !important;
        transition: all 0.3s ease-in-out;
        outline: none;
        font-weight: 400;
        cursor: pointer;
        text-align: center;
        color: #fff;
      }
      .goog-te-combo:hover {
        background-color: #272d31;
        border-color: #0056b3;
        color: #eee;
        transform: scale(1.02);
      }
      .goog-logo-link {
        display: none !important;
      }
      .goog-te-gadget {
        color: transparent !important;
      }
      .goog-te-gadget > span > a {
        display: none !important;
      }
      .goog-te-banner-frame {
        display: none !important;
      }
      .goog-te-menu-frame {
        max-height: 400px !important;
        overflow-y: auto !important;
        background-color: #ffffff;
        border: 2px solid #007bff;
        border-radius: 0.75rem;
        box-shadow: 0 4px 8px rgba(0, 123, 255, 0.1);
      }
      .skiptranslate > iframe {
        height: 0 !important;
        border-style: none;
        box-shadow: none;
      }
    `;
    document.head.appendChild(style);
}
