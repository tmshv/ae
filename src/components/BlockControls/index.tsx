import React from 'react'
import className from 'classnames'

export default class BlockControls extends React.Component<{}, {}, any> {
    render() {
        return (
            <div
                className={className('block-controls')}
            >
                {this.props.children}
            </div>
        )
    }
}