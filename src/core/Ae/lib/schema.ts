import { Change, Block } from 'slate'
import { PARENT_TYPE_INVALID } from 'slate-schema-violations'

export function normalizeParentTypeInvalid(change: Change, blockType: string) {
    normalize: (change: Change, violation: string, { node }: { node: Block }) => {
        switch (violation) {
            case PARENT_TYPE_INVALID: {
                return change.wrapBlockByKey(node.key, blockType)
            }

            default: {
                break
            }
        }
    }
}