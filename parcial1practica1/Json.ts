
interface Json{
  toJson(): string;
}

export class Par{
  constructor(private atributo: String, private valor: Json) {

  }
  toString(){
    return `${this.atributo}: ${this.valor.toJson()}`
  }

}

export class Objeto implements Json{
  /**
   *
   */
  constructor(private campo: Array<Par>) {
  }

  toJson(): string {
    var text = "{";

    this.campo.forEach(par => {
      text+= `${par.toString()}, `;
    });

    text+="}";
    return text
  }
}

export class Arreglo implements Json{
  constructor(private elementos: Array<Json>) {
  }
  toJson(): string {
    var text = "[";

    this.elementos.forEach(e => {
      text+= `${e.toJson()}, `;
    });

    text+="]";
    return text
  }
}

export class Valor implements Json{
  constructor(private valor: string) {
  }

  toJson(): string {
    var text = this.valor;
    return text
  }
}

  export class Main {
    public static main(): void {
      // Crear algunos valores
      const valor1 = new Valor("Valor1");
      const valor2 = new Valor("Valor2");
      const valor3 = new Valor("Valor3");
  
      // Crear pares
      const par1 = new Par("atributo1", valor1);
      const par2 = new Par("atributo2", valor2);
  
      // Crear un objeto que contiene pares
      const objeto = new Objeto([par1, par2]);
  
      // Crear un arreglo que contiene un objeto y un valor
      const arreglo = new Arreglo([objeto, valor3]);
  
      // Imprimir el JSON resultante del arreglo
      console.log(arreglo.toJson());
    }
  }
  
  Main.main(); // Ejecuta el método main para ver el resultado