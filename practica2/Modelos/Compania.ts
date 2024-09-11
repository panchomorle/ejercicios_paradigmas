import { Empleado } from "./Empleado";

export class Compania{
    constructor(private nombre: string, private empleados: Empleado[]){}

    get getNombre(): string{
        return this.nombre;
    }

    get getEmpleados(): Empleado[]{
        return this.empleados;
    }

    public agregar(emp: Empleado){
        this.empleados.push(emp)
    }

    public calcularNomina(): number{
        var nomina = 0;
        this.empleados.forEach(empleado => {
            nomina += empleado.getSalario;
        });
        // for (const empleado of this.empleados) {
        //     nomina += empleado.getSalario;
        // }
        return nomina;
    }

    public calcularTotalHoras(): number{
        var horas = 0;
        this.empleados.forEach(empleado => {
            horas += empleado.getHoras;
        });
        return horas;
    }
}