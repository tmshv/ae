import { Block } from 'slate'
import { BlockType } from '../const'

export interface IVideo {
    src: string,
    url: string,
    caption: string,
}

export default function createVideo(options: IVideo): Block {
    return Block.create({
        type: BlockType.video,
        data: {
            src: options.src,
            url: options.url,
        },
    })
}
