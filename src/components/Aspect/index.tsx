import React from 'react'

interface IAspectProps {
    mix?: string,
    ratio: number,
    children: any,
}

export default function Aspect(props: IAspectProps) {
    const v = props.ratio * 100
    const style = {
        paddingTop: `${v}%`
    }

    return (
        <div
            className={'aspect'}
            style={style}
        >
            <div
                className={'content'}
            >
                {props.children}
            </div>
        </div>
    )
}
