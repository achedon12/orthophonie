'use client';
import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

const Matomo = () => {
    const location = useLocation();

    useEffect(() => {
        if (import.meta.env.VITE_APP_ENV !== 'production' && import.meta.env.VITE_APP_ENV !== 'prod') return;

        const u = '//matomo.leoderoin.fr/';

        if (!window._paq) {
            window._paq = [];
            window._paq.push(['setTrackerUrl', u + 'matomo.php']);
            window._paq.push(['setSiteId', '4']);
            window._paq.push(['enableLinkTracking']);

            const s = document.createElement('script');
            s.async = true;
            s.src = u + 'matomo.js';
            document.head.appendChild(s);
        }
    }, []);

    useEffect(() => {
        if (import.meta.env.VITE_APP_ENV !== 'production' && import.meta.env.VITE_APP_ENV !== 'prod') return;

        if (window._paq) {
            window._paq.push(['trackPageView']);
        }
    }, [location]);

    return null;
}

export default Matomo;