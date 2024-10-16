import { Reporte } from "./IReporte";

export class ReporteSalarios extends Reporte{
    public imprimir(): string{
        let txt = this.generarHeader();
        this.compania.getEmpleados.forEach((emp)=>{
            txt += `${emp.getNombre}: ${emp.getSalario}\n`;
        });
        txt+= `NOMINA MENSUAL: ${this.compania.calcularNomina()}`;
        return txt;
    }
}