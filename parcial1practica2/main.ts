import { Consola } from "./Consola";
import { Folder } from "./Folder";
import * as readline from 'readline';

export class Main {

    public static main(): void {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      const c = new Consola(new Folder("/"))
      c.getCurrent.add(new Folder("Carpeta1"))
      this.AskForInput(c, rl);
    }

    public static AskForInput(c: Consola, rl: readline.Interface){
      // Lee la entrada del usuario 
      rl.question(`${c.getCurrent.getPath()}>>`, (input: string) => {
        if(input=="ls"){
          c.ls();
        }
        else if(input.slice(0, 3)=="cd "){
          c.cd(input.slice(3));
        }
        else if(input.slice(0, 6)=="mkdir "){
          c.mkdir(input.slice(6));
        }
        else if(input.slice(0, 6)=="touch "){
          c.touch(input.slice(6));
        }
        else if(input=="lsp"){
          c.lsp();
        }
        else if(input=="pwd"){
          c.pwd();
        }
        else{
          console.log("Entrada no reconocida.");
        }
        this.AskForInput(c, rl);  // Cierra la interfaz de lectura
      });
      }
  }
  
  Main.main(); // Ejecuta el método main para ver el resultado