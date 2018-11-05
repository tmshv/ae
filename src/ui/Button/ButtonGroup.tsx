import * as React from 'react'

// import './styles.less'

export interface ButtonGroupProps {
    // onChange(value: any): void,
}

export default class ButtonGroup extends React.Component<ButtonGroupProps> {
    onChange
    render() {
        const {children} = this.props

        return (
            <div
                className={'ae-ui-button-group'}
            >
                {children}
            </div>
        )
    }
}