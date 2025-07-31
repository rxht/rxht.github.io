import { AtomType, DEFAULE_K } from './data';

export function StateOfMatter(atom: AtomType, temperature: number = 0) {
  if (atom.melt === undefined && atom.boil === undefined) return 'Unknown';
  const melt = +(atom.melt ?? Number.MIN_SAFE_INTEGER);
  const boil = +(atom.boil ?? Number.MIN_SAFE_INTEGER);
  const K = temperature + DEFAULE_K;
  return K > boil ? 'Gaseous' : K > melt ? 'Liquid' : 'Solid';
}