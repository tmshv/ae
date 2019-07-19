import * as React from 'react'
import classNames from 'classnames'
import { getDivision, getStyle } from './lib'

import './styles.less'

export interface IDivisionProps {
    className?: string
    vertical?: boolean
    division?: number | number[]
    reverse?: boolean
}

const Division: React.FC<IDivisionProps> = (props) => {
    const { division, vertical= false, reverse= false, className, ...restProps } = props
    const divisionValue = getDivision(props.division, React.Children.count(props.children))
    let position = 0

    return (
        <div
            {...restProps}
            className={classNames('division', className, {
                reverse: props.reverse,
                vertical: props.vertical,
            })}
        >
            {React.Children.map(props.children, (child, i) => {
                const x = divisionValue[i]
                const cursor = x - position
                position = x

                return (
                    <div
                        key={i}
                        className={'division-section'}
                        style={getStyle(cursor, props.vertical)}
                    >
                        {child}
                    </div>
                )
            })}
        </div>
    )
}

Division.defaultProps = {
    vertical: false,
    reverse: false,
}

export default Division