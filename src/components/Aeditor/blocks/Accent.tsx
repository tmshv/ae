import React from 'react'
import className from 'classnames'
import { BlockProps } from '.'

export class Accent extends React.PureComponent<BlockProps, object> {
    render() {
        return (
            <p
                {...this.props.attributes}
                className={className('ae-block-accent', 'text')}
            >
                {this.props.children}
            </p>
        )
    }
}
