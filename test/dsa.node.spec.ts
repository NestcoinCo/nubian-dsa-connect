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
let gasPrice: string = '20000000000'

//change url to localhost when using the fork of the mainnet
const provider = new HDWalletProvider(`${process.env.PRIVATE_KEY}`, `https://bsc-dataseed.binance.org/`)

const accountPrivateKey: any = process.env.PRIVATE_KEY

const bnbAddr = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
const daiAddr = '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3'
const busdAddr = '0xe9e7cea3dedca5984780bafc599bd69add087d56'

beforeAll(() => {
  web3 = new Web3(provider)
  dsa = new DSA({ web3, mode: 'node', privateKey: accountPrivateKey })
})

// describe('Basic', function () {
//   test('initalization of DSA', () => {
//     expect(dsa).toBeDefined()
//   })

//   test('get web3 accounts', async () => {
//     const accounts = await web3.eth.getAccounts()

//     console.log(accounts, 'accounts')
//     const dsa_account = await dsa.internal.getAddress()
//     console.log(dsa_account, accounts[0])
//     account = accounts[0]
//   })
// })

describe('DSA v2', function () {
  // test('create new dsa v2', async () => {
  //   const spells = dsa.Spell()
  //   const amt = web3.utils.toWei('1', 'ether')
  
  //   var data = {
  //     token: busdAddr,
  //     amount: amt,
  //     to: dsa.instance.address,
  //     from: account,
  //     gasPrice,
  //   }
  //   await dsa.erc20.approve(data)
  //   console.log('approve busd for dsa')

  //   await dsa.erc20.transfer(data)
  //   console.log('deposit busd for dsa')

  //   spells.add({
  //     connector: 'PancakeV2',
  //     method: 'deposit',
  //     args: [daiAddr,busdAddr,amt,amt,0,0,0],
  //   })
 
  //   const gas = await spells.estimateCastGas({ from: account })
  //   expect(gas).toBeDefined()

  //   let nonce = await web3.eth.getTransactionCount(account)

  //   const calldata = await dsa.encodeCastABI(spells)
  //   expect(calldata).toBeDefined()

  //   const txHash = await dsa.cast({ spells: spells, from: account })
  //   console.log(txHash, 'transaction hash')
  //   //const txHash = await spells.cast({ from: account, gasPrice, nonce: nonce })
  //   expect(txHash).toBeDefined()
  // }, 10000000)

  //   test('create new dsa v2', async () => {
  //   let dsaAccounts = await dsa.accounts.getAccounts(account)

  //   console.log(dsaAccounts, 'here')

  //   const accountCount = dsaAccounts.length

  //   console.log(accountCount, 'number of dsa created')

  //   console.log(dsaAccounts, 'amount of dsa accounts')

  //   await dsa.build({ version: 2, gasPrice })

  //   dsaAccounts = await dsa.accounts.getAccounts(account)

  //   const createdDSA = dsaAccounts[dsaAccounts.length - 1]

  //   console.log(createdDSA, 'created DSA')
  //   await dsa.setAccount(createdDSA.id)
  //   expect(dsa.instance.id).toEqual(createdDSA.id)
  //   expect(dsa.instance.version).toEqual(2)
  // }, 10000000)

  // test('Deposit 0.01 bnb to DSA', async () => {
  //   const amt = web3.utils.toWei('0.001', 'ether')

  //   console.log(dsa.instance.address, 'dsa instance')
  //   const data = {
  //     token: bnbAddr,
  //     amount: amt,
  //     to: dsa.instance.address,
  //     from: account,
  //     gasPrice,
  //   }
  //   await dsa.erc20.transfer(data)

  //   const balance = await web3.eth.getBalance(dsa.instance.address)

  //   console.log(balance, 'lamba')

  //   console.log(balance, 'balance of dsa')
  //   // expect(balance).toEqual(amt.toString())
  // }, 1000000)

  // test('lend 1 busd with dsa, borrow 0.1 busd, withdraw money lended and payback borrow', async () => {
  //   const spells = dsa.Spell()
  //   const lendAmt = web3.utils.toWei('1.3', 'ether')
  //   const borrowAmt = web3.utils.toWei('0.3', 'ether')
  //   const withdrawAmt = web3.utils.toWei('0.8', 'ether')

  //   var data = {
  //     token: busdAddr,
  //     amount: lendAmt,
  //     to: dsa.instance.address,
  //     from: account,
  //     gasPrice,
  //   }
  //   await dsa.erc20.approve(data)
  //   console.log('approve busd for dsa')

  //   await dsa.erc20.transfer(data)
  //   console.log('deposit busd for dsa')

  //   spells.add({
  //     connector: 'VenusV2',
  //     method: 'deposit',
  //     args: ['BUSD-A', lendAmt, dsa.instance.id, dsa.instance.id],
  //   })
  //   console.log('deposit money into venus')
  //   spells.add({
  //     connector: 'VenusV2',
  //     method: 'borrow',
  //     args: ['BUSD-A', borrowAmt, dsa.instance.id, dsa.instance.id],
  //   })
  //   console.log('borrow money f  rom venus')
  //   spells.add({
  //     connector: 'VenusV2',
  //     method: 'withdraw',
  //     args: ['BUSD-A', withdrawAmt, dsa.instance.id, dsa.instance.id],
  //   })
  //   console.log('withdraw money from venus')
  //   spells.add({
  //     connector: 'VenusV2',
  //     method: 'payback',
  //     args: ['BUSD-A', borrowAmt, dsa.instance.id, dsa.instance.id],
  //   })

  //   console.log('payback money to venus')

  //   const gas = await spells.estimateCastGas({ from: account })
  //   expect(gas).toBeDefined()

  //   let nonce = await web3.eth.getTransactionCount(account)

  //   const calldata = await dsa.encodeCastABI(spells)
  //   expect(calldata).toBeDefined()

  //   const txHash = await dsa.cast({ spells: spells, from: account })
  //   console.log(txHash, 'transaction hash')
  //   //const txHash = await spells.cast({ from: account, gasPrice, nonce: nonce })
  //   expect(txHash).toBeDefined()
  // }, 100000)

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

   test('Get Account Transactions', async () => {
    await dsa.getAccountTransactions("0x3e0fD2618C545A70758BCd14D746a6377fe91ccF");
  })
})
