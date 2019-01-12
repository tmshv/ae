import { Block } from 'slate'
import { BlockType } from '../const'
import createCaption from './createCaption'
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
    const blocks = options.caption
        ? [image, createCaption(options.caption)]
        : [image]
    const nodes = List(blocks).toList()

    return Block.create({
        type: BlockType.figure,
        nodes,
    })
}
