import { Epic } from "./Epic";
import { Proyecto } from "./Proyecto";
import { UserStory } from "./UserStory";

class main {
    public static Main(){
        const p = Proyecto.getProyecto();
        p.addItem(new Epic("desarrollar modulo de facturación", 1));
        p.addItem(new Epic("desarrollar modulo de ventas", 1));
        p.getItems()[0].addChild(new Epic("Creación de Factura", 1));
        p.getItems()[0].addChild(new Epic("Guardado de Factura", 2));
        p.getItems()[0].addChild(new Epic("Impresion de Factura", 3));
        
        const creacionFactura = p.getItems()[0].getChildren()[0]
        creacionFactura.addChild(new UserStory("Calcular el monto de la factura", 1, 20, "fua loco", "pedrito"));
        creacionFactura.addChild(new UserStory("Calcular el precio de facturacion", 2, 30, "ola", "pablo"));
        creacionFactura.addChild(new UserStory("Calcular items", 3, 24, "arre", "pablo"));
        p.getItems()[0].getChildren()[2].addChild(new UserStory("Inyectar tinta", 1, 12, "arre", "fulano"));
        console.log(p.getItems()[0].getTotalHours());

        console.log(creacionFactura.getState());
        creacionFactura.getChildren()[0].setState("listo");
        creacionFactura.getChildren()[1].setState("listo");
        creacionFactura.getChildren()[2].setState("listo");
        console.log(creacionFactura.getState());
    }
    
}

main.Main();