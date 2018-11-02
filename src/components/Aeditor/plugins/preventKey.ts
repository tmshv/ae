import { Change, Text, Block, Node, Value } from "slate";
import { BlockType } from "../const";
import { List } from "immutable";

export interface IPreventKeyOptions {
    key: string,
    blockType: string,
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
            if (event.key !== 'Enter') {
                return null
            }

            const value = change.value

            if (!inCaption(value)) {
                return null
            }

            event.preventDefault()

            return true
            // const caption = getCurrentCaption(value)
            // const parent = caption
            // const exitBlock = Block.create({
            //     type: options.exitBlockType,
            //     nodes: List([Text.create('')]).toList(),
            // })

            // const table = TablePosition.create(opts, value.document, value.startKey).table;
            // const caption = value.document.getParent(table.key)
            // const insertionIndex = caption.nodes.indexOf(caption) + 1

            // console.log(insertionIndex)

            // return change
            //     .insertNodeByKey(parent.key, insertionIndex, exitBlock)
            // // .collapseToStartOf(exitBlock);
        }
    }
}