// Versioned deterministic parcel candidate generator shared by browser and Node validation.
function seededRandom(seed) {
  let state = seed >>> 0;
  return () => {
    state += 0x6D2B79F5;
    let value = state;
    value = Math.imul(value ^ value >>> 15, value | 1);
    value ^= value + Math.imul(value ^ value >>> 7, value | 61);
    return ((value ^ value >>> 14) >>> 0) / 4294967296;
  };
}
function hashId(value) {
  let hash = 2166136261;
  for (const char of value) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}
export function generateParcels(district, seed) {
  const grid = district.parcelGrid;
  const random = seededRandom((seed ^ hashId(district.id)) >>> 0);
  const parcels = [];
  for (let row = 0; row < grid.rows; row++) {
    for (let column = 0; column < grid.columns; column++) {
      if (random() > grid.occupancy) continue;
      const inset = 2 + random() * 3;
      parcels.push({
        id: district.id + "-" + row + "-" + column,
        x: grid.origin[0] + column * (grid.width + grid.gap) + inset,
        y: grid.origin[1] + row * (grid.height + grid.gap) + inset,
        width: grid.width - inset * 2,
        height: grid.height - inset * 2
      });
    }
  }
  return parcels;
}
