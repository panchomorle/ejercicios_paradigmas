// Defina una función que calcule el cuadrado de un número
export function cuadrado(n: number): number {
  return n * n;
}

// Defina una función que calcule la enésima potencia positiva de un número
export function potencia(base: number, exponente: number): number {
  if(exponente === 0){
    return 1;
  }
  return base * potencia(base, exponente-1);
}

// Defina una función que calcule el factorial de un número
export function factorial(n: number): number {
  if(n === 0){
    return 1;
  }
  return n * factorial(n - 1);
}

// Defina una función que calcule el n-ésimo número de la serie de Fibonacci
export function fibonacci(n: number): number {
  // if(n === 0 || n === 1){
  //   return 1;
  // }
  // return fibonacci(n - 1) + fibonacci(n - 2);
  const fib = (n: number, a: number, b: number)=>{
    if(n === 0 || n === 1){
      return a
    }
    return fib(n - 1, a + b, a)
  }
  return fib(n, 1, 0);
}

// Realice una funcion que dado el numero de fila y columna,
// calcule el valor del numero que se encuentre en la piramide de Pascal
export function pascal(fila: number, columna: number): number {
  return factorial(fila) / (factorial(columna) * factorial(fila - columna));
}

// Defina una función que calcule el máximo común divisor de dos números
export function mcd(a: number, b: number): number {
  if(a%b === 0){
    return b;
  }
  return mcd(b, a%b);
}

/**
 * Realice una función que permita saber si un texto tiene los parentesis balanceados, por ejemplo:
 * () => OK
 * ((()))() => OK
 * (()()) => OK
 * (()())) => no OK
 * (()(()) => no OK
 * )( => no OK
 */
type Parentesis = '(' | ')';
export function balance(chars: Parentesis[], count: number = 0): boolean {
  if(chars.length === 0){
    return count === 0;
  }
  if(count < 0){
    return false;
  }
  if(chars[0]==="("){
    return balance(chars.slice(1), count+1)
  }
  else{
    return balance(chars.slice(1), count-1)
  }
}

/**
 * Realice una función que cuente cuantas combinaciones pueden existir con monedas para un valor determinado, por ejemplo:
 * monedas (1,2) y valor es 4 , podemos llegar con las siguientes convinaciones (1,1,1,1) (1,1,2) (2,2)
 * por lo que la función debería retornar 3.
 */
export function contarCambio(monedas: number[], valor: number, index: number = 0): number {
  // Caso base: si el valor llega a cero, se ha encontrado una combinación válida
  if (valor === 0) return 1;

  // Caso base: si el valor es negativo o no quedan monedas, no hay combinación posible
  if (valor < 0 || index === monedas.length) return 0;

  // Opción 1: incluir la moneda actual y reducir el valor restante
  const incluirMoneda = contarCambio(monedas, valor - monedas[index], index);

  // Opción 2: no incluir la moneda actual y pasar a la siguiente moneda
  const noIncluirMoneda = contarCambio(monedas, valor, index + 1);

  // La suma de ambas opciones da el número total de combinaciones
  return incluirMoneda + noIncluirMoneda;
}

/**
 * Realice una función que indique si una lista de letras es palindromo
 * () -> true
 * ('a','l','a') -> true
 * ('a','l','l','a') -> true
 * ('h','a','l','l','a') -> false
 */
export function palindromo(chars: string[]): boolean {
  if(chars.length < 2){
    return true;
  }
  if(chars[0] === chars[chars.length-1]){
    return palindromo(chars.slice(1, -1));
  }
  return false;
}
