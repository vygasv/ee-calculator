import { formattedToExponential } from './formattedToExponential';

describe('formattedToExponential', () => {
    it('should return the input value as a string if it has less than 11 digits', () => {
        expect(formattedToExponential('123')).toBe('123');
    });

    it('should return the input value in scientific notation if it has 11 or more digits', () => {
        expect(formattedToExponential('12345678901')).toBe('1.2345678901e10');
    });

    it('should truncate the coefficient to 12 characters and the exponent to 4 characters', () => {
        expect(formattedToExponential('1234567890123')).toBe('1.2345678901e12');
    });

    it('should handle negative numbers correctly', () => {
        expect(formattedToExponential('-1234567890123')).toBe(
            '-1.234567890e12'
        );
    });
});
