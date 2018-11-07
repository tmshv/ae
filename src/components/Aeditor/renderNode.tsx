import React from 'react'
import { BlockType } from './const'
import { Paragraph } from './blocks/Paragraph'
import { Image } from './blocks/Image'
import { File } from './blocks/File'
import { Blockquote } from './blocks/Blockquote'
import { Accent } from './blocks/Accent'
import { Header } from './blocks/Header'
import Video from './blocks/Video'
import { Figure } from './blocks/Figure'
import { Caption } from './blocks/Caption'
import { List } from './blocks/List'
import { ListItem } from './blocks/ListItem'
import { DivisionBlock } from './blocks/Division'
import { UrlCard } from './blocks/UrlCard'

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

        case BlockType.accent: {
            return (
                <Accent {...props}/>
            )
        }

        case BlockType.listItem: {
            return (
                <ListItem {...attributes}>{props.children}</ListItem>
            )
        }

        case BlockType.orderedList: {
            return (
                <List
                    {...attributes}
                    ordered={true}
                >
                    {props.children}
                </List>
            )
        }

        case BlockType.unorderedList: {
            return (
                <List
                    {...attributes}
                    ordered={false}
                >
                    {props.children}
                </List>
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

        case BlockType.figure: {
            return (
                <Figure {...props} />
            )
        }

        case BlockType.caption: {
            return (
                <Caption {...props} />
            )
        }

        case BlockType.division: {
            return (
                <DivisionBlock
                    {...props}
                    className={'ae-block-division'}
                />
            )
        }

        case BlockType.urlCard: {
            return (
                <UrlCard {...props} />
            )
        }

        default: {
            break
        }
    }
}
