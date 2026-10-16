/* jshint -W097 */
/* jshint strict: false */
/* jslint node: true */
/* jshint expr: true */
const expect = require('chai').expect;
const {normalizeNumberValue} = require('../lib/tools.js');

describe('Test normalizeNumberValue', () => {
    it('keeps a value inside min/max', () => {
        expect(normalizeNumberValue(5, 0, 15)).to.deep.equal({value: 5});
        expect(normalizeNumberValue(0, 0, 15)).to.deep.equal({value: 0});
        expect(normalizeNumberValue(15, 0, 15)).to.deep.equal({value: 15});
    });

    it('keeps a value when no min/max is defined', () => {
        expect(normalizeNumberValue(-5)).to.deep.equal({value: -5});
        expect(normalizeNumberValue(-5, undefined, 10)).to.deep.equal({value: -5});
        expect(normalizeNumberValue(500, 0)).to.deep.equal({value: 500});
    });

    it('keeps non numeric values untouched', () => {
        expect(normalizeNumberValue(null, 0, 15)).to.deep.equal({value: null});
        expect(normalizeNumberValue(NaN, 0, 15).value).to.be.NaN;
    });

    it('converts a brightness sent as signed 16 bit back to unsigned', () => {
        // homee reported -24544 for a brightness attribute with min 0 / max 65000 (40992 lx)
        expect(normalizeNumberValue(-24544, 0, 65000)).to.deep.equal({value: 40992, reason: 'uint16'});
        expect(normalizeNumberValue(-32768, 0, 65000)).to.deep.equal({value: 32768, reason: 'uint16'});
    });

    it('sets an out of range value to null', () => {
        // UV sensor without a reading reports -1 for min 0 / max 15
        expect(normalizeNumberValue(-1, 0, 15)).to.deep.equal({value: null, reason: 'outOfRange'});
        expect(normalizeNumberValue(16, 0, 15)).to.deep.equal({value: null, reason: 'outOfRange'});
        // below the signed 16 bit range: no wrap, just out of range
        expect(normalizeNumberValue(-40000, 0, 65000)).to.deep.equal({value: null, reason: 'outOfRange'});
        // the unsigned value would exceed max
        expect(normalizeNumberValue(-100, 0, 65000)).to.deep.equal({value: null, reason: 'outOfRange'});
        // negative minimum: no wrap
        expect(normalizeNumberValue(-24544, -10, 65000)).to.deep.equal({value: null, reason: 'outOfRange'});
    });
});
