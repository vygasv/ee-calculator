export const formattedToExponential = (value: string): string => {
    if (value.length >= 11) {
        const floatValue = parseFloat(value);
        const scientificNotation = floatValue.toExponential();
        const [coefficient, exponent] = scientificNotation.split('e');
        const truncatedCoefficient = coefficient.slice(0, 12);
        const truncatedExponent = parseInt(exponent).toString().slice(0, 4);
        return `${truncatedCoefficient}e${truncatedExponent}`;
    } else {
        return value;
    }
};
