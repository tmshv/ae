import React from 'react'
import className from 'classnames'
import './styles.less'

interface IconButtonProps {
    onClick: () => void,
    children: any,
    mix?: string,
    size?: number,
    color?: string,
    hoverColor?: string,
    focusColor?: string,
    disabledColor?: string,
    disabled?: boolean,
}

export default class IconButton extends React.PureComponent<IconButtonProps, object> {
    render() {
        return (
            <button
                className={className('ae-icon-button', this.props.mix)}
                onClick={this.props.onClick}
            >
                {React.cloneElement(this.props.children, {
                    size: this.props.size,
                })}
            </button>
        )
    }
}
