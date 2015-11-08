import { UnitType } from '../'

export const currency = UnitType.create('currency')
export const cryptoCurrency = UnitType.create('crypto-currency', currency)
export const bitcoin = UnitType.create('bitcoin', cryptoCurrency, {
  satoshis: 1,
  bits: 1e2,
  BTC: 1e8
}, 'bits')

export const fiatCurrency = UnitType.create('fiat', currency)
export const dollar = UnitType.create('dollar', fiatCurrency, {
  USD: 1,
  cents: 1e-2
}, 'USD')

export const distance = UnitType.create('distance')
export const distanceUS = UnitType.create('distance-us', distance, {
  miles: 5280,
  yards: 3,
  feet: 1,
  inches: 1 / 12
}, 'feet')

export const distanceSI = UnitType.create('distance-si', distance, {
  km: 1e3,
  m: 1,
  cm: 1e-2,
  mm: 1e-3,
  um: 1e-6,
  nm: 1e-9
}, 'm')
