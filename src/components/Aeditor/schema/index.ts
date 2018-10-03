import { LAST_CHILD_TYPE_INVALID } from 'slate-schema-violations'
import { Block } from 'slate'
import { BlockType } from '../const'

const schema = {
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
}

export default schema
