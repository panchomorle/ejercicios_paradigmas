import { Nodo } from "./Nodo";

export class Folder extends Nodo{
    protected children: Nodo[] = []; //aplicamos patron composite

    constructor(name: string){
        super(name);
    }

    
    public get getChildren() : Nodo[] {
        return this.children;
    }
    

    public add(component: Nodo): void {
        this.children.push(component);
        component.setParent(this);
    }

    public remove(component: Nodo): void {
        const componentIndex = this.children.indexOf(component);
        this.children.splice(componentIndex, 1);
        component.setParent(null);
    }

    public isComposite(): boolean {
        return true;
    }
}