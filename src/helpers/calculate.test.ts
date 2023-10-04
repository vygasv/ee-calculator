import { Operator, calculate } from './calculate';

describe('calculate', () => {
    it('should add two numbers', () => {
        const result = calculate(1, 2, Operator.add, jest.fn);
        expect(result).toBe(3);
    });
    it('should subtract two numbers', () => {
        const result = calculate(3, 2, Operator.subtract, jest.fn);
        expect(result).toBe(1);
    });
    it('should multiply two numbers', () => {
        const result = calculate(3, 2, Operator.multiply, jest.fn);
        expect(result).toBe(6);
    });
    it('should divide two numbers', () => {
        const result = calculate(6, 2, Operator.divide, jest.fn);
        expect(result).toBe(3);
    });
    it('should not break and return 0 if second division operand is 0', () => {
        const result = calculate(6, 0, Operator.divide, jest.fn);
        expect(result).toBe(0);
    });
    it('should return second operand if operator is null', () => {
        const result = calculate(6, 2, null, jest.fn);
        expect(result).toBe(2);
    });
});
