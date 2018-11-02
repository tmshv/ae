import { Block } from 'slate'
import { NODE_DATA_INVALID } from 'slate-schema-violations'
import { ImageLayout } from '../const'

export default {
    isVoid: true,
    data: {
        layout: v => Boolean(v),
        // src: v => Boolean(v),
    },
    normalize: (change, reason, { node }) => {
        const block = node as Block
        const data = block.data

        switch (reason) {
            case NODE_DATA_INVALID: {
                if (!data.has('src')) {
                    break
                }

                let newData = data

                if (!data.has('layout')) {
                    newData = data.set('layout', ImageLayout.square)
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