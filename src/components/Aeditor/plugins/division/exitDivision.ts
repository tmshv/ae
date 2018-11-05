import { Change, Text, Block } from 'slate'
import { BlockType } from '../../const'
import { List } from 'immutable'
import { getCurrentBlockByType } from '../../lib/value'
import { inDivision } from './lib'

interface IExitDivisionOptions {
    exitBlockType: string,
    exitKey: string,
    metaKey: boolean,
}

function isMatch(event: KeyboardEvent, options: IExitDivisionOptions): boolean {
    if (options.metaKey !== event.metaKey) {
        return false
    }

    if (event.key !== options.exitKey) {
        return false
    }

    return true
}

export default function exitDivison(options: IExitDivisionOptions) {
    return {
        onKeyDown(event: KeyboardEvent, change: Change) {
            if (!isMatch(event, options)) {
                return null
            }

            const value = change.value

            if (!inDivision(value)) {
                return null
            }

            event.preventDefault()

            const block = getCurrentBlockByType(value, BlockType.division)
            const blockParent = value.document.getParent(block.key) as Block

            const insertionIndex = blockParent.nodes.indexOf(block) + 1

            const exitBlock = Block.create({
                type: options.exitBlockType,
                nodes: List([Text.create('')]).toList(),
            })

            return change
                .insertNodeByKey(blockParent.key, insertionIndex, exitBlock)
                .collapseToStartOf(exitBlock)
        }
    }
}
