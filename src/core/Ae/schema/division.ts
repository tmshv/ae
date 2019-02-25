import { NODE_DATA_INVALID } from 'slate-schema-violations'
import { Block, SlateError } from 'slate'
import { DivisionLayout, BlockType } from '../const'

export default {
    nodes: [
        {
            min: 1, types: [
                BlockType.figure,
                BlockType.paragraph,
                BlockType.urlCard,
            ]
        },
    ],
    data: {
        layout: v => Boolean(v),
    },
    normalize: (change, error: SlateError) => {
        const block: Block = error.node
        const data = block.data

        switch (error.code) {
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
