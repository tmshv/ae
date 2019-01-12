import { Block, Text } from 'slate'
import { BlockType } from '../const'
import { List } from 'immutable'

export default function createParagraph(text: string): Block {
    const node = Text.create(text)
    const nodes = List([node]).toList()

    return Block.create({
        type: BlockType.paragraph,
        nodes,
    })
}
