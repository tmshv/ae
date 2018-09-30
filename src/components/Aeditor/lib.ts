import { Change } from 'slate';
import { getEventTransfer, getEventRange } from 'slate-react';

import isImage from 'is-image';
import isUrl from 'is-url';
import { BlockType } from './const';
// import insertImage from './insertImage';
// import insertVideo from './insertVideo';
// import insertLink from './insertLink';

export function handleTextPaste(e, change) {
    const target = getEventRange(e, change.value);

    const transfer = getEventTransfer(e);
    const { text } = transfer;
    // if (!isUrl(text)) return null;

    if (isImage(text)) {
        return change.call(insertImage, text, target);
    }
    //  else if (text.match(/youtube\.com|vimeo\.com/)) {
    //     return change.call(insertVideo, text);
    // }

    // return change.call(insertLink, text);
}

export function insertImage(change: Change, src: string, target) {
    if (target) {
        change.select(target, null)
    }

    return change.insertBlock({
        type: BlockType.image,
        data: { src },
        isVoid: true,
    })
}
