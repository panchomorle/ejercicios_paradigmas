import { Reporte } from "./IReporte";

export class ReporteHoras extends Reporte{
    public imprimir(): string{
        let txt = this.generarHeader();
        this.compania.getEmpleados.forEach((emp)=>{
            txt += `${emp.getNombre}: ${emp.getHoras}\n`;
        });
        txt+= `TOTAL HORAS TRABAJADAS: ${this.compania.calcularTotalHoras()}`;
        return txt;
    }
}