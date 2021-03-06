const Block = require('./block')

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()]
  }

  addBlock(data) {
    const lastBlock = this.chain[this.chain.length - 1]
    const block = Block.mineBlock(lastBlock, data)

    this.chain.push(block)

    return block
  }

  isValidChain(chain) {
    const isGenesisBlockValid = JSON.stringify(chain[0]) === JSON.stringify(Block.genesis())

    if (!isGenesisBlockValid) return false

    for (let i = 1; i < chain.length; i++) {
      const block = chain[i]
      const lastBlock = chain[i - 1]

      if (block.lastHash !== lastBlock.hash || block.hash !== Block.blockHash(block)) return false
    }

    return true
  }

  replaceChain(newChain) {
    if (newChain.length <= this.chain.length) {
      return console.log('Received chain is not longer than the current chain.')
    }

    if (!this.isValidChain(newChain)) {
      return console.log('The received chain is not valid.')
    }

    console.log('Replacing blockchain with the new chain.')

    this.chain = newChain
  }
}

module.exports = Blockchain
