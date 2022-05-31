const hre = require('hardhat')

const feeToSetter = '0x2cD3d676F4C53D645aa523cadBf00BA049f4E8eB'

async function main() {
  const WETH = await hre.ethers.getContractFactory('WETH')
  const weth = await WETH.deploy()
  await weth.deployed()
  console.log(`WETH token address: ${weth.address}`)

  const WETH_TOKEN_ADDRESS = weth.address

  const SolidSwapV2ERC20 = await hre.ethers.getContractFactory(
    'SolidSwapV2ERC20',
  )
  const solidSwapV2ERC20 = await SolidSwapV2ERC20.deploy()
  await solidSwapV2ERC20.deployed()
  console.log(`SolidSwap token address: ${solidSwapV2ERC20.address}`)

  const SolidSwapV2Factory = await hre.ethers.getContractFactory(
    'SolidSwapV2Factory',
  )
  const solidSwapV2Factory = await SolidSwapV2Factory.deploy(feeToSetter)
  await solidSwapV2Factory.deployed()
  console.log(`SolidSwapV2Factory address: ${solidSwapV2Factory.address}`)

  const factory = solidSwapV2Factory.address

  const SolidSwapV2Router = await hre.ethers.getContractFactory(
    'SolidSwapV2Router',
  )
  const solidSwapV2Router = await SolidSwapV2Router.deploy(
    factory,
    WETH_TOKEN_ADDRESS,
  )
  await solidSwapV2Router.deployed()
  console.log(`SolidSwapV2Router address: ${solidSwapV2Router.address}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
