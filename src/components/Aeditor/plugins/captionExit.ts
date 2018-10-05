import { Change, Text, Block, Value } from 'slate'
import { BlockType } from '../const'
import { List } from 'immutable'

export interface ICaptionExitOptions {
    exitBlockType: string,
    exitKey: string,
}

function getCurrentCaption(value: Value): Block {
    const block = value.startBlock

    return block && block.type === BlockType.caption
        ? block
        : null
}

function getCurrentFigure(value: Value): Block {
    const block = value.startBlock
    const ancestors = value.document.getAncestors(block.key)

    return ancestors.findLast(p => p.type === BlockType.figure) as Block
}

function inCaption(value: Value): boolean {
    const node = getCurrentCaption(value)

    if (!node) {
        return false
    }

    return node.type === BlockType.caption
}

export default function captionExit(options: ICaptionExitOptions) {
    return {
        onKeyDown(event: KeyboardEvent, change: Change) {
            if (event.key !== options.exitKey) {
                return null
            }

            const value = change.value

            if (!inCaption(value)) {
                return null
            }

            event.preventDefault()

            const figure = getCurrentFigure(value)
            const figureParent = value.document.getParent(figure.key)

            const insertionIndex = figureParent.nodes.indexOf(figure) + 1

            const exitBlock = Block.create({
                type: options.exitBlockType,
                nodes: List([Text.create('')]).toList(),
            })


            return change
                .insertNodeByKey(figureParent.key, insertionIndex, exitBlock)
                .collapseToStartOf(exitBlock)
        }
    }
}
