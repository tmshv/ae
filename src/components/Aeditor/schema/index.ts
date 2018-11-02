import { LAST_CHILD_TYPE_INVALID } from 'slate-schema-violations'
import { Block, Schema } from 'slate'
import { BlockType } from '../const'
import image from './image'
import division from './division'

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
            [BlockType.division]: division,
            [BlockType.image]: image,
            [BlockType.video]: {
                isVoid: true,
            }
        },
    }
}

const schema: Schema = getSchema()

export default schema
