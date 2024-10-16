import { match, P } from "ts-pattern";

export type ListItem<T> = {
  head: T;
  tail: List<T>;
}

export type List<T> = ListItem<T> | null;

export function add<T>(head: T, tail: List<T>): List<T> {
  return { head, tail };
}

export const isEmpty = <T>(list: List<T>): list is null => match(list)
  .with(null, () => true)
  .with(P.nonNullable, () => false)
  .exhaustive()

export const head = <T>(list: List<T>): T => match(list)
  .with(null, () => { throw new Error('Empty list') })
  .with(P.nonNullable, ({ head }) => head)
  .exhaustive()

export const tail = <T>(list: List<T>): List<T> => match(list)
  .with(null, () => { throw new Error('Empty list') })
  .with(P.nonNullable, ({ tail }) => tail)
  .exhaustive()

export const list = <T>(...elements: T[]): List<T> => match(elements)
  .with([], () => null)
  .with(P._, ([head, ...tail]) => add(head!, list(...tail)))
  .exhaustive()

export const aString = <T>(l: List<T>): string => {
  const aux = (l: List<T>, str: string): string => match([l, str])
    .with([null, P._], () => `list(${str})`)
    .with([P.nonNullable, ''], ([{ head, tail }]) => aux(tail, `${head}`))
    .with([P.nonNullable, P.string], ([{ head, tail }, str]) => aux(tail, `${str}, ${head}`))
    .exhaustive()
  return aux(l, '')
}

// Función auxiliar para concatenar dos listas
export const concatenate = <T>(list1: List<T>, list2: List<T>): List<T> => {
  return match(list1)
    .with(null, () => list2)
    .with(P._, ({ head, tail }) => add(head, concatenate(tail, list2)))
    .exhaustive();
};
