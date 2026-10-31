/**
 * Formations for the block structure. Every stage of the page has its own
 * arrangement; the scene interpolates between them as the visitor scrolls,
 * so the same set of blocks continuously rebuilds itself.
 */

export type Formation = Float32Array; // count * 3

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function lattice(count: number, radius: number): Formation {
  // Fibonacci sphere — evenly distributed nodes
  const out = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    out[i * 3] = Math.cos(theta) * r * radius;
    out[i * 3 + 1] = y * radius;
    out[i * 3 + 2] = Math.sin(theta) * r * radius;
  }
  return out;
}

function tower(count: number, height: number): Formation {
  // Spiral stack — building from the ground up
  const out = new Float32Array(count * 3);
  const step = height / (count - 1);
  for (let i = 0; i < count; i++) {
    const angle = i * 0.52;
    const radius = 0.85;
    out[i * 3] = Math.cos(angle) * radius;
    out[i * 3 + 1] = -height / 2 + i * step;
    out[i * 3 + 2] = Math.sin(angle) * radius;
  }
  return out;
}

function orbit(count: number): Formation {
  const out = new Float32Array(count * 3);
  const rand = mulberry32(7);
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const radius = 5.4 + (rand() - 0.5) * 1.2;
    out[i * 3] = Math.cos(angle) * radius;
    out[i * 3 + 1] = Math.sin(angle * 2) * 0.6 + (rand() - 0.5) * 0.8;
    out[i * 3 + 2] = Math.sin(angle) * radius - 3;
  }
  return out;
}

function grid(count: number): Formation {
  const out = new Float32Array(count * 3);
  const cols = 6;
  const layers = 2;
  const rows = Math.ceil(count / (cols * layers));
  const gap = 0.78;
  for (let i = 0; i < count; i++) {
    const c = i % cols;
    const r = Math.floor(i / cols) % rows;
    const l = Math.floor(i / (cols * rows));
    out[i * 3] = (c - (cols - 1) / 2) * gap;
    out[i * 3 + 1] = (r - (rows - 1) / 2) * gap;
    out[i * 3 + 2] = (l - (layers - 1) / 2) * gap - 1.5;
  }
  return out;
}

function mempool(count: number): Formation {
  const out = new Float32Array(count * 3);
  const rand = mulberry32(42);
  for (let i = 0; i < count; i++) {
    out[i * 3] = (rand() - 0.5) * 14;
    out[i * 3 + 1] = (rand() - 0.5) * 7;
    out[i * 3 + 2] = (rand() - 0.5) * 6 - 3;
  }
  return out;
}

function ground(count: number): Formation {
  const out = new Float32Array(count * 3);
  const cols = 9;
  const gap = 1.25;
  const rows = Math.ceil(count / cols);
  for (let i = 0; i < count; i++) {
    const c = i % cols;
    const r = Math.floor(i / cols);
    out[i * 3] = (c - (cols - 1) / 2) * gap;
    out[i * 3 + 1] = -2.7;
    out[i * 3 + 2] = -r * gap - 1;
  }
  return out;
}

function core(count: number): Formation {
  // Compact block — every node pulled into one connected structure
  const out = new Float32Array(count * 3);
  const gap = 0.47;
  const cells: Array<[number, number, number, number]> = [];
  for (let x = -2; x <= 2; x++)
    for (let y = -2; y <= 2; y++)
      for (let z = -2; z <= 2; z++) {
        cells.push([x, y, z, Math.sqrt(x * x + y * y * 1.05 + z * z)]);
      }
  cells.sort((a, b) => a[3] - b[3]);
  for (let i = 0; i < count; i++) {
    const cell = cells[i];
    out[i * 3] = cell[0] * gap;
    out[i * 3 + 1] = cell[1] * gap;
    out[i * 3 + 2] = cell[2] * gap;
  }
  return out;
}

export function buildFormations(count: number, compact: boolean): Formation[] {
  return [
    lattice(count, compact ? 1.9 : 2.3),
    tower(count, compact ? 4.4 : 6),
    orbit(count),
    grid(count),
    mempool(count),
    ground(count),
    core(count),
  ];
}

/** Edges: nearest neighbours in the lattice + the sequential "chain" link. */
export function buildEdges(base: Formation, count: number, neighbours = 2): Array<[number, number]> {
  const set = new Set<string>();
  const edges: Array<[number, number]> = [];
  const add = (a: number, b: number) => {
    const key = a < b ? `${a}-${b}` : `${b}-${a}`;
    if (set.has(key)) return;
    set.add(key);
    edges.push([a, b]);
  };

  for (let i = 0; i < count; i++) {
    const distances: Array<[number, number]> = [];
    for (let j = 0; j < count; j++) {
      if (i === j) continue;
      const dx = base[i * 3] - base[j * 3];
      const dy = base[i * 3 + 1] - base[j * 3 + 1];
      const dz = base[i * 3 + 2] - base[j * 3 + 2];
      distances.push([j, dx * dx + dy * dy + dz * dz]);
    }
    distances.sort((a, b) => a[1] - b[1]);
    for (let k = 0; k < neighbours; k++) add(i, distances[k][0]);
    if (i < count - 1) add(i, i + 1);
  }
  return edges;
}

/** Per-stage presentation of the whole structure. */
export const STAGE_PRESET = [
  { x: 2.7, y: 0.1, scale: 1, opacity: 1, chaos: 1, edge: 0.4, core: 1 },
  { x: 3.1, y: 0, scale: 0.92, opacity: 0.9, chaos: 0.18, edge: 0.55, core: 0.5 },
  { x: 0, y: 0, scale: 1, opacity: 0.32, chaos: 1, edge: 0.14, core: 0.7 },
  { x: 0, y: 0, scale: 1, opacity: 0.22, chaos: 0, edge: 0.18, core: 0.5 },
  { x: 0, y: 0, scale: 1, opacity: 0.25, chaos: 1.4, edge: 0.08, core: 0.45 },
  { x: 0, y: 0, scale: 1, opacity: 0.3, chaos: 0, edge: 0.12, core: 0.4 },
  { x: 2.9, y: 0, scale: 1.12, opacity: 1, chaos: 0, edge: 0.65, core: 1.35 },
] as const;
