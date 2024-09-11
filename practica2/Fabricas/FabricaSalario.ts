import { Salario } from "../Modelos/ISalario";
import { SalarioHora } from "../Modelos/SalarioHora";
import { SalarioMes } from "../Modelos/SalarioMes";

abstract class FabricaSalario{
    abstract crearSalario(monto: number): Salario;
}

export class FabricaSalarioHora extends FabricaSalario{
    crearSalario(monto: number): Salario {
        return new SalarioHora(monto);
    }
}

export class FabricaSalarioMes extends FabricaSalario{
    crearSalario(monto: number): Salario {
        return new SalarioMes(monto);
    }
}