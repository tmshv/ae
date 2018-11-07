import { Change } from 'slate'
import { BlockType } from '../../const'

export function wrapInAccent(change: Change): Change {
    return change.wrapBlock(BlockType.accent)
}

export function unwrapAccent(change: Change): Change {
    return change.unwrapBlock(BlockType.accent)
}
