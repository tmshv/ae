export function ensureDivision(values: number[]): number[] {
    if (values[values.length - 1] !== 1) {
        return [...values, 1]
    }

    return values
}

export function getDivision(division: number | number[], defaultValue: number): number[] {
    if (!division) {
        return getDivisionBy(defaultValue)
    } else if (typeof division === 'number') {
        return getDivisionBy(division)
    } else {
        return ensureDivision(division)
    }
}

export function getDivisionBy(divideBy: number): number[] {
    const step = 1 / divideBy
    const vs = []

    for (let i = step; i <= 1; i += step) {
        vs.push(i)
    }

    return vs
}

export function percents(value: number): string {
    return `${value * 100}%`
}

export function getStyle(value: number, vertical: boolean): React.CSSProperties {
    if (vertical) {
        return null
    }

    return {
        width: percents(value)
    }
    // const field = vertical
    //     ? 'height'
    //     : 'width'
    // return {
    //     [field]: percents(value),
    // }
}
