import { ScrumObject, State} from "./ScrumObject";

export class Epic extends ScrumObject{
    protected children: ScrumObject[] = [];
    private ready: State = "listo";

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
        this.children.forEach((child, index) => {
            console.log(`Checking child ${index}: ${child.getState() === this.ready}`);
          });
        if (this.children.every((child)=>{child.getState() === this.ready})) {
            this.state = "listo";
            console.log("Epic changed to 'listo' ");
        }
        console.log("not ready");
    }
}