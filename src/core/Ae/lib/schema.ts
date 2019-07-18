import { Change, Block } from 'slate'

export function normalizeParentTypeInvalid(change: Change, blockType: string) {
    normalize: (change: Change, violation: string, { node }: { node: Block }) => {
        switch (violation) {
            case 'PARENT_TYPE_INVALID': {
                return change.wrapBlockByKey(node.key, blockType)
            }

            default: {
                break
            }
        }
    }
}