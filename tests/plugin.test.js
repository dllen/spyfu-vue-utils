import { createLocalVue } from '@vue/test-utils';
import { SpyfuVueUtils } from '../src/index';

describe('plugin', () => {
    it('$bindExternalEvent', done => {
        const Vue = createLocalVue();

        const ease = jest.fn();
        const interval = jest.fn();
        const listener = jest.fn();
        const timeout = jest.fn();

        Vue.use(SpyfuVueUtils);
        
        new Vue({
            created() {
                this.$bindExternalEvent(document.body, 'click', listener);
                this.$ease(ease, 50);
                this.$interval(interval, 50);
                this.$timeout(timeout, 50);
            },
        });

        document.body.dispatchEvent(new Event('click'));

        setTimeout(() => {
            expect(ease).toBeCalled();
            expect(interval).toBeCalled();
            expect(listener).toBeCalled();
            expect(timeout).toBeCalled();
            done();
        }, 100);
    });
});
