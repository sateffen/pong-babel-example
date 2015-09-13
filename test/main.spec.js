/* global describe, it, expect, jasmine, spyOn, beforeEach */
// import the module to test as injector
import moduleInjector from 'inject!main';

describe('main', () => {
    // setup the mock variables
    let rendererInstance;
    let mocks;

    // before each test, refresh the mocks and reinstanciate the module
    beforeEach(() => {
        // reset the mocks
        mocks = {
            'controller/renderer': () => {
                return rendererInstance;
            }
        };
        rendererInstance = {
            start: () => {
                // nothing
            },
            appendToElement: () => {
                // noting
            }
        };
        
        // setup the spies
        spyOn(mocks, 'controller/renderer').and.callThrough();
        spyOn(rendererInstance, 'appendToElement');
        spyOn(rendererInstance, 'start');
        
        // and restart the module
        moduleInjector(mocks);
    });

    it('should have created an instance of the renderer', () => {
        expect(mocks['controller/renderer']).toHaveBeenCalled();
    });

    it('should call the appendToElement function once with the body element as parameter', () => {
        expect(rendererInstance.appendToElement).toHaveBeenCalled();
        expect(rendererInstance.appendToElement).toHaveBeenCalledWith(document.body);
        expect(rendererInstance.appendToElement.calls.count()).toBe(1);
    });

    it('should call the start function once without parameters', () => {
        expect(rendererInstance.start).toHaveBeenCalled();
        expect(rendererInstance.start).toHaveBeenCalledWith();
        expect(rendererInstance.start.calls.count()).toBe(1);
    });
});