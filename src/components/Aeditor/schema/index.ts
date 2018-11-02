import { LAST_CHILD_TYPE_INVALID, NODE_DATA_INVALID } from 'slate-schema-violations'
import { Block, Schema } from 'slate'
import { BlockType, ImageLayout } from '../const'

function getSchema() {
    return {
        document: {
            last: { types: [BlockType.paragraph] },
            normalize: (change, reason, { node }) => {
                switch (reason) {
                    case LAST_CHILD_TYPE_INVALID: {
                        const paragraph = Block.create(BlockType.paragraph)
                        return change.insertNodeByKey(node.key, node.nodes.size, paragraph)
                    }
                    default:
                        break
                }
            },
        },
        blocks: {
            [BlockType.image]: {
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
            },
            [BlockType.video]: {
                isVoid: true,
            }
        },
    }
}

const schema: Schema = getSchema()

export default schema
