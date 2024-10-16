import { Folder } from "./Folder";
import { File } from "./File";
import { OperacionesConsola } from "./OperacionesConsola";

type Command = 'mkdir' | 'touch' | 'cd' | 'ls' | 'lsp' | 'pwd' | 'close' | 'cat';
const validCommands: Command[] = ['mkdir', 'touch', 'cd', 'ls', 'lsp', 'pwd', 'close', 'cat'];

export class Consola{
    private terminal: OperacionesConsola;
    /**
     * hint: usar indexación de propiedades con corchetes
     * para acceder dinámicamente a los métodos
     */
    constructor(protected current: Folder) {
        this.terminal = OperacionesConsola.getInstance();
    }

    async open(){
        while(true){
            const [input, ...args] = (await this.terminal.read(this.current.getPath())) as [Command, ...string[]]
            try {
                if(!validCommands.includes(input)){
                    throw new Error("Comando inválido o desconocido.");
                }
                if (input === 'close') {
                    break;
                }
                const response = this[input](args.join(' '));
                if (response){
                    OperacionesConsola.getInstance().write(response);
                }
            } catch (error) {
                const message = (error as Error).message ?? 'An error occurred';
                OperacionesConsola.getInstance().write(message);
            }
        }
        
    }

    public get getCurrent() : Folder {
        return this.current;
    }

    private setCurrent(new_current: Folder): void{
        this.current = new_current;
    }

    public ls(): string{
        const response: string[] = []
        this.current.getChildren.forEach(children => {
            response.push(children.getName);
        });
        return response.join("\n");
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
        if (!found) {
            throw new Error("No se encontró esa dirección.");
        }
        else{
            null;
        }
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

    public pwd(): string{
        return this.current.getPath();
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
        this.current.add(new File("display.txt", this.ls()));
    }

    cat(name: string): string {
        let data: string = "";
        this.current.getChildren.forEach(child => {
            if (name == child.getName){
                if (child instanceof File) {
                    data = child.getData;
                  } else {
                    throw new Error('Invalid file');
                  }
            }
            else{
                data = "No existe ese archivo :/"
            }
        });
        return data;
      }

}