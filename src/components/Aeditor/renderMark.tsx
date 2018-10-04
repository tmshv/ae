import React from 'react'
import { MarkType } from './const'

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
                <mark>{children}</mark>
            )
        }

        default: {
            return null
        }
    }
}
