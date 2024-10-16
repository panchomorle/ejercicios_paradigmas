import { Salario } from "./ISalario";

export class SalarioMes implements Salario{
    constructor(private sueldoFijo: number){
    }
    
    calcular(cantHoras: number) {
        return this.sueldoFijo;
    }
}