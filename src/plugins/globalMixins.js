/**
 * You can register global mixins here
 */

const GlobalMixins = {
    install(app) {
        app.mixin({
            mounted() {
                let { bodyClass } = this.$options;
                if (bodyClass) {
                    document.body.classList.add(bodyClass);
                }
            },
            beforeUnmount() {
                let { bodyClass } = this.$options;
                if (bodyClass) {
                    document.body.classList.remove(bodyClass);
                }
            }
        });
    }
};

export default GlobalMixins;