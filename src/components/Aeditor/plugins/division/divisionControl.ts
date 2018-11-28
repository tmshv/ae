import { Change } from 'slate'
import { inDivision } from './lib'
import { getCurrentBlockByType } from '../../lib/value'
import { BlockType } from '../../const'

// function isMatch(event: KeyboardEvent): boolean {
//     // const m = ['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft']
//     const m = ['ArrowDown', 'ArrowUp']

//     return m.includes(event.key)
// }

// function getDirection(event: KeyboardEvent): number {
//     return event.key === 'ArrowUp'
//         ? -1
//         : +1
// }

function isMatch(event: KeyboardEvent, keys: string[]): boolean {
    return keys.includes(event.key)
}

function getDirection(event: KeyboardEvent): number {
    return event.key === 'ArrowUp'
        ? -1
        : +1
}

function onUpDown(event: KeyboardEvent, change: Change) {
    return null
    // onKeyDown(event: KeyboardEvent, change: Change) {
    //     if (!isMatch(event)) {
    //         return null
    //     }

    //     const value = change.value

    //     if (!inDivision(value)) {
    //         return null
    //     }

    //     event.preventDefault()

    //     const direction = -1// getDirection(event)
    //     const node = getCurrentBlockByType(value, BlockType.division)

    //     const newBlock = direction < 0
    //         ? value.document.getPreviousSibling(node.key)
    //         : value.document.getNextSibling(node.key)

    //     return change.collapseToStartOf(newBlock)
    // }
}

function onRightLeft(event: KeyboardEvent, change: Change) {
    event.preventDefault()

    const { value } = change

    // const direction = -1// getDirection(event)
    const block = getCurrentBlockByType(value, BlockType.division)

    // const r = value.document.getBlocksAtRange(value.selection)
    const r = value.document.getClosestBlock(block.key)

    console.log(r)

    return null

    // block.nodes.in

    // const newBlock = direction < 0
    //     ? value.document.getPreviousSibling(node.key)
    //     : value.document.getNextSibling(node.key)

    // return change.collapseToStartOf(newBlock)
}

export default function divisonControl() {
    return {
        onKeyDown(event: KeyboardEvent, change: Change) {
            if (!inDivision(change.value)) {
                return null
            }

            if (isMatch(event, ['ArrowRight', 'ArrowLeft'])) {
                return onRightLeft(event, change)
            } else if (isMatch(event, ['ArrowUp', 'ArrowDown'])) {
                return onUpDown(event, change)
            }

            return null
        }
    }
}
