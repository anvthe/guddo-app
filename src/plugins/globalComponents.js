import { Parallax } from '../components';

/**
 * You can register global components here
 */

const globalComponents = {
    install(app) {
        app.component(Parallax.name, Parallax);
    }
};

export default globalComponents;