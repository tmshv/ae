import { Block } from 'slate'
import { BlockType } from '../const'
import createCaption from './createCaption'
import createFigure from './createFigure'
import { List } from 'immutable'

interface IImage {
    src: string,
    layout?: string,
    caption?: string,
}

export default function createImage(options: IImage): Block {
    const image = Block.create({
        type: BlockType.image,
        data: {
            src: options.src,
            // layout: options.layout,
        },
    })
    const nodes = List(options.caption
        ? [image, createCaption(options.caption)]
        : [image]
    )

    return createFigure(nodes)
}
