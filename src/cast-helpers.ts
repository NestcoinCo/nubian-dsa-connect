import { TransactionConfig } from 'web3-core'
import DSA from '.'
import { Abi } from './abi'
import { Addresses } from './addresses'
import { Spells } from './spells'
import { wrapIfSpells } from './utils'

type EncodeAbiParams = {
  spells: Spells
  origin?: string
} & Pick<TransactionConfig, 'to'>

export class CastHelpers {
  constructor(private dsa: DSA) {}

  /**
   * Returns the estimated gas cost.
   *
   * @param params.from the from address
   * @param params.to the to address
   * @param params.value eth value
   * @param params.spells cast spells
   */
  estimateGas = async (params: { spells: Spells } & Pick<TransactionConfig, 'from' | 'to' | 'value'>) => {
    const to = params.to ?? this.dsa.instance.address

    if (to === Addresses.genesis)
      throw new Error(
        `Please configure the DSA instance by calling dsa.setInstance(dsaId). More details: https://docs.bxdfi.com/setup`
      )

    const { targets, spells } = this.dsa.internal.encodeSpells(params)
    const args = [targets, spells, this.dsa.origin]
    let from = params.from
    if (!from) {
      const fromFetch = await this.dsa.internal.getAddress()
      from = fromFetch ? fromFetch : ''
    }

    const value = params.value ?? '0'

    const abi = this.dsa.internal.getInterface(Abi.core.versions[this.dsa.instance.version].account, 'cast')

    if (!abi) throw new Error('Abi is not defined.')

    const estimatedGas = await this.dsa.internal.estimateGas({ abi, to, from, value, args })

    return estimatedGas
  }

  /**
   * Returns the encoded cast ABI byte code to send via a transaction or call.
   *
   * @param params.spells The spells instance
   * @param params.to (optional) the address of the smart contract to call
   * @param params.origin (optional) the transaction origin source
   */
  encodeABI = (params: Spells | EncodeAbiParams) => {
    const defaults = {
      to: this.dsa.instance.address,
      origin: this.dsa.origin,
    }

    const mergedParams = Object.assign(defaults, wrapIfSpells(params)) as EncodeAbiParams

    if (mergedParams.to === Addresses.genesis)
      throw new Error(
        `Please configure the DSA instance by calling dsa.setInstance(dsaId). More details: https://docs.bxdfi.com/setup`
      )

    const contract = new this.dsa.config.web3.eth.Contract(
      Abi.core.versions[this.dsa.instance.version].account,
      mergedParams.to
    )

    const { targets, spells } = this.dsa.internal.encodeSpells(mergedParams.spells)

    const encodedAbi: string = contract.methods.cast(targets, spells, mergedParams.origin).encodeABI()
    return encodedAbi
  }

  flashBorrowSpellsConvert = (params: Spells): Spells => {
    const arr = params.data
    const spellsLength = arr.length
    const spells = this.dsa.Spell()
    for (let i = 0; i < spellsLength; i++) {
      const a = arr[i]
      spells.add(a)
    }
    return spells
  }
}
