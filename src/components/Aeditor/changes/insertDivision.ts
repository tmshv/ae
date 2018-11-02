import { Change } from 'slate'
import createDivision from '../utils/createDivision'

export default function insertDivision(change: Change, div: number, target): Change {
    if (target) {
        change.select(target, undefined)
    }

    return change.insertBlock(createDivision(div))
}
