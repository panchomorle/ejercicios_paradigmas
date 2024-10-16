import { Compania } from "../Modelos/Compania";
import { Reporte } from "../Modelos/IReporte";
import { ReporteHoras } from "../Modelos/ReporteHoras";
import { ReporteSalarios } from "../Modelos/ReporteSalarios";

abstract class FabricaReporte{
    abstract crearReporte(compania: Compania): Reporte;
}

export class FabricaReporteHoras extends FabricaReporte{
    crearReporte(compania: Compania): Reporte {
        return new ReporteHoras(compania);
    }
}

export class FabricaReporteSalarios extends FabricaReporte{
    crearReporte(compania: Compania): Reporte {
        return new ReporteSalarios(compania);
    }
}