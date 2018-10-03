import editList from 'slate-edit-list'
import { BlockType } from '../../const'

// onKeyDown: enter, backspace, tab
const plugin = editList({
    types: [BlockType.orderedList, BlockType.unorderedList],
    typeItem: BlockType.listItem,
    typeDefault: BlockType.paragraph,
})

export default plugin
