export enum Operator {
    'add',
    'subtract',
    'multiply',
    'divide',
    'equals',
}

export const calculate = (
    firstOperand: number,
    secondOperand: number,
    operator: Operator | null,
    divisionByZeroCallback: () => void
) => {
    switch (operator) {
        case Operator.add:
            return firstOperand + secondOperand;
        case Operator.subtract:
            return firstOperand - secondOperand;
        case Operator.multiply:
            return firstOperand * secondOperand;
        case Operator.divide:
            if (secondOperand === 0) {
                divisionByZeroCallback();
                return 0;
            }
            return firstOperand / secondOperand;
        default:
            return secondOperand;
    }
};
