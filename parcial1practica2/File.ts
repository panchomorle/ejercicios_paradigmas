import { Nodo } from "./Nodo";

export class File extends Nodo{

    constructor(name: string, protected datos: string){
        super(name);
    }

}