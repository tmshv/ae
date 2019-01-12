import { Change, Block } from 'slate'

export function insertOrReplaceBlock(change: Change, block: Block): Change {
    const value = change.value

    if (value.selection.isCollapsed) {
        const key = (value.selection as any).focusKey
        // const currentBlock = value.document.getFurthestBlock(key)
        const currentBlock = value.document.getClosestBlock(key)

        if (!currentBlock.text) {
            return change.replaceNodeByKey(currentBlock.key, block)
        }
    }

    return change.insertBlock(block)
}