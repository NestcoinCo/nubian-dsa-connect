# NUBIAN DSA Connect ![Build Status](https://nubian-frontend.netlify.app/static/media/logo.cf0483d3.svg)

The official DeFi Smart Account (DSA) Software Development Kit (SDK) for JavaScript, available for browsers and Node.js backends.

## Installation

To get started, install the DSA Connect package from npm:

```bash
npm install nubian-dsa-connect
```

For browsers, via jsDelivr CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/nubian-dsa-connect@latest/dist/index.bundle.js"></script>
```

### Usage

To enable web3 calls via SDK, instantiate [web3 library](https://github.com/ChainSafe/web3.js#installation)

```js
// in browser
if (window.ethereum) {
  window.web3 = new Web3(window.ethereum)
} else if (window.web3) {
  window.web3 = new Web3(window.web3.currentProvider)
} else {
  window.web3 = new Web3(customProvider)
}
```

```js
// in nodejs
const Web3 = require('web3')
const DSA = require('nubian-dsa-connect')
const web3 = new Web3(new Web3.providers.HttpProvider(ETH_NODE_URL))
```

Now instantiate DSA with web3 instance.

```js
// in browser
const dsa = new DSA(web3)

// in nodejs
const dsa = new DSA({
  web3: web3,
  mode: 'node',
  privateKey: PRIVATE_KEY,
})
```

## Setting up DSA Accounts

Every user needs to create Smart Account to interact with DeFi Protocols seamlessly; this allows developers to build extensible use-cases with maximum security and composability. You can also create multiple account for a single address.

To get started using the SDK, you must do one or all of the following:

- Create Smart Account - `build()`
- Fetch Smart Accounts - `getAccounts()`
- Set Smart Account - `setInstance()`
- Set Account Name - `setAccountName()`

### build()

This creates a uniquely numbered Smart Account which acts as a proxy to interact with verified DeFi protocols and each DSA has a unique ethereum address. If the account is already created, you can use the `setInstance` method to activate a paricular DSA account and start casting spells.

```js
// in async functions
await dsa.build()

// or
dsa.build().then(console.log)
```

The build method also accepts an optional parameters as shown below:

```js
dsa.build({
  gasPrice: gasPrice // estimated gas price
  origin: origin,
  authority: authority,
})
```

> View this [Gist](https://gist.github.com/nonseodion/39f9c7a46b122131e8cec95ad4350cf0) for estimation of gas price

#### Parameters

| **Parameter** | **Type**        | **Description** | **Default** |
| ------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| gasPrice    | `string/number` | The gas price in gwei. Mostly used in Node implementation to configure the transaction confirmation speed. | Not optional in Node and estimated in other modes.  |
| origin      | `address`       | The address to track the origin of transaction. Used for analytics and affiliates.|  `0x0` |
| authority   | `address`       | The DSA authority. The address to be added as authority. An authority has control over the DSA created. | Address of the connected wallet, private key address or public key in Browser, Node and Simulation modes respectively. |
| from        | `address`       | The account with which you want to create your DSA. This is helpful to create DSA for other addresses. | Same as authority. |
| nonce       | `string/number` | Nonce of your sender account. Mostly used in Node implementation to send transaction with a particular nonce either to override unconfirmed transaction or some other purpose. |  Used only in Node. |
| version       | `string/number` | The DSA version to create. | 2 |

#### Returns

This function returns a promise that resolves to the transaction receipt when the transaction is mined.

### getAccounts()

Fetch all the accounts owned by an ethereum address by calling `getAccounts()`.

```js
// in async functions
await dsa.getAccounts(address)

// or
dsa.getAccounts(address).then(console.log)
```

#### Parameter

| **Parameter** | **Type**  | **Description**      |
| ------------- | --------- | -------------------- |
| address     | `address` | An ethereum address. |

#### Returns

The method returns a promise that resolves to an array of objects with all the DSA accounts where `address` is authorised. Here's how it looks:

```js
[
  {
      id: 52, // DSA ID
      address: "0x...", // DSA Address
      version: 2 // DSA version
  },
  ...
]
```


### setAccountName()

This Updates the Smart Account with an easily identifiable name. 
```js
dsa.setAccountName(dsaId, "My Smart Account")
```
Every smart account has a default name of **Account#dsaId** if a custom name has not been set for it yet.


### setInstance()

Be sure to configure global values by calling `setInstance()`. You can get the id of the DSA by calling `getAccounts()`. The configured account will be used for all subsequent calls.

```js
dsa.setInstance(dsaId) // DSA ID
```

#### Parameter

| **Parameter** | **Type** | **Description**                |
| ------------- | -------- | ------------------------------ |
| dsaId       | `Number` | DSA ID to be used for casting spells. |

#### Returns

This method returns a promise that resolves to the newly set instance. Here's how it looks:

```js
  {
    id: 0, // DSA ID
    address: "0x...", // Address of DSA
    version: 2, // Version of DSA
    chainId: 56,
  }
