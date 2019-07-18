import { Change } from 'slate'
import createImage from '../utils/createImage'
import { insertOrReplaceBlock } from '../lib/change'

export default function insertImage(change: Change, src: string, target): Change {
    if (target) {
        change.select(target)
    }

    return insertOrReplaceBlock(change, createImage({
        src,
    }))
}
