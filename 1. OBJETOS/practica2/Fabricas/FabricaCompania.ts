import { Compania } from "../Modelos/Compania";
import { Empleado } from "../Modelos/Empleado";

export class FabricaCompania{
    public crearCompania(nombre: string, empleados: Empleado[]): Compania{
        return new Compania(nombre, empleados);
    }
}