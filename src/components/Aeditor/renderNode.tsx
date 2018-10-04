import React from 'react'
import { BlockType } from './const'
import { Paragraph } from './blocks/Paragraph'
import { Image } from './blocks/Image'
import { File } from './blocks/File'
import { Blockquote } from './blocks/Blockquote'
import { Header } from './blocks/Header'
import Video from './blocks/Video';

export default function renderNode(props) {
    const { node, attributes } = props

    switch (node.type) {
        case BlockType.header1: {
            return (
                <Header {...props} />
            )
        }

        case BlockType.paragraph: {
            return (
                <Paragraph {...props} />
            )
        }

        case BlockType.image: {
            return (
                <Image {...props} />
            )
        }

        case BlockType.file: {
            return (
                <File {...props} />
            )
        }

        case BlockType.blockquote: {
            return (
                <Blockquote {...attributes}>{props.children}</Blockquote>
            )
        }

        case BlockType.listItem: {
            return (
                <li {...attributes}>{props.children}</li>
            )
        }

        case BlockType.orderedList: {
            return (
                <ol {...attributes}>{props.children}</ol>
            )
        }

        case BlockType.unorderedList: {
            return (
                <ul {...attributes}>{props.children}</ul>
            )
        }

        case BlockType.table: {
            return (
                <table className={'ae-block-table'}>
                    <tbody {...attributes}>
                        {props.children}
                    </tbody>
                </table>
            )
        }

        case BlockType.tableRow: {
            return (
                <tr {...attributes}>
                    {props.children}
                </tr>
            )
        }

        case BlockType.tableCell: {
            return (
                <td {...attributes}>
                    {props.children}
                </td>
            )
        }

        case BlockType.video: {
            return (
                <Video {...props} />
            )
        }

        default: {
            break
        }
    }
}
