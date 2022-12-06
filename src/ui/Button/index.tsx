import * as React from 'react'
import className from 'classnames'

export interface BaseButtonProps {
    highlight?: boolean,
    value?: any,
    // type?: ButtonType;
    // icon?: string;
    // shape?: ButtonShape;
    // size?: ButtonSize;
    // loading?: boolean | {
    //     delay?: number;
    // };
    // prefixCls?: string;
    // className?: string,
    // ghost?: boolean,
    // block?: boolean,
    children?: React.ReactNode,
}

export type ButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>

export default class Button extends React.Component<ButtonProps> {
    render() {
        const {children, highlight, ...props} = this.props

        return (
            <button {...props}
                className={className('ae-ui-button', {
                    highlight,
                })}
            >
                {children}
            </button>
        )
    }
}