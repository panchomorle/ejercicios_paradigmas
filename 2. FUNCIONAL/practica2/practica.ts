import * as List from './List';

// Indica si un elemento esta contenido o no dentro de la lista
export function exists<T>(list: List.List<T>, n: T): boolean {
  if (list?.head === n) {
    return true;
  } else if (List.isEmpty(list)){
    return false;
  }
  return exists(list.tail, n);
}

// Busca el elemento ubicado en la posicion indicada
export function at(list: List.List<number>, index: number): number {
  if (List.isEmpty(list)) {
    throw new Error();
  } else if (index === 0) {
    return list.head;
  }
  return at(list.tail, index - 1);
}

// Busca el elemento mas grande de la lista
export function max(list: List.List<number>): number {
  if (List.isEmpty(list)) {
    throw new Error()
  } else if (List.isEmpty(list.tail)){
    return list.head;
  }

  const call = max(list.tail)
  return list.head > call ? list.head : call;
}

// Busca el elemento mas chico de la lista
export function min(list: List.List<number>): number {
  if (List.isEmpty(list)) {
    throw new Error()
  } else if (List.isEmpty(list.tail)){
    return list.head;
  }

  const call = min(list.tail)
  return list.head < call ? list.head : call;
}


// Cuenta la cantidad de elementos de la lista
export function count<T>(list: List.List<T>): number {
  if (List.isEmpty(list)) {
    return 0;
  }
  return 1 + count(list.tail);
}

// Indica si 2 listas son iguales
export function areEqual(firstList: List.List<number>, secondList: List.List<number>): boolean {
  if (List.isEmpty(firstList) && List.isEmpty(secondList)) {
    return true;
  }
  if(List.isEmpty(firstList) || List.isEmpty(secondList)){
    return false;
  }
  if (firstList.head !== secondList.head) {
    return false;
  }
  return areEqual(firstList.tail, secondList.tail);
}

// Devuelve una representacion en string de la lista
export function toString(list: List.List<number>): string {
  if(List.isEmpty(list)) return '';
  if(List.isEmpty(list.tail)) return list.head.toString();
  return list.head.toString() + ', ' + toString(list.tail)
}

// Devuelve una lista donde solo los elementos pares de la lista original estan presente
export function onlyEvens(list: List.List<number>): List.List<number> {
  return filter(list, x=> x % 2 === 0);
}

// Devuelve una lista donde solo los elementos multiplos de 3 de la lista original estan presente
export function onlyMultiplesOf3(list: List.List<number>): List.List<number> {
  return filter(list, x=> x % 3 === 0);
}

// Dada una lista de numeros y una funcion que recibe un numero y devuelve un booleano, devuelve una lista con los elementos que cumplen con la funcion
export function filter(list: List.List<number>, predicate: (n: number) => boolean): List.List<number> {
  if(List.isEmpty(list)) return List.list();
  if(predicate(list.head)) return List.add(list.head, filter(list.tail, predicate))
  return filter(list.tail, predicate);
}

// Devuelve la suma de los numeros en la lista
export function accumulateItems(list: List.List<number>): number {
  return accumulate(list, x => x);
}

// Devuelve la suma de el doble de los elementos de la lista
export function accumulateDouble(list: List.List<number>): number {
  return accumulate(list, x => x * 2);
}

// Devuelve la suma de el cuadrado de los elementos de la lista
export function accumulateSquare(list: List.List<number>): number {
  return accumulate(list, x => x * x);
}

// Dada una lista y una funcion de transformacion, devuelve la suma del retorno de la funcion para cada elemento de la lista
export function accumulate(list: List.List<number>, fx: (n: number) => number): number {
  if(!list){
    return 0
  }
  return fx(list.head) + accumulate(list.tail, fx);
}


// Dada una lista y una funcion de transformacion, devuelve una lista con el retorno de la funcion para cada elemento de la lista
export function transform<T>(list: List.List<number>, fx: (n: number) => T): List.List<T> {
  if (!list) return null
  return List.add(fx(list.head), transform(list.tail, fx))
}

// Une las dos listas, una despues de la otra
export function join(firstList: List.List<number>, secondList: List.List<number>): List.List<number> {
  if (!firstList) return secondList
  return List.add(firstList.head, join(firstList.tail, secondList))
}

export function removeRepeated<T>(list: List.List<T>): List.List<T> {
  if (!list) return list
  if (exists(list.tail, list.head)) return removeRepeated(list.tail)
  return List.add(list.head, removeRepeated(list.tail))
}

// Une las dos listas, eliminando elementos repetidos
export function union(firstList: List.List<number>, secondList: List.List<number>): List.List<number> {
  return removeRepeated(join(firstList, secondList));
}

// Devuelve los elementos que se encuentran en ambas listas
export function intersection(firstList: List.List<number>, secondList: List.List<number>): List.List<number> {
  if(!firstList || !secondList) return null;
  if(exists(secondList, firstList.head)) return List.add(firstList.head, intersection(firstList.tail, secondList))
  return intersection(firstList.tail, secondList);
}

///hasta acá hay 18 passed
/*
* Busca la mediana
* En el ámbito de la estadística, la mediana representa el
* valor de la variable de posición central en un conjunto de datos ordenados.
* Si la cantidad de elementos es par, devuelve el primero de los dos elementos centrales.
*/
export function median(list: List.List<number>): number {
  const c = count(list);
  if (c % 2 === 0) {
    return at(list, (c/2) - 1)
  }
  return at(list, Math.floor(c/2));
}

export function compare(list: List.List<number>, param: number, predicate: (a: number, b: number) => boolean): List.List<number> {
  if(List.isEmpty(list)) return List.list();
  if(predicate(list.head, param)) return List.add(list.head, compare(list.tail, param, predicate))
  return compare(list.tail, param, predicate);
}

// Devuelve los elementos de una lista que son mayores o iguales que un parametro 
export function getBiggerOrEqualElements(list: List.List<number>, n: number): List.List<number> {
  return compare(list, n, (a, b)=> a >= b);
}

// Devuelve los elementos de una lista que son menores que un parametro
export function getSmallerElements(list: List.List<number>, n: number): List.List<number> {
  return compare(list, n, (a, b)=> a < b);
}


// Ordene los elementos de la lista usando el algoritmo QuickSort
export function quickSort(list: List.List<number>): List.List<number> {
  if(List.isEmpty(list)) return List.list();
  const pivot = list.head;
  const smaller = quickSort(getSmallerElements(list.tail, pivot));
  const bigger = quickSort(getBiggerOrEqualElements(list.tail, pivot));
  return join(join(smaller, List.list(pivot)), bigger);
}

export function slice(a: number, b: number): List.List<number> {
  if(a > b) return null
  return List.add(a, slice(a + 1, b))
}

/*************************** 
 * Opcional
 * Dada una lista de enteros retorna una lista con todas las posibles subconjuntos
 * Por ejemplo : (1,2,3) -> ((),(1),(2),(3),(1,2),(1,3), (1,2,3), (2,3))
*/
export function getAllSubsets(list: List.List<number>): List.List<List.List<number>> {
  return null;
}
