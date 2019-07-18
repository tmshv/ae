import { Block } from 'slate'
import { BlockType } from '../const'
import { List } from 'immutable'

export default function createFigure(nodes: List<Block>): Block {
    return Block.create({
        type: BlockType.figure,
        nodes,
    })
}
