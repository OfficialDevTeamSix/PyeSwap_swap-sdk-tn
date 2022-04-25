import JSBI from 'jsbi'

// exports for external consumption
export type BigintIsh = JSBI | bigint | string

export enum ChainId {
  MAINNET = 56,
  TESTNET = 97
}

export enum TradeType {
  EXACT_INPUT,
  EXACT_OUTPUT
}

export enum Rounding {
  ROUND_DOWN,
  ROUND_HALF_UP,
  ROUND_UP
}

type ChainAddress = {
  [chainId in ChainId]: string
}
export const FACTORY_ADDRESS: ChainAddress = {
  [ChainId.MAINNET]: "0x96A3CbC01DFe417813258Feb50E2FdF3e2eF55F9",
  [ChainId.TESTNET]: "0x8cBf1bf3ea89662E731F11B8c2017D50Dd6be6ec"
}

export const INIT_CODE_HASH: ChainAddress = {
  [ChainId.MAINNET]: "0xab961676494e961ecba9fbe27506f1ac94f0422d35a7a2cbf1b3077f2945ef59",
  [ChainId.TESTNET]: '0xab961676494e961ecba9fbe27506f1ac94f0422d35a7a2cbf1b3077f2945ef59'
}

export const MINIMUM_LIQUIDITY = JSBI.BigInt(1000)

// exports for internal consumption
export const ZERO = JSBI.BigInt(0)
export const ONE = JSBI.BigInt(1)
export const TWO = JSBI.BigInt(2)
export const THREE = JSBI.BigInt(3)
export const FIVE = JSBI.BigInt(5)
export const TEN = JSBI.BigInt(10)
export const _100 = JSBI.BigInt(100)
export const _9975 = JSBI.BigInt(9975)
export const _8575 = JSBI.BigInt(8575)
export const _10000 = JSBI.BigInt(10000)
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export enum SolidityType {
  uint8 = 'uint8',
  uint256 = 'uint256'
}

export const SOLIDITY_TYPE_MAXIMA = {
  [SolidityType.uint8]: JSBI.BigInt('0xff'),
  [SolidityType.uint256]: JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
}
