import { Block, Text } from 'slate'
import { BlockType, IUrlCardData, ImageLayout } from '../const'
import createParagraph from './createParagraph'
import { List } from 'immutable'
import createImage from './createImage'

export default function createUrlCard(options: IUrlCardData): Block {
    const blocks = List([
        Block.create({
            type: BlockType.image,
            data: {
                src: options.imageSrc,
                layout: ImageLayout.landscape,
            },
        }),
        createParagraph(options.title),
        createParagraph(options.description),
    ])

    // const imageSrc: string = node.data.get('imageSrc')
    // const url: string = node.data.get('url')

    return Block.create({
        type: BlockType.urlCard,
        nodes: blocks,
        data: {
            url: options.url,
            imageSrc: options.imageSrc,
        },
    })
}
