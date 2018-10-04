import { Change } from 'slate'

export interface IShortcutMarkOptions {
    key: string,
    type: string,
    isShiftKey?: boolean,
}

export default function shortcutMark(options: IShortcutMarkOptions) {
    const { type, key, isShiftKey = false } = options

    return {
        onKeyDown(event: KeyboardEvent, change: Change) {
            const shift = event.shiftKey === isShiftKey

            if (!event.metaKey || event.key !== key || !shift) {
                return null
            }

            event.preventDefault()
            change.toggleMark(type)

            return true
        },
    }
}
