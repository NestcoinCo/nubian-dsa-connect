// import { config } from 'dotenv'
// import Web3 from 'web3'
// import HDWalletProvider from '@truffle/hdwallet-provider'
// // import hre from 'hardhat'
// // import "@nomiclabs/hardhat-ethers"
// // import '@nomiclabs/hardhat-web3'
// import DSA from '../src'

// config()

// let web3: Web3
// let dsa: DSA
// let account: string
// const provider = new HDWalletProvider(`${process.env.PRIVATE_KEY}`, `https://data-seed-prebsc-1-s1.binance.org:8545/`)

// const accountPrivateKey: any = process.env.PRIVATE_KEY

// const ethAddr = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
// const usdcAddr = '0x9780881bf45b83ee028c4c1de7e0c168df8e9eef'
// const daiAddr = '0xec5dcb5dbf4b114c9d0f65bccab49ec54f6a0867'

// beforeAll(() => {
//   web3 = new Web3(provider)
//   dsa = new DSA({ web3, mode: 'node', privateKey: accountPrivateKey })
// })

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

// describe('DSA v2', function () {
//   test('create new dsa v2', async () => {
//     let dsaAccounts = await dsa.accounts.getAccounts(account)
//     const accountCount = dsaAccounts.length

//     console.log(dsaAccounts)

//     await dsa.build({ version: 2 })

//     dsaAccounts = await dsa.accounts.getAccounts(account)
//     expect(dsaAccounts.length).toEqual(accountCount + 1)

//     const createdDSA = dsaAccounts[dsaAccounts.length - 1]

//     await dsa.setAccount(createdDSA.id)
//     expect(dsa.instance.id).toEqual(createdDSA.id)
//     expect(dsa.instance.version).toEqual(2)
//   })

//   test('Deposit 10 ETH to DSA', async () => {
//     const amt = web3.utils.toWei('10', 'ether')
//     const data = {
//       token: ethAddr,
//       amount: amt,
//       to: dsa.instance.address,
//       from: account,
//     }
//     await dsa.erc20.transfer(data)

//     const balance = await web3.eth.getBalance(dsa.instance.address)
//     expect(balance).toEqual(amt.toString())
//   })

//   test('Swap 1 ETH to USDC', async () => {
//     const spells = dsa.Spell()
//     const amt = web3.utils.toWei('1', 'ether')
//     spells.add({
//       connector: 'PANCAKESWAP-A',
//       method: 'sell',
//       args: [usdcAddr, ethAddr, amt, 0, 0, 0],
//     })

//     const gas = await spells.estimateCastGas({ from: account })
//     expect(gas).toBeDefined()

//     const txHash = await spells.cast({ from: account })
//     expect(txHash).toBeDefined()
//   })

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

//   test('Give USDC allowance', async () => {
//     var data = {
//       token: usdcAddr,
//       amount: '1000000000000',
//       to: dsa.instance.address,
//     }
//     await dsa.erc20.approve(data)

//     const spells = dsa.Spell()

//     spells.add({
//       connector: 'BASIC-A',
//       method: 'deposit',
//       args: [usdcAddr, dsa.maxValue, 0, 0],
//     })

//     const gas = await spells.estimateCastGas({ from: account })
//     expect(gas).toBeDefined()

//     const txHash = await spells.cast({ from: account })
//     expect(txHash).toBeDefined()
//   })

//   test('Swap 1 ETH to USDC #2', async () => {
//     const spells = dsa.Spell()
//     const amt = web3.utils.toWei('1', 'ether')
//     spells.add({
//       connector: 'PANCAKESWAP-A',
//       method: 'sell',
//       args: [usdcAddr, ethAddr, amt, 0, 0, 0],
//     })

//     const gas = await spells.estimateCastGas({ from: account })
//     expect(gas).toBeDefined()

//     const txHash = await spells.cast({ from: account })
//     expect(txHash).toBeDefined()
//   })

//   test('Swap 1 ETH to DAI', async () => {
//     const spells = dsa.Spell()
//     const amt = web3.utils.toWei('1', 'ether')
//     spells.add({
//       connector: 'PANCAKESWAP-A',
//       method: 'sell',
//       args: [daiAddr, ethAddr, amt, 0, 0, 0],
//     })

//     const gas = await spells.estimateCastGas({ from: account })
//     expect(gas).toBeDefined()

//     const txHash = await spells.cast({ from: account })
//     expect(txHash).toBeDefined()
//   })

//   test('Object-oriented Spells', async () => {
//     const spells = dsa.Spell()

//     spells.add({
//       connector: 'BASIC-A',
//       method: 'withdraw',
//       args: [daiAddr, dsa.maxValue, account, 0, 0],
//     })

//     const calldata = await dsa.encodeCastABI(spells)
//     expect(calldata).toBeDefined()

//     const txHash = await spells.cast({ from: account })
//     expect(txHash).toBeDefined()

//     const gas = await spells.estimateCastGas({ from: account })
//     expect(gas).toBeDefined()
//   })

//   test('Swap 1 ETH to USDC #3', async () => {
//     const spells = dsa.Spell()
//     const amt = web3.utils.toWei('1', 'ether')
//     spells.add({
//       connector: 'PANCAKESWAP-A',
//       method: 'sell',
//       args: [usdcAddr, ethAddr, amt, 0, 0, 0],
//     })

//     const gas = await spells.estimateCastGas({ from: account })
//     expect(gas).toBeDefined()

//     const txHash = await spells.cast({ from: account })
//     expect(txHash).toBeDefined()
//   })

//   test('Cast with fluid api', async () => {
//     const txHash = await dsa
//       .Spell()
//       .add({
//         connector: 'BASIC-A',
//         method: 'withdraw',
//         args: [usdcAddr, dsa.maxVal(), account, 0, 0],
//       })
//       .cast({ from: account })

//     expect(txHash).toBeDefined()
//   })

//   test('get transaction count', async () => {
//     const nonce = await dsa.transaction.getTransactionCount(account as string)

//     expect(nonce).toBeDefined()
//   })

//   test('Swap 1 ETH to USDC #4', async () => {
//     const spells = dsa.Spell()
//     const amt = web3.utils.toWei('1', 'ether')
//     spells.add({
//       connector: 'PANCAKESWAP-A',
//       method: 'sell',
//       args: [usdcAddr, ethAddr, amt, 0, 0, 0],
//     })

//     const gas = await spells.estimateCastGas({ from: account })
//     expect(gas).toBeDefined()

//     const txHash = await spells.cast({ from: account })
//     expect(txHash).toBeDefined()
//   })

//   test('Transfer -1 USDC from DSA', async () => {
//     var data = {
//       token: usdcAddr,
//       amount: dsa.maxValue,
//       to: account,
//     }
//     await dsa.erc20.transfer(data)
//   })

//   test('Transfer -1 USDC to DSA', async () => {
//     var data = {
//       token: usdcAddr,
//       amount: dsa.maxValue,
//       to: dsa.instance.address,
//     }
//     await dsa.erc20.transfer(data)
//   })

//   test('Give -1 DAI allowance', async () => {
//     var data = {
//       token: daiAddr,
//       amount: dsa.maxValue,
//       to: dsa.instance.address,
//     }
//     await dsa.erc20.approve(data)
//   })
// })
