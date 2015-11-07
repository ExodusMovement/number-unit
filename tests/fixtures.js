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
