import { Change } from 'slate'
import createImage from '../utils/createImage'

export default function insertImage(change: Change, src: string, target): Change {
    if (target) {
        change.select(target, undefined)
    }

    return change.insertBlock(createImage({
        src,
        caption: '...'
    }))
}
