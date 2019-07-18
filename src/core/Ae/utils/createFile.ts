import { Block } from 'slate'
import { BlockType } from '../const'
import { List } from 'immutable'

export interface IFile {
    srcPreview: string,
    srcFile: string,
    name: string,
    size: number,
    mimeType: string,
}

export default function createFile(options: IFile): Block {
    const file = Block.create({
        type: BlockType.file,
        data: options,
    })
    return file
    // const nodes = List([file])

    // return Block.create({
    //     type: BlockType.file,
    //     nodes,
    // })
}
