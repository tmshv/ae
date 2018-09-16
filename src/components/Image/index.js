import React from 'react'
import PropTypes from 'prop-types'

import './styles.less'

export default function Image(props) {
    const v = props.ratio * 100
    const style = {
        paddingTop: `${v}%`
    }

    return (
        <div
            className={'image'}
            style={style}
        >
            <div
                className={'content'}
            >
                <img
                    src={props.src}
                />
            </div>
        </div>
    )
}

Image.propTypes = {
    mix: PropTypes.string,
    src: PropTypes.string,
    ratio: PropTypes.number,
}
