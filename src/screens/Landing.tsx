import { useEffect, useState } from 'react';
import EELogo from '../assets/images/ee-logo.svg';
import { Operator, calculate } from '../helpers/calculate';
import { formattedToExponential } from '../helpers/formattedToExponential';

const maxDisplayLength = 10;

export const Landing = () => {
    const [displayResult, setDisplayResult] = useState('0');
    const [firstOperand, setFirstOperand] = useState<null | number>(null);
    const [operator, setOperator] = useState<null | Operator>(null);
    const [expectingSecondOperand, setExpectingSecondOperand] = useState(false);
    const [showEasterEgg, setShowEasterEgg] = useState(false);

    const handleDigit = (digit: string) => {
        if (expectingSecondOperand) {
            setDisplayResult(digit);
            setExpectingSecondOperand(false);
            return;
        }
        if (displayResult === '0') {
            setDisplayResult(digit);
            return;
        }
        if (displayResult.length >= maxDisplayLength) {
            return;
        }

        setDisplayResult(displayResult + digit);
    };

    const handleDecimal = () => {
        if (expectingSecondOperand || displayResult.length >= maxDisplayLength)
            return;

        if (!displayResult.includes('.')) {
            setDisplayResult(displayResult + '.');
        }
    };

    const handleClear = () => {
        setDisplayResult('0');
        setFirstOperand(null);
        setOperator(null);
        setExpectingSecondOperand(false);
    };

    const handleOperator = (newOperator: Operator) => {
        const inputNumericValue = parseFloat(displayResult);

        if (firstOperand === null) {
            setFirstOperand(inputNumericValue);
            setOperator(newOperator);
            setExpectingSecondOperand(true);
            return;
        }

        const result = calculate(
            firstOperand,
            inputNumericValue,
            operator,
            () => setShowEasterEgg(true)
        );
        setDisplayResult(result.toString());
        setFirstOperand(result);
        setOperator(newOperator);
        setExpectingSecondOperand(true);
    };

    const handleInvert = () => {
        setDisplayResult((parseFloat(displayResult) * -1).toString());
    };

    const handleConvertToPercentage = () => {
        setDisplayResult((parseFloat(displayResult) / 100).toString());
    };

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        if (showEasterEgg) {
            timeoutId = setTimeout(() => {
                setShowEasterEgg(false);
            }, 2000);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [showEasterEgg]);

    const formattedDisplayResult = formattedToExponential(displayResult);

    let resultClassName = 'result';
    if (formattedDisplayResult.length > 14) {
        resultClassName += ' result--smallest';
    } else if (formattedDisplayResult.length > 11) {
        resultClassName += ' result--smaller';
    }

    return (
        <>
            <main className="container">
                <div className="grid">
                    <div className="cell cell--quarter">
                        <img className="logo" src={EELogo} alt="EE Logo" />
                    </div>
                    <div className="cell cell--three-quarters u-position--relative">
                        <p
                            className={resultClassName}
                            data-testid="display-result"
                        >
                            {formattedDisplayResult}
                        </p>
                    </div>
                    <div className="cell cell--quarter">
                        <button
                            className="u-bgc--concrete"
                            onClick={handleClear}
                        >
                            AC
                        </button>
                    </div>
                    <div className="cell cell--quarter">
                        <button
                            className="u-bgc--concrete"
                            onClick={handleInvert}
                        >
                            +/-
                        </button>
                    </div>
                    <div className="cell cell--quarter">
                        <button
                            className="u-bgc--concrete"
                            onClick={handleConvertToPercentage}
                        >
                            %
                        </button>
                    </div>
                    <div className="cell cell--quarter">
                        <button
                            className="u-bgc--sky u-c--white"
                            onClick={() => handleOperator(Operator.divide)}
                        >
                            /
                        </button>
                    </div>
                    <div className="cell cell--quarter">
                        <button onClick={() => handleDigit('7')}>7</button>
                    </div>
                    <div className="cell cell--quarter">
                        <button onClick={() => handleDigit('8')}>8</button>
                    </div>
                    <div className="cell cell--quarter">
                        <button onClick={() => handleDigit('9')}>9</button>
                    </div>
                    <div className="cell cell--quarter">
                        <button
                            className="u-bgc--sky u-c--white"
                            onClick={() => handleOperator(Operator.multiply)}
                        >
                            x
                        </button>
                    </div>
                    <div className="cell cell--quarter">
                        <button onClick={() => handleDigit('4')}>4</button>
                    </div>
                    <div className="cell cell--quarter">
                        <button onClick={() => handleDigit('5')}>5</button>
                    </div>
                    <div className="cell cell--quarter">
                        <button onClick={() => handleDigit('6')}>6</button>
                    </div>
                    <div className="cell cell--quarter">
                        <button
                            className="u-bgc--sky u-c--white"
                            onClick={() => handleOperator(Operator.subtract)}
                        >
                            -
                        </button>
                    </div>
                    <div className="cell cell--quarter">
                        <button onClick={() => handleDigit('1')}>1</button>
                    </div>
                    <div className="cell cell--quarter">
                        <button onClick={() => handleDigit('2')}>2</button>
                    </div>
                    <div className="cell cell--quarter">
                        <button onClick={() => handleDigit('3')}>3</button>
                    </div>
                    <div className="cell cell--quarter">
                        <button
                            className="u-bgc--sky u-c--white"
                            onClick={() => handleOperator(Operator.add)}
                        >
                            +
                        </button>
                    </div>
                    <div className="cell cell--quarter">
                        <button onClick={() => handleDigit('0')}>0</button>
                    </div>
                    <div className="cell cell--quarter cell--col-start-3">
                        <button onClick={handleDecimal}>.</button>
                    </div>
                    <div className="cell cell--quarter">
                        <button
                            className="u-bgc--sky u-c--white"
                            onClick={() => handleOperator(Operator.equals)}
                        >
                            =
                        </button>
                    </div>
                </div>
            </main>
            {showEasterEgg && <div className="easter-egg" />}
        </>
    );
};
