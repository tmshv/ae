import { Block } from 'slate'
import { BlockType } from '../const'
import { Range } from 'immutable'
import createParagraph from './createParagraph'

export default function createDivision(div: number): Block {
    const nodes = Range(0, div)
        .map(x => createParagraph(`${x}`))
        .toList()

    return Block.create({
        type: BlockType.division,
        nodes,
    })
}
