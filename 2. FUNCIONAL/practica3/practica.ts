import { match, P } from 'ts-pattern';
import { List, add, concatenate, head, isEmpty, list, tail, aString } from './List';

type Tree = null | TreeNode;
export class TreeNode {
  constructor(public value: number, public left: Tree = null, public right: Tree = null) { }
}
// Inserta un valor en el arbol
export const insert = (x: number, t: Tree = null): TreeNode => match(t)
  //se llega a un nodo nulo (el scope se situa en un arbol no existente) agregamos el nodo ahí con el value x.
  .with(null, ()=> new TreeNode(x))
  //si el nodo donde nos posicionamos es mas grande q el nuevo nodo = el nuevo nodo es mas chico por ende se va a la izq
  .with({value: P.number.gt(x)}, ({value, left, right}) => new TreeNode(value, insert(x, left), right))
  //si el nodo es cualquier otra cosa lo mandamos a la derecha
  .with(P._, ({value, left, right})=> new TreeNode(value, left, insert(x, right)))
  .exhaustive()

// Construye un arbol a partir de una lista de numeros
/*
export const fromList = (l: List<number>): Tree => { 
const aux = (l: List<number>, tree: Tree): Tree => match(l)
  .with(null, ()=> null)
  .with(P._, ({head, tail}) => aux(tail, insert(head, tree)))
  .exhaustive()
return aux(l, null)
}
*/

/*
// Inserta un valor en el arbol
export const insert = (x: number, t: Tree = null): TreeNode => match(t)
  .with(null, () => new TreeNode(x))
  .with({ value: P.number.gt(x) }, ({ value, left, right }) => new TreeNode(value, insert(x, left), right))
  .with(P._, ({ value, left, right }) => new TreeNode(value, left, insert(x, right)))
  .exhaustive()
*/
// Construye un arbol a partir de una lista de numeros
export const fromList = (l: List<number>): Tree => {
  const aux = (l: List<number>, acc: Tree = null): Tree => match(l)
    .with(null, () => acc)
    .otherwise(({ head, tail }) => aux(tail, insert(head, acc)))
  return aux(l)
}


// Determina si un valor esta en el arbol
export const contains = (x: number, t: Tree): boolean => match(t)
  .with(null, () => false)
  .with({value: x}, ()=>true)
  .with({value: P.number.gt(x)}, ({left})=> contains(x, left))
  .with(P.nonNullable, ({right}) => contains(x, right))
  .exhaustive()

// Cuenta el numero de nodos del arbol
export const count = (t: Tree): number => match(t)
  .with(null, ()=> 0)
  .with(P._, ({left, right}) => 1 + count(left) + count(right))
  .exhaustive()

// Duplica el valor de cada nodo del arbol
export const double = (t: Tree): Tree => match(t)
  .with(null, ()=> null)
  .with(P._, ({value, left, right})=> new TreeNode(value*2, double(left), double(right)))
  .exhaustive()

// Aplica una funcion a cada nodo del arbol
export const map = (t: Tree, fx: (v: number) => number): Tree => match(t)
  .with(null, ()=> null)
  .with(P._, ({value, left, right})=> new TreeNode(fx(value), map(left, fx), map(right, fx)))
  .exhaustive()

// Convierte el arbol a una lista, recorriendo los nodos en profundidad (es decir, primero la raiz, despues el subarbol izquierdo, despues el subarbol derecho)
export const toList = (t: Tree): List<number> => match(t)
  .with(null, () => list<number>()) // Aseguramos que la lista vacía es de tipo 'List<number>'
  .with(P.instanceOf(TreeNode), ({ value, left, right }) =>
    // Agregamos el valor del nodo actual, seguido de la lista de nodos del subárbol izquierdo y del derecho
    concatenate(toList(left), add<number>(value, toList(right)) )
  )
  .exhaustive()

export const max = (a: number, b: number): number => a > b ? a : b

// Determina la profundidad del arbol, es decir, la longitud del camino mas largo desde la raiz hasta una hoja
export const depth = (t: Tree): number => match(t)
  .with(null, ()=> 0)
  .with(P._, ({value, left, right})=> 1 + max(depth(left), depth(right)) )
  .exhaustive()

// Determina si el arbol esta balanceado, es decir, la diferencia de profundidad entre el subarbol izquierdo y el derecho no es mayor que 1
export const isBalanced = (t: Tree): boolean => match(t)
  .with(null, ()=> true)
  .with(P._, ({value, left, right})=> Math.abs(depth(left) - depth(right)) <= 1 && isBalanced(left) && isBalanced(right))
  .exhaustive()

// Calcula la longitud de la lista
const listLength = <T>(l: List<T>): number => match(l)
  .with(null, () => 0)
  .with(P._, ({ tail }) => 1 + listLength(tail))
  .exhaustive();

// Obtiene el elemento en la posición n de la lista
const getNth = <T>(l: List<T>, n: number): T => match(l)
  .with(null, () => { throw new Error("Index out of bounds"); })
  .with(P._, ({ head, tail }) => (n === 0 ? head : getNth(tail, n - 1)))
  .exhaustive();

// Balancea el arbol, es decir, reorganiza los nodos de manera que la diferencia de profundidad entre el subarbol izquierdo y el derecho no sea mayor que 1
export const balance = (t: Tree): Tree => {
  const createBalanced = (l: List<number>): Tree => match(l)
  .with(null, () => null)
  .with(P._, () => {
    const len = listLength(l);
    const mid = Math.floor(len / 2);
    return new TreeNode(
      getNth(l, mid),
      createBalanced(slice(l, 0, mid)),
      createBalanced(slice(l, mid + 1, len))
    );
  })
  .exhaustive();

  return createBalanced(toList(t)); // Convertimos el árbol en lista y luego lo balanceamos
};

// Función auxiliar para "cortar" una lista desde el índice `start` hasta `end`
const slice = <T>(l: List<T>, start: number, end: number): List<T> => {
  if (start >= end) return null;
  if (start === 0) return match(l)
    .with(null, () => null)
    .with(P._, ({ head, tail }) => add(head, slice(tail, 0, end - 1)))
    .exhaustive();
  return slice(tail(l)!, start - 1, end - 1); // Added non-null assertion operator
};

// Convierta el arbol a string, recorriendo los nodos en anchura (es decir, primero todos los del nivel 1, despues todos los del nivel 2, etc)
/*
export const toString = (t: Tree): string => {
  const anchura = (queue: List<TreeNode | null>, resultado: List<TreeNode | null>): List<TreeNode | null> => {
    if (queue === null) return resultado;
    const puntero = head(queue);
    var cola = tail(queue);
    if (puntero?.right) cola = add(puntero.right, cola);
    if (puntero?.left) cola = add(puntero.left, cola);
    return anchura(cola, add(puntero, resultado));
  };
  const result = anchura(list(t), list());
  return result ? aString(result) : '';
};
*/

export const toString = (t: Tree): string => {
  const anchura = (queue: List<TreeNode | null>, resultado: string): string =>
    match(queue)
      .with(null, () => resultado.trim()) // uso el trim() para eliminar el espacio al final
      .otherwise(() => {
        const puntero = head(queue);
        const cola = tail(queue);

        return match(puntero)
          .with(null, () => anchura(cola, resultado))
          .otherwise(({ left, right, value }) => {
            const newQueue = add(left, add(right, cola));
            return anchura(newQueue, resultado + value + ' ');
          });
      });

  return anchura(list(t), '');
};
