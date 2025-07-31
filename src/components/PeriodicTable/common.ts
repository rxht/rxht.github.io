import { AtomType, Block, DEFAULE_K } from "./data";

export function StateOfMatter(atom: AtomType, temperature: number = 0) {
  if (atom.melt === undefined && atom.boil === undefined) return "Unknown";
  const melt = +(atom.melt ?? Number.MIN_SAFE_INTEGER);
  const boil = +(atom.boil ?? Number.MIN_SAFE_INTEGER);
  const K = temperature + DEFAULE_K;
  return K > boil ? "Gaseous" : K > melt ? "Liquid" : "Solid";
}

export function getBlockByConfig(atom: AtomType): Block {
  const { expandedconfig, series, symbol } = atom;
  if (series === "Lanthanoid" || series === "Actinoid") {
    if (symbol === "Lu" || symbol === "Lr") return "d";
    return "f";
  }

  const terms = expandedconfig.trim().split(/\s+/);
  const orbitals = terms
    .map((t) => {
      const m = t.match(/^(\d+)([spdf])(\d+)$/i);
      if (!m) throw new Error("Invalid term");
      const n = +m[1];
      const l = m[2].toLowerCase() as Block;
      // l → 0,1,2,3
      const lVal = { s: 0, p: 1, d: 2, f: 3 }[l]!;
      return { n, l, lVal, e: +m[3] };
    })
    // Madelung 规则：先按 n+l 升序；n+l 相同再按 n 升序
    .sort((a, b) => a.n + a.lVal - (b.n + b.lVal) || a.n - b.n);

  return orbitals[orbitals.length - 1].l;
}
