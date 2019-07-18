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

export function insertFile(change: Change, file: any, target) {
    if (target) {
        change.select(target)
    }

    const x: any = {
        type: BlockType.file,
        data: file,
        isVoid: true,
        nodes: [
            {
                object: 'block',
                type: 'paragraph',
                nodes: [
                    {
                        'object': 'text',
                        'leaves': [
                            {
                                'object': 'leaf',
                                'text': file.name,
                                'marks': []
                            }
                        ]
                    }
                ]
            }
        ],
        // isVoid: true,
    }

    return change.insertBlock(x)
}
