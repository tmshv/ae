import { Block, SlateError } from 'slate'
import { NODE_DATA_INVALID } from 'slate-schema-violations'
import { ImageLayout, ImageCorner } from '../const'

export default {
    isVoid: true,
    data: {
        layout: v => Boolean(v),
        corner: v => Boolean(v),
        // src: v => Boolean(v),
    },
    normalize: (change, error: SlateError) => {
        console.log('normalizing image', error.code)

        const block: Block = error.node
        const data = block.data

        switch (error.code) {
            case NODE_DATA_INVALID: {
                if (!data.has('src')) {
                    break
                }

                let newData = data

                if (!data.has('layout')) {
                    newData = data.set('layout', ImageLayout.square)
                }

                if (!data.has('corner')) {
                    newData = data.set('corner', ImageCorner.round)
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