import { Folder } from "./Folder";
import { File } from "./File";

export class Consola{
    /**
     * hint: usar indexación de propiedades con corchetes
     * para acceder dinámicamente a los métodos
     */
    constructor(protected current: Folder) {
    }

    public get getCurrent() : Folder {
        return this.current;
    }

    private setCurrent(new_current: Folder): void{
        this.current = new_current;
    }

    public ls(): void{
        this.current.getChildren.forEach(children => {
            console.log(children.getName);
        });
    }

    public cd(dir: string): void{
        let found = false;
        if(dir==".."){
            const target= this.current.getParent();
            if(target instanceof Folder){
                this.setCurrent(target);
            }
        }
        this.current.getChildren.forEach(children => {
            if (dir === children.getName && children instanceof Folder){
                this.setCurrent(children);
                found = true;
            }
        });

        !found ? console.log("No se encontró esa dirección.") : null;
    }

    public mkdir(name: string): void{
        let is_repeated = false;

        this.current.getChildren.forEach(children => {
            if (name == children.getName){
                is_repeated = true;
            }
        });
        
        if (!is_repeated){
            this.current.add(new Folder(name));
        }
    }

    public pwd(): void{
        console.log(this.current.getPath());
    }

    public touch(text: string): void{
        let temparr = text.split(" ");
        let name = temparr[0];
        let data = temparr.slice(1).join(" ");
        let is_repeated = false;

        this.current.getChildren.forEach(children => {
            if (name == children.getName){
                is_repeated = true;
            }
        });
        
        if (!is_repeated){
            this.current.add(new File(name, data));
        }
    }

    public lsp(): void{
        let txt = ""
        this.current.getChildren.forEach(children => {
            txt+= children.getName;
        });
        this.current.add(new File("display.txt", txt));
    }

}