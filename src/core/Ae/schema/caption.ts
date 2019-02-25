import { Block, SlateError } from 'slate'
import { NODE_DATA_INVALID } from 'slate-schema-violations'
import { ContentAlign, BlockType } from '../const'

export default {
    parent: [{ type: [BlockType.figure] }],
    data: {
        align: v => Boolean(v),
    },
    normalize: (change, error: SlateError) => {
        const block: Block = error.node
        const data = block.data

        switch (error.code) {
            case NODE_DATA_INVALID: {
                let newData = data

                if (!data.has('align')) {
                    newData = data.set('align', ContentAlign.left)
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
