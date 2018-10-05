import { Block } from 'slate'
import { BlockType } from '../const'

export default function createFigure(nodes): Block {
    return Block.create({
        type: BlockType.figure,
        nodes,
    })
}
