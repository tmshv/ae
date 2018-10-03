import React from 'react'
import className from 'classnames'
import { BlockProps } from '.'

export class Blockquote extends React.PureComponent<BlockProps, object> {
    render() {
        const { attributes, isSelected } = this.props

        return (
            <blockquote
                {...attributes}
                className={className('ae-block-blockquote', {
                    focused: isSelected,
                })}
            >
                {this.props.children}
            </blockquote>
        )
    }
}
