import { Salario } from "./ISalario"

export class Empleado{
    constructor(private nombre: string, private salario: Salario, private horas: number){
    }

    get getHoras(){
        return this.horas;
    }
    get getSalario(){
        return this.salario.calcular(this.horas);
    }

    get getNombre(){
        return this.nombre;
    }

    set setSalario(new_salario: Salario){
        this.salario = new_salario;
    }
    
    set setHoras(cant: number){
        this.horas = cant;
    }
}