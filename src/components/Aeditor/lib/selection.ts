import { Value } from 'slate'

export function isSingleSelection(value: Value): boolean {
    const { selection } = value

    return selection.isFocused && selection.isCollapsed
}
