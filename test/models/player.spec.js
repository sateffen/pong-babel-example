/* global describe, it, expect, beforeEach, spyOn */

import Player from 'models/player';
import _ from 'libs/underscore';

describe('models/player', () => {
    let testInstance;
    
    beforeEach(() => {
        testInstance = new Player(10, 20, 30, 40);
    });
    
    it('should work to use "instanceof" with the class', () => {
        expect(testInstance instanceof Player).toBeTruthy();
    });
    
    it('should have a render function', () => {
        expect(typeof testInstance.render).toBe('function');
    });
    
    it('should have a "color" property', () => {
        expect(_.has(testInstance, 'color')).toBeTruthy();
    });
    
    it('should have a "speed" property', () => {
        expect(_.has(testInstance, 'speed')).toBeTruthy();
    });
    
    it('should have a "direction" property', () => {
        expect(_.has(testInstance, 'direction')).toBeTruthy();
    });
    
    it('should have a "x" property', () => {
        expect(_.has(testInstance, 'x')).toBeTruthy();
        expect(testInstance.x).toBe(10);
    });
    
    it('should have a "y" property', () => {
        expect(_.has(testInstance, 'y')).toBeTruthy();
        expect(testInstance.y).toBe(20);
    });
    
    it('should have a "width" property', () => {
        expect(_.has(testInstance, 'width')).toBeTruthy();
        expect(testInstance.width).toBe(30);
    });
    
    it('should have a "height" property', () => {
        expect(_.has(testInstance, 'height')).toBeTruthy();
        expect(testInstance.height).toBe(40);
    });
    
    it('should draw a correct circle', () => {
        let ctx = {
            fillStyle: undefined,
            fillRect: () => {
                // noting
            }
        };
        
        testInstance.color = '#ff00ff';
        spyOn(ctx, 'fillRect');
        
        testInstance.render(ctx);
        
        expect(ctx.fillStyle).toBe(testInstance.color);
        
        expect(ctx.fillRect).toHaveBeenCalled();
        expect(ctx.fillRect).toHaveBeenCalledWith(10, 20, 30, 40);
    });
    
    it('should do nothing when called without a ctx', () => {
        let ctx = {
            fillStyle: undefined,
            fillRect: () => {
                // noting
            }
        };
        
        testInstance.color = '#ff00ff';
        spyOn(ctx, 'fillRect');
        
        testInstance.render();
        
        expect(ctx.fillStyle).not.toBe(testInstance.color);
        
        expect(ctx.fillRect).not.toHaveBeenCalled();
    });
});