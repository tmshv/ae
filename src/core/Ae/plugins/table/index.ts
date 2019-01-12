// import Table from '@strelka/slate-edit-table'
import Table from 'slate-edit-table'
import { BlockType } from '../../const'

const plugin = Table({
    typeTable: BlockType.table,
    typeRow: BlockType.tableRow,
    typeCell: BlockType.tableCell,
    typeDefault: BlockType.paragraph,
})

export default plugin
