import { LAST_CHILD_TYPE_INVALID, PARENT_TYPE_INVALID } from 'slate-schema-violations'
import { Block, Schema, Change, SlateError } from 'slate'
import { BlockType } from '../const'
import image from './image'
import division from './division'
import caption from './caption'

function getSchema() {
    return {
        document: {
            last: { types: [BlockType.paragraph] },
            normalize: (change, error: SlateError, { node }) => {
                switch (error.code) {
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
            [BlockType.figure]: {
                parent: [{ type: BlockType.division }],
                nodes: [
                    { types: [BlockType.image], min: 1, max: 1 },
                    { types: BlockType.caption, min: 0 },
                ],
                normalize: (change: Change, error: SlateError) => {
                    const block: Block = error.node

                    switch (error) {
                        case PARENT_TYPE_INVALID: {
                            return change.wrapBlockByKey(block.key, BlockType.division)
                        }

                        default: {
                            break
                        }
                    }
                },
            },
            [BlockType.urlCard]: {
                parent: [{ type: [BlockType.division] }],
                nodes: [
                    { types: [BlockType.image], min: 1, max: 1 },
                    { types: BlockType.paragraph, min: 0 },
                ],
                normalize: (change: Change, error: SlateError) => {
                    const block: Block = error.node

                    switch (error.code) {
                        case PARENT_TYPE_INVALID: {
                            return change.wrapBlockByKey(block.key, BlockType.division)
                        }

                        default: {
                            break
                        }
                    }
                },
            },
            [BlockType.caption]: caption,
            [BlockType.division]: division,
            [BlockType.image]: image,
            [BlockType.video]: {
                isVoid: true,
                // parent: { types: [BlockType.division] },
                // normalize: (change: Change, violation: string, { node }: { node: Block }) => {
                //     switch (violation) {
                //         case PARENT_TYPE_INVALID: {
                //             return change.wrapBlockByKey(node.key, BlockType.figure)
                //         }

                //         default: {
                //             break
                //         }
                //     }
                // },
            }
        },
    }
}

const schema: Schema = getSchema()

export default schema
