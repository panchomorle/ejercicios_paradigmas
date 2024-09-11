import { Empleado } from "../Modelos/Empleado";
import { Salario } from "../Modelos/ISalario";

export class FabricaEmpleado{
    public crearEmpleado(nombre: string, salario: Salario, horas: number): Empleado{
        return new Empleado(nombre, salario, horas);
    }
}