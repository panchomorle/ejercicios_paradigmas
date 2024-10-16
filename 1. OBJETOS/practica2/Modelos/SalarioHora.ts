import { Salario } from "./ISalario";

export class SalarioHora implements Salario{
    constructor(private tarifa: number){
    }
    
    calcular(cantHoras: number) {
        return cantHoras*this.tarifa;
    }
}