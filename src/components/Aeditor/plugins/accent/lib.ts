import { Value } from 'slate'
import { getCurrentBlockByType } from '../../lib/value'
import { BlockType } from '../../const'

export function isSelectionInAccent(value: Value): boolean {
    const node = getCurrentBlockByType(value, BlockType.accent)

    if (!node) {
        return false
    }

    return node.type === BlockType.accent
}
