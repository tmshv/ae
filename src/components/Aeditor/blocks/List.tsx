import React from 'react'
import className from 'classnames'
import { BlockProps } from '.'

interface IListProps extends BlockProps {
    ordered: boolean,
}

export class List extends React.PureComponent<IListProps, object> {
    render() {
        const { attributes, isSelected, ordered } = this.props
        const Tag = ordered
            ? 'ol'
            : 'ul'

        return (
            <Tag
                {...attributes}
                className={className('ae-block-list', {
                    focused: isSelected,
                    ordered
                })}
            >
                {this.props.children}
            </Tag>
        )
    }
}
