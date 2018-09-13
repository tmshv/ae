import React from 'react'
import PropTypes from 'prop-types'

import './styles.less'

const px = value => `${value}px`

function getStyle(shiftX, shiftY) {
    const style = {}

    if (shiftX) {
        style.left = px(shiftX)
    }

    if (shiftY) {
        style.top = px(shiftY)
    }

    if (shiftX || shiftY) {
        style.zIndex = 1
    }

    return style
}

export default function Block(props) {
    const style = getStyle(props.shiftX, props.shiftY)

    return (
        <div
            className={`block ${props.mix}`}
            style={style}
        >
            {props.children}
        </div>
    )
}

Block.propTypes = {
    mix: PropTypes.string,
    shiftX: PropTypes.number,
    shiftY: PropTypes.string,
    vertical: PropTypes.bool,
    division: PropTypes.arrayOf(PropTypes.number),
}

Block.defaultProps = {
    vertical: false,
    mix: '',
}
