import React from 'react'
import B from '../ui/Button'

interface ButtonProps {
    onClick(event: Event, value: string): void,
    value?: string,
    highlight?: boolean,
}

export default class Button extends React.PureComponent<ButtonProps> {
    onClick = (event: Event) => {
        event.preventDefault()

        this.props.onClick(event, this.props.value)
    }

    onMouseDown = (event: Event) => {
        event.preventDefault()
    }

    render() {
        return (
            <B
                onClick={this.onClick as any}
                onMouseDown={this.onMouseDown as any}
                highlight={this.props.highlight}
            >
                {this.props.children}
            </B>
        )
    }
}