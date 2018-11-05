import { Value, Block } from 'slate'

export function getCurrentBlockByType(value: Value, blockType: string): Block | null {
    const block = value.startBlock
    const ancestors = value.document.getAncestors(block.key)

    return ancestors.findLast(p => (p as Block).type === blockType) as Block
}
