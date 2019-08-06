import React from 'react'
import { RenderNodeProps } from 'slate-react'
import { BlockType } from './const'
import { ParagraphBlock as Paragraph } from './blocks/Paragraph'
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
import { Block } from 'slate'

export default function renderNode(props: RenderNodeProps): any {
    const block = props.node as Block
    const content = renderNodeFactory(props)
    return content

    // TODO: try to react portal or something else.
    // in this case slate select blocks not correctly

    const rootBlock = props.editor.value.document.getFurthestAncestor(block.key) as Block
    const isRoot = block.key === rootBlock.key
    if (props.isSelected && isRoot) {
        return (
            <div style={{
                position: 'relative',
            }}>
                <div
                    // {...props.attributes}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: 20,
                        height: 20,
                        backgroundColor: 'tomato',
                    }}
                >
                </div>

                {content}
            </div>
        )
    }

    return content
}

export function renderNodeFactory(props: RenderNodeProps): React.ReactNode | undefined {
    const { node } = props
    const type = (node as Block).type

    switch (type) {
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
                <Blockquote {...props} />
            )
        }

        case BlockType.accent: {
            return (
                <Accent {...props} />
            )
        }

        case BlockType.listItem: {
            return (
                <ListItem {...props} />
            )
        }

        case BlockType.orderedList: {
            return (
                <List
                    {...props}
                    ordered={true}
                />
            )
        }

        case BlockType.unorderedList: {
            return (
                <List
                    {...props}
                    ordered={false}
                />
            )
        }

        case BlockType.table: {
            return (
                <table className={'ae-block-table'}>
                    <tbody {...props} />
                </table>
            )
        }

        case BlockType.tableRow: {
            return (
                <tr {...props} />
            )
        }

        case BlockType.tableCell: {
            return (
                <td {...props} />
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
