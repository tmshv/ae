import { Value, Block } from 'slate'
import { BlockType } from '../const'

export function getCurrentBlockByType(value: Value, blockType: string): Block | null {
    const block = value.startBlock
    const ancestors = (value.document as any).getAncestors(block.key)

    return ancestors.findLast(p => (p as Block).type === blockType) as Block
}

export function getCurrentCaption(value: Value): Block {
    const block = value.startBlock

    return block && block.type === BlockType.caption
        ? block
        : null
}
