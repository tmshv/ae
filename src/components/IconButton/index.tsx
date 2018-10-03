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
    activeColor?: string,
    disabledColor?: string,
    disabled?: boolean,
    active?: boolean,
}

export default class IconButton extends React.Component<IconButtonProps, object> {
    state = {
        hover: false,
        active: false,
    }

    onMouseOver = () => {
        this.setState({
            hover: true,
        })
    }

    onMouseLeave = () => {
        this.setState({
            hover: false,
        })
    }

    render() {
        let color = this.state.hover
            ? this.props.hoverColor
            : this.props.color
        if (this.props.active) {
            color = this.props.activeColor
        }

        return (
            <button
                className={className('ae-icon-button', this.props.mix)}
                onClick={this.props.onClick}
                onMouseOver={this.onMouseOver}
                onMouseLeave={this.onMouseLeave}
            >
                {React.cloneElement(this.props.children, {
                    size: this.props.size,
                    color,
                })}
            </button>
        )
    }
}
