import { LAST_CHILD_TYPE_INVALID, PARENT_TYPE_INVALID } from 'slate-schema-violations'
import { Block, Schema, Change } from 'slate'
import { BlockType } from '../const'
import image from './image'
import division from './division'
import caption from './caption'

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
            [BlockType.figure]: {
                parent: { types: [BlockType.division] },
                nodes: [
                    { types: [BlockType.image], min: 1, max: 1 },
                    { types: BlockType.caption, min: 0 },
                ],
                normalize: (change: Change, violation: string, { node }: { node: Block }) => {
                    switch (violation) {
                        case PARENT_TYPE_INVALID: {
                            return change.wrapBlockByKey(node.key, BlockType.division)
                        }

                        default: {
                            break
                        }
                    }
                },
            },
            [BlockType.urlCard]: {
                parent: { types: [BlockType.division] },
                nodes: [
                    { types: [BlockType.image], min: 1, max: 1 },
                    { types: BlockType.paragraph, min: 0 },
                ],
                normalize: (change: Change, violation: string, { node }: { node: Block }) => {
                    console.log('norm url card')
                    console.log(violation)

                    switch (violation) {
                        case PARENT_TYPE_INVALID: {
                            return change.wrapBlockByKey(node.key, BlockType.division)
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

// const schema: Schema = getSchema()
const schema: any = getSchema()

export default schema
