import { getEventTransfer } from 'slate-react'
import { Change } from 'slate'
import handleTextPaste from './handleTextPaste'

export default function handlePaste(event: Event, change: Change) {
    const transfer = getEventTransfer(event)

    switch (transfer.type) {
        case 'text': {
            return handleTextPaste(event, change)
        }
        // case 'files': return this.handleOnDrop(files);
        // case 'html': return onPasteHtml(e, change);
        default: {
            return null
        }
    }
}
