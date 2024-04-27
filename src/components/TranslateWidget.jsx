import React, { useEffect } from 'react';

const TranslateWidget = () => {
    useEffect(() => {
        // Load Google Translate script
        const script = document.createElement("script");
        script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);

        // Initialize Google Translate function
        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
        }

        return () => {
            // Clean up function to remove script
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div id="google_translate_element"></div>
    );
}

export default TranslateWidget;
