import { Compania } from "./Compania";
import { Empleado } from "./Empleado";
import { SalarioHora, SalarioMes } from "./Salarios";
import { ReporteSalarios, ReporteHoras } from "./Reportes";

const c = new Compania('Arcor',
    [   new Empleado("Juan", new SalarioMes(230000), 28),
        new Empleado("Pedrito", new SalarioHora(5600), 12),
        new Empleado("Alfonso", new SalarioHora(3500), 36),
    ]);

describe('Compania', () => {
    it('Calcula nómina mensual', ()=>{
        expect(c.calcularNomina()).toBe(423200);
    });
});

describe('Empleados', () => {
    it('Cambia categoría salario', ()=>{
        //Le damos un salario mensual a Pedrito
        c.getEmpleados[1].setSalario = new SalarioMes(360000);
        expect(c.getEmpleados[1].getSalario).toBe(360000);
        //Le damos un salario por hora a Juan
        c.getEmpleados[0].setSalario = new SalarioHora(8000);
        expect(c.getEmpleados[0].getSalario).toBe(224000);
    });
    it('Cambia horas de trabajo', ()=>{
        c.getEmpleados[2].setHoras = 16;
        expect(c.getEmpleados[2].getSalario).toBe(56000);
    });
});

describe('Reportes', () => {
    it('Genera reporte de nomina mensual', ()=>{
        const r = new ReporteSalarios(c);
        console.log(r.imprimir());
    });
    it('Genera reporte de horas trabajadas', ()=>{
        const r = new ReporteHoras(c);
        console.log(r.imprimir());
    });
});