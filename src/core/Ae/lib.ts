import { Change } from 'slate'
import { getEventTransfer, getEventRange } from 'slate-react'

import isImage from 'is-image'
import isUrl from 'is-url'
import { BlockType } from './const'
// import insertImage from './insertImage';
// import insertVideo from './insertVideo';
// import insertLink from './insertLink';

export function getEventTransferText(event: Event): string {
    const transfer = getEventTransfer(event)
    const { text } = transfer as any

    return text
}
