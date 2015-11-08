export default function isNumberUnit (obj) {
  if (typeof obj !== 'object') return false
  // duck type check
  return '_number' in obj &&
    'unit' in obj &&
    'unitType' in obj &&
    'baseUnit' in obj &&
    'rootUnitType' in obj
}