```

## Casting Spells

**Spells** denotes a sequence of connector functions that will achieve a given use case. Spells can comprise of any number of functions across any number of connectors.

With this SDK, performing DeFi operations on your dapp consists of creating a `spells` instance to add transactions. Here is where you can initiate complex transactions amongst different protocols.

Create an instance:

```js
let spells = dsa.Spell()
```

Add **spells** that you want to execute. Think of any action, and by just adding new SPELLS, you can wonderfully CAST transactions across protocols. Let's try to execute the following actions:

1. Deposit 1 BNB in the DSA.
2. Deposit 1 BNB in Venus protocol.
3. Borrow 100 USDC from Venus.
4. Deposit borrowed USDC in Venus.

```js
// Deposit BNB in DSA

spells.add({
  connector: "BASIC-A",
  method: "deposit",
  args: [
    "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    "1000000000000000000", // 1 BNB (10^18 wei)
    0,
    0
  ]
})


// Deposit BNB in Venus

spells.add({
  connector: "VenusV2",
  method: "deposit",
  args: [
    "BNB-A",
    "1000000000000000000", // 1 BNB (10^18 wei)
    0,
    0
  ]
})

// Borrow USDC from Venus

spells.add({
  connector: "VenusV2",
  method: "borrow",
  args: [
    "USDC-A",
    "100000000000000000000", // 100 USDC (10^18 wei)
    0,
    0
  ]
})

// Deposit USDC in Venus

spells.add({
  connector: "VenusV2",
  method: "deposit",
  args: [
    "USDC-A",
    "100000000000000000000", // 100 USDC (10^18 wei)
    0,
    0
  ]
})
```

At last, cast your spell using `cast()` method.

```js
// in async functions
let transactionReceipt = await spells.cast({value: "1000000000000000000"})

// or
spells.cast().then(console.log) // returns transaction receipt
```

You can pass an object to send **optional** parameters like sending ETH along with the transaction like we did above to deposit in the DSA.

```js
spells.cast({
  gasPrice: web3.utils.toWei(gasPrice, 'gwei'), // in gwei, used in node implementation.
  value: '1000000000000000000', // sending 1 BNB along with the transaction.
  nonce: nonce,
})
```

Here are the optional parameters, they have the same defaults as their counterparts in `dsa.build()`.

| **Parameter (optional)** | **Type**        | **Description**                                                                                                                                                                |
| ------------------------ | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| gasPrice               | `string/number` | The gas price in gwei. Mostly used in Node implementation to configure the transaction confirmation speed.                                                                     |
| value                  | `string/number` | Amount of BNB which you want to send along with the transaction (in wei).                                                                                                      |
| nonce                  | `string/number` | Nonce of your sender account. Mostly used in Node implementation to send transaction with a particular nonce either to override unconfirmed transaction or some other purpose. |

This will send the transaction to blockchain in node implementation (or ask users to confirm the transaction on web3 wallets like Metamask).

## Transactions

You can see the list of transactions by an address:
```js
dsa.getAccountTransactions("0x00");
```
Replace `0x0` with the address of the DSA account.


## Connectors

| **Name** | **Address** |
|-----|------|
| **AUTHORITY-A** | 0x2183550a2afE501BcB42CA6e08531685624ee2B4 |
| **BASIC-A** | 0xC2e1c0fc0A2c0126AD5222D6eB2453c6aEc1e637 |
| **PancakeV2** | 0x546bde105B24147bbd34F3147a0FD68961515Feb |
| **VenusV2** | 0xB03308Fa6A1Ecb489ECC86B7e930491020ee2b96 |
| **AutofarmV2** | 0x82aB4bCD90E99f31a90201669AACC6867c9c3B77 |
| **NubianStaking** | 0x0764C090a14E45Ae23F69732BeB28504f89D669A |
