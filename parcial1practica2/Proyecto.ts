import { Epic } from "./Epic";
import { ScrumObject } from "./ScrumObject";

export class Proyecto {
    protected items: Epic[] = []
    private static instance: Proyecto;

    private constructor() {
        
    }
    public static getProyecto(){
        if (!Proyecto.instance) {
            this.instance = new Proyecto();
        }
        return this.instance;
    }
    addItem(s: Epic){
        this.items.push(s);
    }
    getItems(): Epic[]{
        return this.items;
    }
}