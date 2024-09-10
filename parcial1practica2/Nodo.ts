export abstract class Nodo{
    protected parent: Nodo | null = null;

    constructor(protected name: string){
    }

    
    public get getName() : string {
        return this.name;
    }
    
    getPath(): string{
        if (this.parent == null){
            return this.name;
        }
        return `${this.parent.getPath()}${this.name}/`;
    };
    
    public setParent(parent: Nodo | null){
        this.parent = parent;
    }

    public getParent(): Nodo | null{
        return this.parent;
    }

    public isComposite(): boolean{
        return false;
    }
}