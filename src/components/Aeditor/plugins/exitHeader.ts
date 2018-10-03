import { BlockType } from '../const'
import { Change } from 'slate'

export default function exitHeader() {
    return {
        onKeyDown: (event: KeyboardEvent, change: Change) => {
            const { value } = change
            const { startBlock } = value
            const isSelectionHeading = startBlock.type.match(/header/)

            if (event.key === 'Enter' && isSelectionHeading) {
                return change.insertBlock(BlockType.paragraph)
            }

            return null
        },
    }
}
