import React from 'react'
import PropTypes from 'prop-types'
import { dropRight, last, slice, range, isNumber, cloneDeep, isNull, isUndefined, isFunction } from 'lodash'
import Division from '../Division'
import Image from '../Image'

import './styles.less'

const image1 = '/static/1.jpg'

function createDefaultDivision() {
    return {
        type: 'Division',
        divide: 1,
        content: ['>']
    }
}

function getDivisionRange(divide) {
    const step = 1 / divide

    // return range(0, 1, step).map(x => x + step)
    return range(step, step + 1, step)
}

function div(divide) {
    if (Array.isArray(divide)) {
        return divide
    }

    if (isNumber(divide)) {
        return getDivisionRange(divide)
    }

    return []
}

function Block(props) {
    return (
        <div
            style={{
                width: props.width,
                height: props.height,
            }}
        >
            {props.children}
        </div>
    )
}

export default class AeBlock extends React.Component {
    render() {
        const props = this.props
        const divide = props.row.divide

        const content = props.row.content
        const contentSize = content.length
        // const contentSize = isNumber(divide)
        //     ? divide
        //     : Array.from(divide).length

        const division = div(divide)
        const children = content
            .map((x, i) => (
                <div
                    style={{
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: '2px solid black',
                        minHeight: '100px',
                        height: '100%',
                        boxSizing: 'border-box',
                    }}
                    key={i}
                >
                    {isFunction(x) ? (
                        x()
                    ) : (
                            <span>{x}</span>
                        )
                    }

                    <div
                        style={{
                            position: 'absolute',
                        }}
                    >
                        {i === 0 ? null : (
                            <button
                                onClick={event => {
                                    props.onMergeRight(i)
                                }}
                            >merge right</button>
                        )}
                        <button
                            onClick={event => {
                                props.onAddContent(i, () => (
                                    <Block
                                        width={'100%'}
                                    >
                                        <Image
                                            src={image1}
                                            ratio={3 / 4}
                                        />
                                    </Block>
                                ))
                            }}
                        >+</button>
                    </div>
                </div>
            ))

        return (
            <Division
                division={division}
            >
                {children}
            </Division>
        )
    }
}
