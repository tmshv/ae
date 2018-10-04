import { Change } from 'slate'
import { getEventTransfer } from 'slate-react';
import { getEventTransferText } from '../lib';


// switch (transfer.type) {
//     case 'text': {
//         return handleTextPaste(event, change)
//     }
//     // case 'files': return this.handleOnDrop(files);
//     // case 'html': return onPasteHtml(e, change);
//     default: {
//         return null
//     }
// }
export interface IPasteEmbedLinkOptions {
    match: RegExp,
    change: (Change, string) => Change,
}

const transferType = 'text'

export default function pasteEmbedLink(options: IPasteEmbedLinkOptions) {
    return {
        onPaste: (event: Event, change: Change) => {
            const transfer = getEventTransfer(event)
            const text = getEventTransferText(event)

            if (transfer.type !== transferType) {
                return null
            }

            if (!options.match.test(text)) {
                return null
            }

            return options.change(change, text)
        }
    }
}