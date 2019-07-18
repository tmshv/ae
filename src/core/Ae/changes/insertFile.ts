import { Change, Range, RangeProperties } from 'slate'
import { insertOrReplaceBlock } from '../lib/change'
import createFile, { IFile } from '../utils/createFile'

export default function insertFile(change: Change, file: IFile, target: Range | RangeProperties) {
    if (target) {
        change.select(target)
    }

    return insertOrReplaceBlock(change, createFile(file))
}
