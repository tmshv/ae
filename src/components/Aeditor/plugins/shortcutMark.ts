import { Change, Value } from 'slate'
import Immutable from 'immutable'

export interface IShortcutMarkOptions {
    key: string,
    type: string,
    isShiftKey?: boolean,
    getData?: (value: Value) => Immutable.Map<string, any> | { [key: string]: any },
}

export default function shortcutMark(options: IShortcutMarkOptions) {
    const { type, key, isShiftKey = false } = options

    return {
        onKeyDown(event: KeyboardEvent, change: Change) {
            const shift = event.shiftKey === isShiftKey

            if (!event.metaKey || event.key !== key || !shift) {
                return null
            }

            const data = !options.getData ? null : (
                options.getData(change.value)
            )

            event.preventDefault()
            change.toggleMark({
                type,
                data,
            })

            return true
        },
    }
}
