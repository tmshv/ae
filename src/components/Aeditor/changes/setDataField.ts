import { Value, Block } from 'slate'

export default function setDataField(value: Value, block: Block, fieldName: string, fieldValue: any) {
    const change = value.change()
    const newProps: any = {
        data: block.data.set(fieldName, fieldValue)
    }

    return change.setNodeByKey(block.key, newProps)
}
