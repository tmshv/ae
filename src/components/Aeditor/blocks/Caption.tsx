import React from 'react'
import className from 'classnames'
import { BlockProps } from '.'

export class Caption extends React.PureComponent<BlockProps, object> {
    render() {
        const { attributes, isSelected } = this.props

        return (
            <figcaption
                {...attributes}
                className={className('ae-block-caption', {
                    focused: false,
                })}
            >
                {this.props.children}
            </figcaption>
        )
    }
}