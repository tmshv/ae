import { Block } from 'slate'
import { BlockType } from '../const'
import { List } from 'immutable'
import createParagraph from './createParagraph'

export interface IFile {
    srcPreview: string,
    srcFile: string,
    name: string,
    size: number,
    mimeType: string,
}

export default function createFile(options: IFile): Block {
    const nodes = List([createParagraph(options.name)])

    return Block.create({
        type: BlockType.file,
        data: {
            srcPreview: options.srcPreview,
            srcFile: options.srcFile,
            size: options.size,
            mimeType: options.mimeType,
        },
        nodes,
    })
}
