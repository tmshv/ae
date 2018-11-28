import React from 'react'
import className from 'classnames'
import { BlockProps } from '.'

export class ListItem extends React.PureComponent<BlockProps, object> {
    render() {
        const { attributes } = this.props

        return (
            <li
                {...attributes}
                className={className('ae-block-list-item')}
            >
                {this.props.children}
            </li>
        )
    }
}
