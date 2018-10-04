import { Change } from 'slate'
import { getEventRange, getEventTransfer } from 'slate-react'
import isUrl from 'is-url'

export default function handleTextPaste(event: Event, change: Change) {
    const target = getEventRange(event, change.value)

    const transfer = getEventTransfer(event)
    const { text } = transfer

    if (!isUrl(text)) {
        return null
    }

    // if (isImage(text)) {
    //     return change.call(insertImage, text, target)
    // }
    //  else if (text.match(/youtube\.com|vimeo\.com/)) {
    //     return change.call(insertVideo, text);
    // }

    // return change.call(insertLink, text);
}