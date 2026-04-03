import { useEffect } from 'react'

const Matomo = () => {
    useEffect(() => {
        // Charger Matomo seulement en production
        if (import.meta.env.VITE_APP_ENV === 'production') {
            var _paq = window._paq = window._paq || [];
            /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
            _paq.push(['trackPageView']);
            _paq.push(['enableLinkTracking']);
            (function() {
                var u="//matomo.leoderoin.fr/";
                _paq.push(['setTrackerUrl', u+'matomo.php']);
                _paq.push(['setSiteId', '4']);
                var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
            })();
        }
    }, [])

    return null
}

export default Matomo

