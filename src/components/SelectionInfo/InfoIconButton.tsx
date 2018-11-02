import React from 'react'
import IconButton, { IconButtonProps } from '../IconButton'

export default class InfoIconButton extends React.PureComponent<IconButtonProps, {}> {
    onMouseDown = (event: Event) => {
        event.preventDefault()
    }

    render() {
        return (
            <IconButton
                {...this.props}
                hoverColor={'blue'}
                size={20}
                onMouseDown={this.onMouseDown}
            />
        )
    }
}
