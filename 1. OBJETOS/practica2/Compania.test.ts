import { FabricaCompania } from "./Fabricas/FabricaCompania";
import { FabricaEmpleado } from "./Fabricas/FabricaEmpleado";
import { FabricaReporteHoras, FabricaReporteSalarios } from "./Fabricas/FabricaReporte";
import { FabricaSalarioHora, FabricaSalarioMes } from "./Fabricas/FabricaSalario";

const fCompanias = new FabricaCompania;
const fEmpleados = new FabricaEmpleado;
const fSalariosMes = new FabricaSalarioMes;
const fSalariosHora = new FabricaSalarioHora;
const fReportesHora = new FabricaReporteHoras;
const fReportesSalarios = new FabricaReporteSalarios;

const c = fCompanias.crearCompania('Arcor',
    [   fEmpleados.crearEmpleado("Juan", fSalariosMes.crearSalario(230000), 28),
        fEmpleados.crearEmpleado("Pedrito", fSalariosHora.crearSalario(5600), 12),
        fEmpleados.crearEmpleado("Alfonso", fSalariosHora.crearSalario(3500), 36),
    ]);

describe('Compania', () => {
    it('Calcula nómina mensual', ()=>{
        expect(c.calcularNomina()).toBe(423200);
    });
});

describe('Empleados', () => {
    it('Cambia categoría salario', ()=>{
        //Le damos un salario mensual a Pedrito
        c.getEmpleados[1].setSalario = fSalariosMes.crearSalario(360000);
        expect(c.getEmpleados[1].getSalario).toBe(360000);
        //Le damos un salario por hora a Juan
        c.getEmpleados[0].setSalario = fSalariosHora.crearSalario(8000);
        expect(c.getEmpleados[0].getSalario).toBe(224000);
    });
    it('Cambia horas de trabajo', ()=>{
        c.getEmpleados[2].setHoras = 16;
        expect(c.getEmpleados[2].getSalario).toBe(56000);
    });
});

describe('Reportes', () => {
    it('Genera reporte de nomina mensual', ()=>{
        const r = fReportesSalarios.crearReporte(c);
        console.log(r.imprimir());
    });
    it('Genera reporte de horas trabajadas', ()=>{
        const r = fReportesHora.crearReporte(c);
        console.log(r.imprimir());
    });
});