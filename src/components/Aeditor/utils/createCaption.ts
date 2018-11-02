import { Block, Text } from 'slate'
import { BlockType } from '../const'
import { List } from 'immutable'

export default function createCaption(caption: string): Block {
    const node = Text.create(caption)
    const nodes = List([node]).toList()

    return Block.create({
        type: BlockType.caption,
        nodes,
    })
}
