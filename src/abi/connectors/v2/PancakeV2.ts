import { AbiItem } from 'web3-utils'

export const PancakeV2: AbiItem[] = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"buyToken","type":"address"},{"indexed":true,"internalType":"address","name":"sellToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"buyAmt","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"sellAmt","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"getId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"setId","type":"uint256"}],"name":"LogBuy","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"tokenA","type":"address"},{"indexed":true,"internalType":"address","name":"tokenB","type":"address"},{"indexed":false,"internalType":"uint256","name":"amtA","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amtB","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"uniAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"getId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"setId","type":"uint256"}],"name":"LogDepositLiquidity","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"buyToken","type":"address"},{"indexed":true,"internalType":"address","name":"sellToken","type":"address"},{"indexed":false,"internalType":"uint256","name":"buyAmt","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"sellAmt","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"getId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"setId","type":"uint256"}],"name":"LogSell","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"tokenA","type":"address"},{"indexed":true,"internalType":"address","name":"tokenB","type":"address"},{"indexed":false,"internalType":"uint256","name":"amountA","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountB","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"uniAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"getId","type":"uint256"},{"indexed":false,"internalType":"uint256[]","name":"setId","type":"uint256[]"}],"name":"LogWithdrawLiquidity","type":"event"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"amtA","type":"uint256"},{"internalType":"uint256","name":"amtB","type":"uint256"},{"internalType":"uint256","name":"getId","type":"uint256"},{"internalType":"uint256","name":"setId","type":"uint256"}],"name":"deposit","outputs":[{"internalType":"string","name":"_eventName","type":"string"},{"internalType":"bytes","name":"_eventParam","type":"bytes"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"buyAddr","type":"address"},{"internalType":"address","name":"sellAddr","type":"address"},{"internalType":"uint256","name":"sellAmt","type":"uint256"},{"internalType":"uint256","name":"unitAmt","type":"uint256"},{"internalType":"uint256","name":"getId","type":"uint256"},{"internalType":"uint256","name":"setId","type":"uint256"}],"name":"sell","outputs":[{"internalType":"string","name":"_eventName","type":"string"},{"internalType":"bytes","name":"_eventParam","type":"bytes"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"lpAmt","type":"uint256"},{"internalType":"uint256","name":"getId","type":"uint256"}],"name":"withdraw","outputs":[{"internalType":"string","name":"_eventName","type":"string"},{"internalType":"bytes","name":"_eventParam","type":"bytes"}],"stateMutability":"payable","type":"function"}]