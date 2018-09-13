import { dropRight, last, slice, range, isNumber, cloneDeep, isNull, isUndefined, isFunction } from 'lodash'

export function createDefaultDivision() {
    return {
        type: 'Division',
        divide: 1,
        content: ['>']
    }
}

export function getDivisionRange(divide) {
    const step = 1 / divide

    // return range(0, 1, step).map(x => x + step)
    return range(step, step + 1, step)
}

export function div(divide) {
    if (Array.isArray(divide)) {
        return divide
    }

    if (isNumber(divide)) {
        return getDivisionRange(divide)
    }

    return []
}

export function exist(value) {
    return !isNull(value) && !isUndefined(value)
}

export function listTrim(list, maxSize) {
    if (list.length <= maxSize) {
        return cloneDeep(list)
    }

    return slice(list, 0, maxSize)
}

export function listFill(list, size, fn) {
    const result = cloneDeep(list)

    if (result.length >= size) {
        return result
    }

    for (let i = 0; i < size; i++) {
        if (!exist(result[i])) {
            result[i] = fn(i)
        }
    }

    return result
}

export function listRemoveIndex(list, index) {
    return list.filter((x, i) => i !== index)
}

export function listReplaceIndex(list, index, item) {
    return list.map((x, i) => i === index
        ? item
        : x
    )
}

export function listPush(list, item) {
    return [...list, item]
}

export function listReplaceLast(list, item) {
    return listPush(dropRight(list), item)
}

export function merge(a, b) {
    return {
        ...a,
        ...b,
    }
}
