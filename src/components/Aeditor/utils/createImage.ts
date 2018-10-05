import { Block } from 'slate'
import { BlockType } from '../const'
import createCaption from './createCaption'
import { List } from 'immutable'

export interface IImage {
    src: string,
    caption?: string,
}

export default function createImage(options: IImage): Block {
    const caption = createCaption(options.caption)
    const image = Block.create({
        type: BlockType.image,
        data: {
            src: options.src,
        },
    })
    const nodes = List([image, caption]).toList()

    return Block.create({
        type: BlockType.figure,
        nodes,
    })
}
