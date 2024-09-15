import { Consola } from "./Consola";
import { Folder } from "./Folder";

export class Main {

    public static main(): void {
      const c = new Consola(new Folder("/"));
      c.getCurrent.add(new Folder("CarpetaEjemplo"));
      c.open();
    }
  }

Main.main();