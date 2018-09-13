import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './styles.less'

function ensureDivision(values) {
    if (values[values.length - 1] !== 1) {
        return [...values, 1]
    }

    return values
}

function getDivision(divisionValues, divideBy) {
    if (divisionValues) {
        return ensureDivision(divisionValues)
    }

    const step = 1 / divideBy
    const vs = []

    for (let i = step; i <= 1; i += step) {
        vs.push(i)
    }

    return vs
}

function percents(value) {
    return `${value * 100}%`
}

function getStyle(value, vertical) {
    const field = vertical
        ? 'height'
        : 'width'
    return {
        [field]: percents(value),
    }
}

export default function Division(props) {
    let { divide, division, vertical, reverse, className, ...restProps } = props
    divide = divide ? divide : (
        React.Children.count(props.children)
    )
    division = getDivision(props.division, divide)
    let position = 0

    return (
        <div
            {...restProps}
            className={classNames('division', className, {
                reverse: props.reverse,
                vertical: props.vertical,
            })}
        >
            {React.Children.map(props.children, (child, i) => {
                const x = division[i]
                const cursor = x - position
                position = x

                return (
                    <div
                        key={i}
                        className={'division-section'}
                        style={getStyle(cursor, props.vertical)}
                    >
                        {child}
                    </div>
                )
            })}
        </div>
    )
}

Division.propTypes = {
    vertical: PropTypes.bool,
    division: PropTypes.arrayOf(PropTypes.number),
    divide: PropTypes.number,
    reverse: PropTypes.bool,
    className: PropTypes.string,
}

Division.defaultProps = {
    vertical: false,
    reverse: false,
}
