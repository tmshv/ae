import { Change } from 'slate'
import { MarkType, BlockType, IUrlCardData } from './const'
import insertVideo from './changes/insertVideo'
import blockquotePlugin from './plugins/blockquote'
import listPlugin from './plugins/list'
import tablePlugin from './plugins/table'
import pasteEmbedLink from './plugins/pasteEmbedLink'
import exitHeader from './plugins/exitHeader'
import shortcutMark from './plugins/shortcutMark'
import captionExit from './plugins/captionExit'
import exitDivison from './plugins/division/exitDivision'
import pasteLink from './plugins/pasteLink'
import insertUrlCard from './changes/insertUrlCard'

const youtubeLinkRegExp = /(youtube\.com)|(youtu\.be)/

export default function defaultPlugins() {
    return [
        blockquotePlugin,
        listPlugin,
        tablePlugin,
        exitHeader(),
        exitDivison({
            exitBlockType: BlockType.paragraph,
            exitKey: 'Enter',
            metaKey: false,
        }),
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
            getData: value => {
                const color = Math.floor(Math.random() * 0x1000000)
                const hex = color.toString(16)

                return {
                    color: `#${hex}`,
                }
            }
        }),
        pasteLink({
            match: () => true,
            change: async (change: Change, link: string) => {
                console.log('paste link', link)

                const getMeta = async (link: string) => {
                    const meta = await fetch(`/api/url/meta?url=${link}`)
                    const j = await meta.json()
                    const data: IUrlCardData = {
                        url: link,
                        title: j.metadata.title as string,
                        description: j.metadata.description as string,
                        imageSrc: j.metadata.image as string,
                    }

                    console.log('paste meta', data)

                    return insertUrlCard(change, data, undefined)
                }

                return getMeta(link)

                // return change
            },
        }),
        pasteEmbedLink({
            match: youtubeLinkRegExp,
            change: (change: Change, link: string) => insertVideo(change, link),
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
