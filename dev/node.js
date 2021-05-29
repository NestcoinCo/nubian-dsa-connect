require('dotenv').config()
const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.ETH_NODE_URL))

const DSA = require("../src/index");

const dsa = new DSA({
    web3: web3,
    mode: "node",
    privateKey: process.env.PRIVATE_KEY,
});