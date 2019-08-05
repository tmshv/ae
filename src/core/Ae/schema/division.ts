import { NODE_DATA_INVALID } from '../lib/violations'
import { Block } from 'slate'
import { DivisionLayout, BlockType } from '../const'

export default {
    nodes: [
        {
            min: 1, types: [
                BlockType.figure,
                BlockType.paragraph,
                BlockType.urlCard,
                BlockType.file,
            ]
        },
    ],
    data: {
        layout: v => Boolean(v),
    },
    normalize: (change, reason, { node }) => {
        const block = node as Block
        const data = block.data

        switch (reason) {
            case NODE_DATA_INVALID: {
                let newData = data

                if (!data.has('layout')) {
                    newData = data.set('layout', DivisionLayout.default)
                }

                const newProps: any = {
                    data: newData,
                }

                return change.setNodeByKey(block.key, newProps)
            }

            default: {
                break
            }
        }
    }
}
