// Import Tailwind CSS instead of Bootstrap
import '@/assets/css/tailwind.css';
import '@/assets/scss/now-ui-kit.scss';
import '@/assets/demo/demo.css';
import globalDirectives from './globalDirectives';
import globalMixins from './globalMixins';
import globalComponents from './globalComponents';
import { VueLazyloadNext } from 'vue-lazyload-next';

export default {
    install(app) {
        app.use(globalDirectives);
        app.use(globalMixins);
        app.use(globalComponents);
        app.use(VueLazyloadNext, {
            observer: true,
            // optional
            observerOptions: {
                rootMargin: '0px',
                threshold: 0.1
            }
        });
    }
};