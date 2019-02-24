import * as React from 'react'
import { BlockProps } from '.'
import Paragraph from '../../../blocks/Paragraph'

export function ParagraphBlock(props: BlockProps) {
    return React.createElement(Paragraph, {
        ...props.attributes,
        children: props.children,
    })
}
