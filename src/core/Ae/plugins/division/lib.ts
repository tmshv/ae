import { Value } from 'slate'
import { getCurrentBlockByType } from '../../lib/value'
import { BlockType } from '../../const'

export function inDivision(value: Value): boolean {
    const node = getCurrentBlockByType(value, BlockType.division)

    if (!node) {
        return false
    }

    return node.type === BlockType.division
}
