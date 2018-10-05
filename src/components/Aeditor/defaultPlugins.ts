import { Change } from 'slate'
import { MarkType, BlockType } from './const'
import insertVideo from './changes/insertVideo'
import blockquotePlugin from './plugins/blockquote'
import listPlugin from './plugins/list'
import tablePlugin from './plugins/table'
import pasteEmbedLink from './plugins/pasteEmbedLink'
import exitHeader from './plugins/exitHeader'
import shortcutMark from './plugins/shortcutMark'
import captionExit from './plugins/captionExit'

const youtubeLinkRegExp = /(youtube\.com)|(youtu\.be)/

export default function defaultPlugins() {
    return [
        blockquotePlugin,
        listPlugin,
        tablePlugin,
        exitHeader(),
        shortcutMark({
            key: 'b',
            type: MarkType.bold,
        }),
        shortcutMark({
            key: 'i',
            type: MarkType.italic,
        }),
        shortcutMark({
            key: 'u',
            type: MarkType.underline,
        }),
        shortcutMark({
            key: 'd',
            type: MarkType.strikethrough,
        }),
        shortcutMark({
            key: '9',
            type: MarkType.code,
        }),
        shortcutMark({
            key: 'h',
            type: MarkType.highlight,
        }),
        pasteEmbedLink({
            match: youtubeLinkRegExp,
            change: (change: Change, link: string) => {
                return insertVideo(change, link)
                // console.log(link)
                // return change.call(insertVideo, link)
            },
        }),
        captionExit({
            exitBlockType: BlockType.paragraph,
            exitKey: 'Enter',
        })
        // imagePasteDrop({
        //     insertImage: (change, file, editor) => {
        //         // console.log(change, file, editor)
        //         return change.insertBlock({
        //             type: 'image',
        //             isVoid: true,
        //             data: { file }
        //         })
        //     }
        // })
    ]
}
