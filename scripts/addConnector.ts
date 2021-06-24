/**
 * steps to add a connector to the sdk
 * 1) Add connector address in this file under connectors object with key as connector_name and value as connector_address. Eg: curve_susd: "0x..."
 * 2) Create a new ts file in this folder with the same connector_name as file name. Eg: curve_susd.ts
 * 3) In curve_susd.ts, create a variable with same name as the file name and assign the ABI to that variable. Eg:
 * import { AbiItem } from 'web3-utils'
 * export const curve_susd: AbiItem[] = CONNECTOR_ABI
 */

import Web3 from 'web3'
import inquirer from 'inquirer'
import { connectorsV2_M1 as mConnectorsV2_M1 } from '../src/addresses/mainnet/connectorsV2_M1'
import { Obj, checkFile, getAbiDir, getAbiPath, getAbiTemplate, mainnetAddressV2Path, getABI } from './utils'
import fs from 'fs'

const mainnetConnectorsV2 = mConnectorsV2_M1 as Obj
let connectorsV1Template = `export const connectorsV1 = `
let connectorsV2Template = `export const connectorsV2_M1 = `

const abiChoices = ['From Address (Only for Mainnet)', 'From JSON File Path', 'From JSON (via URL)']
const questions = [
  {
    type: 'input',
    name: 'name',
    message: 'Enter the connector name? (ex: curve_claim or 1INCH-A)',
    validate: (connectorName: string) => !!connectorName || 'Connector name is required!',
  },
  {
    type: 'input',
    name: 'variable_name',
    message: 'Enter the connector variable name? (ex: curve_claim or ONEINCH_A)',
    validate: (name: string) => {
      try {
        Function('var ' + name)
      } catch (_) {
        return false || 'Connector variable name is required!'
      }
      return true
    },
  },
  {
    type: 'list',
    name: 'version',
    message: "What's the connector version?",
    choices: [1, 2],
  },
  {
    type: 'input',
    name: 'address',
    message: "What's the connector address?",
    validate: (address: string) => Web3.utils.isAddress(address) || 'Enter a valid address!',
  },
  {
    type: 'list',
    name: 'chain',
    message: 'Which Chain?',
    choices: ['Mainnet', 'Polygon'],
  },
  {
    type: 'list',
    name: 'abi_type',
    message: 'How to get the ABI?',
    choices: abiChoices,
  },
]

;(async () => {
  const answers = await inquirer.prompt(questions)
  const abi_idx = abiChoices.indexOf(answers.abi_type)
  if (answers.chain === 'Polygon' && abi_idx === 0) {
    console.log('\n\n❌ Sorry but Fetching ABI from address only works with Mainnet ❌\n')
    process.exit(0)
  }

  const abi = await getABI(abi_idx, answers)
  await checkFile(getAbiPath(answers))

  if (answers.chain === 'Mainnet') {
    if (mainnetConnectorsV2[answers.name]) {
      throw new Error('Mainnet Connectors V2 already contains ' + answers.name)
    }
    mainnetConnectorsV2[answers.name] = answers.address
    connectorsV2Template += JSON.stringify(mainnetConnectorsV2, null, 4)

    // save the file
    fs.writeFileSync(mainnetAddressV2Path, connectorsV2Template)
    console.log(`🚀 ${mainnetAddressV2Path} [updated]`)
  }

  const abiFileContent = getAbiTemplate(answers.variable_name, abi)
  await fs.writeFileSync(getAbiPath(answers), abiFileContent)
  console.log(`🚀 ${getAbiPath(answers)} [created]`)

  const abiDir = getAbiDir(answers)

  const content = fs.readFileSync(`${abiDir}/index.ts`, 'utf-8')
  const match = /export/.exec(content)!
  let beforeExport = content.slice(0, match.index).trim()
  let afterExport = content.slice(match.index, content.length).split(`{\n`)
  beforeExport += `\nimport {${answers.variable_name}} from './${answers.name}'`

  const final = `${beforeExport}\n${afterExport[0]}{\n    "${answers.name}": ${answers.variable_name},\n${afterExport[1]}`

  // save the file
  await fs.writeFileSync(`${abiDir}/index.ts`, final)
  console.log(`🚀 ${abiDir}/index.ts [updated]`)
})()
