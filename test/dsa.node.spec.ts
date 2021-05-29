import { config } from 'dotenv'
import Web3 from 'web3'
import HDWalletProvider from '@truffle/hdwallet-provider'
// import hre from 'hardhat'
// import "@nomiclabs/hardhat-ethers"
// import '@nomiclabs/hardhat-web3'
import DSA from '../src'

config()

let web3: Web3
let dsa: DSA
let account: string
let gasPrice: string = '500000000000'

const provider = new HDWalletProvider(`${process.env.PRIVATE_KEY}`, `https://data-seed-prebsc-1-s1.binance.org:8545/`)

const accountPrivateKey: any = process.env.PRIVATE_KEY

console.log(accountPrivateKey, 'lol')

const bnbAddr = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
const usdcAddr = '0x16227D60f7a0e586C66B005219dfc887D13C9531'
const daiAddr = '0xec5dcb5dbf4b114c9d0f65bccab49ec54f6a0867'
const busdAddr = ''

beforeAll(() => {
  web3 = new Web3(provider)
  dsa = new DSA({ web3, mode: 'node', privateKey: accountPrivateKey })

  console.log(dsa, 'dsa instancee')
})

describe('Basic', function () {
  test('initalization of DSA', () => {
    expect(dsa).toBeDefined()
  })

  test('get web3 accounts', async () => {
    const accounts = await web3.eth.getAccounts()

    console.log(accounts, 'accounts')
    const dsa_account = await dsa.internal.getAddress()
    console.log(dsa_account, accounts[0])
    account = accounts[0]
  })
})

describe('DSA v2', function () {
  test('create new dsa v2', async () => {
    let dsaAccounts = await dsa.accounts.getAccounts(account)

    console.log(dsaAccounts, 'here')

    const accountCount = dsaAccounts.length

    console.log(accountCount, 'number of dsa created')

    const balance = await web3.eth.getBalance(dsaAccounts[9].address)

    let balanceToDecimal = web3.utils.fromWei(balance, 'ether')

    console.log(`${balanceToDecimal}BNB , 'balance of dsa'`)

    console.log(balance, 'balance of the last account')

    console.log(dsaAccounts, 'amount of dsa accounts')

    await dsa.build({ version: 2, gasPrice })

    dsaAccounts = await dsa.accounts.getAccounts(account)

    const createdDSA = dsaAccounts[dsaAccounts.length - 1]

    console.log(createdDSA, 'created DSA')
    await dsa.setAccount(createdDSA.id)
    expect(dsa.instance.id).toEqual(createdDSA.id)
    expect(dsa.instance.version).toEqual(2)
  })

  test('Deposit 5 bnb to DSA', async () => {
    const amt = web3.utils.toWei('2', 'ether')

    console.log(dsa.instance.address, 'dsa instance')
    const data = {
      token: bnbAddr,
      amount: amt,
      to: dsa.instance.address,
      from: account,
      gasPrice,
    }
    await dsa.erc20.transfer(data)

    const balance = await web3.eth.getBalance(dsa.instance.address)

    console.log(dsa.instance.address)

    console.log(balance, 'balance of dsa')
    // expect(balance).toEqual(amt.toString())
  })

  // test('Swap 2 busd to dai', async () => {
  //   const spells = dsa.Spell()
  //   const amt = web3.utils.toWei('1', 'ether')
  //   spells.add({
  //     connector: 'PANCAKESWAP-A',
  //     method: 'sell',
  //     args: [daiAddr, busdAddr, amt, 0, 0, 0],
  //   })

  //   const gas = await spells.estimateCastGas({ from: account })
  //   expect(gas).toBeDefined()

  //   const txHash = await spells.cast({ from: account, gasPrice })
  //   expect(txHash).toBeDefined()
  // })

  // test('Give USDC allowance and deposit to smart account', async () => {
  //   var data = {
  //     token: usdcAddr,
  //     amount: '1000000000000',
  //     to: dsa.instance.address,
  //     gasPrice,
  //   }
  //   await dsa.erc20.approve(data)

  //   const spells = dsa.Spell()

  //   spells.add({
  //     connector: 'BASIC-A',
  //     method: 'deposit',
  //     args: [usdcAddr, dsa.maxValue, 0, 0],
  //   })

  //   const gas = await spells.estimateCastGas({ from: account })
  //   expect(gas).toBeDefined()

  //   const txHash = await spells.cast({ from: account, gasPrice })
  //   expect(txHash).toBeDefined()
  // })

  //   test('Withdraw USDC from DSA', async () => {
  //     const spells = dsa.Spell()

  //     spells.add({
  //       connector: 'BASIC-A',
  //       method: 'withdraw',
  //       args: [usdcAddr, dsa.maxValue, account, 0, 0],
  //     })

  //     const gas = await spells.estimateCastGas({ from: account })
  //     expect(gas).toBeDefined()

  //     const txHash = await spells.cast({ from: account })
  //     expect(txHash).toBeDefined()
  //   })

  // test('Swap 1 ETH to USDC #2', async () => {
  //   const spells = dsa.Spell()
  //   const amt = web3.utils.toWei('1', 'ether')
  //   spells.add({
  //     connector: 'PANCAKESWAP-A',
  //     method: 'sell',
  //     args: [usdcAddr, ethAddr, amt, 0, 0, 0],
  //   })

  //   const gas = await spells.estimateCastGas({ from: account })
  //   expect(gas).toBeDefined()

  //   const txHash = await spells.cast({ from: account, gasPrice })
  //   expect(txHash).toBeDefined()
  // })

  // test('Swap 1 ETH to DAI', async () => {
  //   const spells = dsa.Spell()
  //   const amt = web3.utils.toWei('1', 'ether')
  //   spells.add({
  //     connector: 'PANCAKESWAP-A',
  //     method: 'sell',
  //     args: [daiAddr, ethAddr, amt, 0, 0, 0],
  //   })

  //   const gas = await spells.estimateCastGas({ from: account })
  //   expect(gas).toBeDefined()

  //   const txHash = await spells.cast({ from: account, gasPrice })
  //   expect(txHash).toBeDefined()
  // })

  // test('Swap 1 ETH to USDC #4', async () => {
  //   const spells = dsa.Spell()
  //   const amt = web3.utils.toWei('1', 'ether')
  //   spells.add({
  //     connector: 'PANCAKESWAP-A',
  //     method: 'sell',
  //     args: [usdcAddr, ethAddr, amt, 0, 0, 0],
  //   })

  //   const gas = await spells.estimateCastGas({ from: account })
  //   expect(gas).toBeDefined()

  //   const txHash = await spells.cast({ from: account, gasPrice })
  //   expect(txHash).toBeDefined()
  // })

  // test('Transfer -1 USDC from DSA', async () => {
  //   var data = {
  //     token: usdcAddr,
  //     amount: dsa.maxValue,
  //     to: account,
  //     gasPrice,
  //   }
  //   await dsa.erc20.transfer(data)
  // })

  // test('Transfer -1 USDC to DSA', async () => {
  //   var data = {
  //     token: usdcAddr,
  //     amount: dsa.maxValue,
  //     to: dsa.instance.address,
  //     gasPrice,
  //   }
  //   await dsa.erc20.transfer(data)
  // })

  // test('Give -1 DAI allowance', async () => {
  //   var data = {
  //     token: daiAddr,
  //     amount: dsa.maxValue,
  //     to: dsa.instance.address,
  //     gasPrice,
  //   }
  //   await dsa.erc20.approve(data)
  // })
})
