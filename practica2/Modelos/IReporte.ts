import { Compania } from "./Compania";

export abstract class Reporte{
    protected fecha: string;
    protected hora: string;

    constructor(protected compania: Compania){
        const today = new Date();
        this.fecha = today.toLocaleDateString();
        this.hora = today.toLocaleTimeString();
    }

    protected generarHeader(){
        return `Reporte de ${this.compania.getNombre} del ${this.fecha} a las ${this.hora}:\n`;
    }

    abstract imprimir(): string;
}