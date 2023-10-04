import { fireEvent, render, screen } from '@testing-library/react';
import { Landing } from './Landing';

describe('Landing', () => {
    it('should display expected concatinated number', () => {
        render(<Landing />);
        const displayResult = screen.getByTestId('display-result');
        expect(displayResult).toHaveTextContent('0');
        fireEvent.click(screen.getByRole('button', { name: '1' }));
        expect(displayResult).toHaveTextContent('1');
        fireEvent.click(screen.getByRole('button', { name: '2' }));
        expect(displayResult).toHaveTextContent('12');
        fireEvent.click(screen.getByRole('button', { name: '3' }));
        expect(displayResult).toHaveTextContent('123');
        fireEvent.click(screen.getByRole('button', { name: '4' }));
        expect(displayResult).toHaveTextContent('1234');
        fireEvent.click(screen.getByRole('button', { name: '5' }));
        expect(displayResult).toHaveTextContent('12345');
        fireEvent.click(screen.getByRole('button', { name: '6' }));
        expect(displayResult).toHaveTextContent('123456');
        fireEvent.click(screen.getByRole('button', { name: '7' }));
        expect(displayResult).toHaveTextContent('1234567');
        fireEvent.click(screen.getByRole('button', { name: '8' }));
        expect(displayResult).toHaveTextContent('12345678');
        fireEvent.click(screen.getByRole('button', { name: '9' }));
        expect(displayResult).toHaveTextContent('123456789');
        fireEvent.click(screen.getByRole('button', { name: '0' }));
        expect(displayResult).toHaveTextContent('1234567890');
    });
    it('should display expected number with a single dot', () => {
        render(<Landing />);
        const displayResult = screen.getByTestId('display-result');
        expect(displayResult).toHaveTextContent('0');
        fireEvent.click(screen.getByRole('button', { name: '1' }));
        expect(displayResult).toHaveTextContent('1');
        fireEvent.click(screen.getByRole('button', { name: '.' }));
        expect(displayResult).toHaveTextContent('1.');
        fireEvent.click(screen.getByRole('button', { name: '.' }));
        fireEvent.click(screen.getByRole('button', { name: '2' }));
        expect(displayResult).toHaveTextContent('1.2');
    });

    it('should reset display when AC is clicked', () => {
        render(<Landing />);
        const displayResult = screen.getByTestId('display-result');
        expect(displayResult).toHaveTextContent('0');
        fireEvent.click(screen.getByRole('button', { name: '1' }));
        expect(displayResult).toHaveTextContent('1');
        fireEvent.click(screen.getByRole('button', { name: 'AC' }));
        expect(displayResult).toHaveTextContent('0');
    });

    it('should perform addition when the + button is clicked', () => {
        render(<Landing />);
        const displayResult = screen.getByTestId('display-result');
        fireEvent.click(screen.getByRole('button', { name: '2' }));
        fireEvent.click(screen.getByRole('button', { name: '+' }));
        fireEvent.click(screen.getByRole('button', { name: '3' }));
        fireEvent.click(screen.getByRole('button', { name: '=' }));
        expect(displayResult).toHaveTextContent('5');
    });

    it('should perform subtraction when the - button is clicked', () => {
        render(<Landing />);
        const displayResult = screen.getByTestId('display-result');
        fireEvent.click(screen.getByRole('button', { name: '5' }));
        fireEvent.click(screen.getByRole('button', { name: '-' }));
        fireEvent.click(screen.getByRole('button', { name: '3' }));
        fireEvent.click(screen.getByRole('button', { name: '=' }));
        expect(displayResult).toHaveTextContent('2');
    });

    it('should perform multiplication when the * button is clicked', () => {
        render(<Landing />);
        const displayResult = screen.getByTestId('display-result');
        fireEvent.click(screen.getByRole('button', { name: '2' }));
        fireEvent.click(screen.getByRole('button', { name: 'x' }));
        fireEvent.click(screen.getByRole('button', { name: '3' }));
        fireEvent.click(screen.getByRole('button', { name: '=' }));
        expect(displayResult).toHaveTextContent('6');
    });

    it('should perform division when the / button is clicked', () => {
        render(<Landing />);
        const displayResult = screen.getByTestId('display-result');
        fireEvent.click(screen.getByRole('button', { name: '6' }));
        fireEvent.click(screen.getByRole('button', { name: '/' }));
        fireEvent.click(screen.getByRole('button', { name: '3' }));
        fireEvent.click(screen.getByRole('button', { name: '=' }));
        expect(displayResult).toHaveTextContent('2');
    });

    it('should handle decimal points correctly', () => {
        render(<Landing />);
        const displayResult = screen.getByTestId('display-result');
        fireEvent.click(screen.getByRole('button', { name: '1' }));
        fireEvent.click(screen.getByRole('button', { name: '.' }));
        fireEvent.click(screen.getByRole('button', { name: '2' }));
        fireEvent.click(screen.getByRole('button', { name: '+' }));
        fireEvent.click(screen.getByRole('button', { name: '3' }));
        fireEvent.click(screen.getByRole('button', { name: '.' }));
        fireEvent.click(screen.getByRole('button', { name: '4' }));
        fireEvent.click(screen.getByRole('button', { name: '=' }));
        expect(displayResult).toHaveTextContent('4.6');
    });

    it('should handle negative numbers correctly', () => {
        render(<Landing />);
        const displayResult = screen.getByTestId('display-result');
        fireEvent.click(screen.getByRole('button', { name: '1' }));
        fireEvent.click(screen.getByRole('button', { name: '0' }));
        fireEvent.click(screen.getByRole('button', { name: '+' }));
        fireEvent.click(screen.getByRole('button', { name: '2' }));
        fireEvent.click(screen.getByRole('button', { name: '0' }));
        fireEvent.click(screen.getByRole('button', { name: '+/-' }));
        fireEvent.click(screen.getByRole('button', { name: '=' }));
        expect(displayResult).toHaveTextContent('-10');
    });

    it('should handle percentages correctly', () => {
        render(<Landing />);
        const displayResult = screen.getByTestId('display-result');
        fireEvent.click(screen.getByRole('button', { name: '5' }));
        fireEvent.click(screen.getByRole('button', { name: '0' }));
        fireEvent.click(screen.getByRole('button', { name: '%' }));
        expect(displayResult).toHaveTextContent('0.5');
    });

    it('should handle division by zero correctly', () => {
        render(<Landing />);
        const displayResult = screen.getByTestId('display-result');
        fireEvent.click(screen.getByRole('button', { name: '1' }));
        fireEvent.click(screen.getByRole('button', { name: '/' }));
        fireEvent.click(screen.getByRole('button', { name: '0' }));
        fireEvent.click(screen.getByRole('button', { name: '=' }));
        expect(displayResult).toHaveTextContent('0');
    });
});
