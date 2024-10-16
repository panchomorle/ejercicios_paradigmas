export class Fraction {
    constructor(private numerator: number, private denominator = 1){
        if (denominator === 0){
            throw new Error("Denominator cannot be 0");
        }
    }

    get values(): [number, number]{
        return [this.numerator, this.denominator]
    }

    mcd(dividendo: number | null = null, divisor: number | null = null): number{
        if (dividendo === null || divisor === null){
            dividendo = Math.max(...this.values) //decomposing num array & getting max
            divisor = Math.min(...this.values) //decomposing num array & getting min
        };
        let remainder = dividendo%divisor;
        if (remainder === 0){
            return divisor; //returns the last remainder
        }
        return this.mcd(divisor, remainder)
    }

    simplify(): Fraction{
        const mcd = this.mcd()
        const new_numerator = this.numerator / mcd;
        const new_denominator = this.denominator / mcd;
        return new Fraction(new_numerator, new_denominator);
    }

    sum(other: Fraction | number): Fraction { //punto extra: que pueda recibir fraccion o number (Fraction | number) con un if typeOf
        if (typeof other === 'number'){
            other = new Fraction(other, 1);
        }
        const newDenominator = this.denominator * other.denominator;
        const newNominator = this.numerator * other.denominator + other.numerator * this.denominator;
        let f = new Fraction(newNominator, newDenominator)
        return f.simplify();
        
    }
    subtract(other: Fraction | number): Fraction {
        if (typeof other === 'number'){
            return this.sum(other*(-1));
        }
        return this.sum(other.negative());
    }

    multiply(other: Fraction | number): Fraction {
        if (typeof other === 'number'){
            other = new Fraction(other, 1);
        }
        const newDenominator = this.denominator * other.denominator;
        const newNominator = this.numerator * other.numerator;
        let f = new Fraction(newNominator, newDenominator)
        return f.simplify();
    }
    divide(other: Fraction | number): Fraction {
        if (typeof other === 'number'){
            return this.multiply(new Fraction(1, other));
        }
        return this.multiply(other.inverse())
    }
    negative(): Fraction {
        const newNominator = -this.numerator;
        return new Fraction(newNominator, this.denominator);
    }

    inverse(): Fraction {
        //[this.denominator, this.numerator] = [this.numerator, this.denominator];
        return new Fraction(this.denominator, this.numerator);
    }

    isEqual(other: Fraction | number): boolean {
        if(typeof other === 'number'){
            other = new Fraction(other, 1);
        }
        return (this.simplify().numerator === other.simplify().numerator) && (this.simplify().denominator === other.simplify().denominator);
    }
    toString(): string {
        return `${this.numerator}/${this.denominator}`; //alt+96 for the backtick
    }

}