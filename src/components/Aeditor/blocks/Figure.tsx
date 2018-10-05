import React from 'react'
import className from 'classnames'
import { BlockProps } from '.'

export class Figure extends React.PureComponent<BlockProps, object> {
    render() {
        const { attributes, isSelected } = this.props

        return (
            <figure
                {...attributes}
                className={className('ae-block-figure', {
                    focused: isSelected,
                })}
            >
                {this.props.children}
            </figure>
        )
    }
}
