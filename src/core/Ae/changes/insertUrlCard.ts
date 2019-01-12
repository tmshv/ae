import { Change } from 'slate'
import createUrlCard from '../utils/createUrlCard'
import { insertOrReplaceBlock } from '../lib/change'
import { IUrlCardData } from '../const'

export default function insertUrlCard(change: Change, data: IUrlCardData, target): Change {
    return insertOrReplaceBlock(change, createUrlCard(data))
}
