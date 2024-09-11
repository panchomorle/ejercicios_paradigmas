import { Epic } from "./Epic";

export type State = "en desarrollo"| "desarrollando" | "probando" | "listo";

export abstract class ScrumObject {
    protected state: State = "en desarrollo";
    protected parent: Epic | null = null;
    protected hoursWorked: number = 0;

    constructor(
        protected name: string,
        protected number: number) {
    }

    abstract getTotalHours(): number;

    getState(){
        return this.state;
    }

    getParent(){
        return this.parent;
    }

    setParent(p: Epic | null){
        this.parent = p;
    }

    addChild(child: ScrumObject){
        console.log("No puedes añadir nada a este objeto.");
    }
}