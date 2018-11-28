import { Change } from 'slate'
import { getEventTransfer } from 'slate-react'
import { getEventTransferText } from '../lib'

export interface IPasteEmbedLinkOptions {
    match(text: string): boolean,
    change: (Change, string) => Promise<Change>,
}

const transferType = 'text'

export default function pasteLink(options: IPasteEmbedLinkOptions) {
    return {
        onPaste: (...args) => {
            console.log('pasteLink')
            console.log(args)
        }
        // onPaste: (event: Event, change: Change, next) => {
        //     const transfer = getEventTransfer(event)
        //     const text = getEventTransferText(event)

        //     if (transfer.type !== transferType) {
        //         return null
        //     }

        //     if (!options.match(text)) {
        //         return null
        //     }

        //     return options.change(change, text).then(change => {
        //         next()
        //     })
        // }
    }
}