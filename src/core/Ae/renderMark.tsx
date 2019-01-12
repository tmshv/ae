import React from 'react'
import { MarkType } from './const'

function Mark(props) {
    const color = props.mark.data.get('color')
    const style = !color ? null : {
        backgroundColor: color,
    }

    return (
        <mark style={style}>
            {props.children}
        </mark>
    )
}

export default function renderMark(props) {
    const { children, mark } = props

    switch (mark.type) {
        case MarkType.bold: {
            return (
                <strong>{children}</strong>
            )
        }

        case MarkType.italic: {
            return (
                <em>{children}</em>
            )
        }

        case MarkType.strikethrough: {
            return (
                <del>{children}</del>
            )

        }
        case MarkType.underline: {
            return (
                <u>{children}</u>
            )
        }

        case MarkType.code: {
            return (
                <code>{children}</code>
            )
        }

        case MarkType.highlight: {
            return (
                <Mark {...props}/>
            )
        }

        default: {
            return null
        }
    }
}
