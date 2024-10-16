//const Fraccion = require('./Fraction.ts'); // import using CommonJS
import { Fraction } from "./Fraction"

describe('Fraction', () => {
    const f = new Fraction(-108, -80);
    const s = new Fraction(27, 20);

    it('adds 108/80 and 27/20', () => {
      expect(f.sum(s).toString()).toBe("27/10");
    });

    it('adds an integer to a fraction', () => {
      expect(s.sum(1).toString()).toBe("47/20");
      expect(s.sum(5).toString()).toBe("127/20");
    });

    it('subtracts 108/80 and 8', () => {
      expect(f.subtract(8).toString()).toBe("-133/20");
    });

    it('multiplies 108/80 and 27/20', () => {
      expect(f.multiply(s).toString()).toBe("729/400");
    });

    it('divides 108/80 over 18', () => {
      expect(f.divide(18).toString()).toBe("3/40");
    });
  
    it('finds the inverse of 27/20', () => {
      expect(s.inverse().toString()).toBe("20/27");
    });
  
    it('checks equality between 108/80 and 27/20', () => {
      expect(f.isEqual(s)).toBe(true);
    });
  
  });
  


