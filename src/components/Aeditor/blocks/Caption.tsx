import React from 'react'
import className from 'classnames'
import { BlockProps } from '.'

export class Caption extends React.PureComponent<BlockProps, object> {
    render() {
        const { node, attributes } = this.props

        const align: string = node.data.get('align')
        const alignClass = `align-${align}`

        return (
            <figcaption
                {...attributes}
                className={className('ae-block-caption', alignClass, {
                    focused: false,
                })}
            >
                {this.props.children}
            </figcaption>
        )
    }
}