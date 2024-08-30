export interface Salario {
    calcular(cantHoras: number);
}

export class SalarioHora implements Salario{
    constructor(private tarifa: number){
    }
    
    calcular(cantHoras: number) {
        return cantHoras*this.tarifa;
    }
}

export class SalarioMes implements Salario{
    constructor(private sueldoFijo: number){
    }
    
    calcular(cantHoras: number) {
        return this.sueldoFijo;
    }
}