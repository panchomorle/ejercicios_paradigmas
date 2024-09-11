import { ScrumObject} from "./ScrumObject";

export class Epic extends ScrumObject{
    protected children: ScrumObject[] = [];

    getTotalHours(): number {
        return this.hoursWorked + this.children.reduce((ac, child)=>ac+child.getTotalHours(), 0);
    }

    getChildren(){
        return this.children;
    }

    addChild(child: ScrumObject){
        this.children.push(child);
        child.setParent(this);
    }

    removeChild(child: ScrumObject): void {
        const componentIndex = this.children.indexOf(child);
        this.children.splice(componentIndex, 1);
        child.setParent(null);
    }

    notify(): void{
        if (this.children.every((child)=>{child.getState() === "listo"})) {
            this.state = "listo";
        }
    }
}