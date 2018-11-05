import { Change } from 'slate'
import createDivision from '../utils/createDivision'
import { insertOrReplaceBlock } from '../lib/change'

export default function insertDivision(change: Change, div: number, target): Change {
    if (target) {
        change.select(target, undefined)
    }

    return insertOrReplaceBlock(change, createDivision(div))
}
