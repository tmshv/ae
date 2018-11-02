import React from 'react'
import className from 'classnames'
import { BlockProps } from '.'
import Division from '../../Division'

export class DivisionBlock extends React.PureComponent<BlockProps, object> {
    render() {
        const { node, attributes } = this.props
        const layout = node.data.get('layout')

        return (
            <Division
                {...attributes}
                className={className('ae-block-division', {
                    [layout]: true,
                })}
            >
                {this.props.children}
            </Division>
        )
    }
}
