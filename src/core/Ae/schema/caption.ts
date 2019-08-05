import { Block } from 'slate'
import { NODE_DATA_INVALID } from '../lib/violations'
import { ContentAlign, BlockType } from '../const'

export default {
    parent: { types: [BlockType.figure] },
    data: {
        align: v => Boolean(v),
    },
    normalize: (change, reason, { node }) => {
        const block = node as Block
        const data = block.data

        switch (reason) {
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
