import React from 'react'
import slate, { Value } from 'slate'
import { Button, Row, Col } from 'antd'
import {
    ImageIcon,
    BugIcon,
    FileIcon,
    AlertBoxIcon,
    FormatQuoteCloseIcon,
    FormatListBulletedIcon,
    TableIcon,
    DivisionIcon,
    LinkIcon,
} from 'mdi-react'
import IconButton from '../IconButton'
import { BlockType, IUrlCardData } from '../../core/Ae/const'
import insertImage from '../../core/Ae/changes/insertImage'
import insertFile from '../../core/Ae/changes/insertFile'
import { IFile } from '../../core/Ae/utils/createFile'
import insertUrlCard from '../../core/Ae/changes/insertUrlCard'
import listPlugin from '../../core/Ae/plugins/list'
import tablePlugin from '../../core/Ae/plugins/table'
import blockquotePlugin from '../../core/Ae/plugins/blockquote'
import insertDivision from '../../core/Ae/changes/insertDivision'
// import { isSelectionInAccent } from '../../core/Ae/plugins/accent/lib'

import './styles.less'
// import { wrapInAccent, unwrapAccent } from '../../core/Ae/plugins/accent/changes';

interface SimpleToolbarAction {
    id: string
    icon?: string
    name?: string
    action: (value: Value, event: React.MouseEvent<HTMLButtonElement>) => void
}

interface CustomToolbarAction {
    id: string
    component: React.ReactNode
}

type ToolbarAction = SimpleToolbarAction | CustomToolbarAction
// type ToolbarAction = SimpleToolbarAction

export interface IToolbarProps {
    value: slate.Value,
    onChange: any,

    left: ToolbarAction[]
    right: ToolbarAction[]
}

export default class Toolbar extends React.Component<IToolbarProps, any> {
    private createContent(item: ToolbarAction) {
        if ('component' in item) {
            return item.component
        }

        if (item.icon) {
            return (
                <Button
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                        item.action(this.props.value, event)
                    }}
                    icon={item.icon}
                    ghost
                />
            )
        }

        if (item.name) {
            return (
                <Button
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                        item.action(this.props.value, event)
                    }}
                    ghost
                >{item.name}</Button>
            )
        }

        return (
            <Button
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                    item.action(this.props.value, event)
                }}
                ghost
            >action</Button>
        )
    }

    hasBlock(type) {
        return this.props.value.blocks.some(node => node.type === type)
    }

    onClickSync = (event) => {
        event.preventDefault()

        const data = this.props.value.toJSON()

        console.log(JSON.stringify(data, undefined, 4))
    }

    onClickImage = () => {
        const change = this.props.value.change()

        return this.props.onChange(
            insertImage(change, '/static/1.jpg', undefined)
        )
    }

    onClickFile = () => {
        const change = this.props.value.change()
        const file: IFile = {
            srcPreview: 'https://art.shlisselburg.org/data/images/ae64123551407d5c325f75d83f58a338-medium.jpg',
            srcFile: '',
            name: 'Some PDF file',
            size: 5000000,
            mimeType: 'application/pdf',
        }

        return this.props.onChange(
            insertFile(change, file, undefined)
        )
    }

    onClickUrlCard = () => {
        const change = this.props.value.change()
        const data: IUrlCardData = {
            url: 'https://varlamov.ru/3160798.html',
            title: '20 лучших архитектурных объектов 2018 года',
            description: 'D',
            imageSrc: 'https://l-files.livejournal.net/og_image/10761149/12346?v=1541254574',
        }

        return this.props.onChange(
            insertUrlCard(change, data, undefined)
        )
    }


    onClickQuote = (event: Event) => {
        event.preventDefault()

        const value = this.props.value
        const change = value.change()

        return blockquotePlugin.utils.isSelectionInBlockquote(value)
            ? this.props.onChange(blockquotePlugin.changes.unwrapBlockquote(change))
            : this.props.onChange(blockquotePlugin.changes.wrapInBlockquote(change))
    }

    onClickAccent = (event: Event) => {
        event.preventDefault()

        const value = this.props.value
        const change = value.change()

        const type = this.hasBlock(BlockType.accent)
            ? BlockType.paragraph
            : BlockType.accent

        return this.props.onChange(
            change.setBlocks(type)
        )
    }

    onClickUnorderedList = (event: Event) => {
        event.preventDefault()

        const type = BlockType.unorderedList
        const value = this.props.value
        const change = value.change()

        const inList = listPlugin.utils.isSelectionInList(value)

        // const isTargetType = listPlugin.utils.getCurrentList(value).type === type
        // const isActive = listPlugin.utils.isSelectionInList(value) && isTargetType
        // return isActive
        return inList
            ? this.props.onChange(listPlugin.changes.unwrapList(change))
            : this.props.onChange(listPlugin.changes.wrapInList(change, type))
    }

    onClickTable = (event: Event) => {
        event.preventDefault()

        const value = this.props.value
        const change = value.change()
        const isActive = tablePlugin.utils.isSelectionInTable(value)

        return isActive
            ? this.props.onChange(tablePlugin.changes.removeTable(change))
            : this.props.onChange(tablePlugin.changes.insertTable(change, 3))
    }

    onClickDivision = (event: Event) => {
        console.log('toolbar: click divison')
        event.preventDefault()

        const value = this.props.value
        const change = value.change()

        return this.props.onChange(insertDivision(change, 2, null))
    }

    onChangeFile = (event) => {
        const files: FileList = event.target.files

        // This will upload the file after having read it
        const upload = async (file) => {
            const body = new FormData()
            body.append('file', file)
            body.append('user', 'hubot')

            console.log('Uploading')
            console.log(file)
            console.log(body)

            try {
                const response = await fetch('/upload', { // Your PUT endpoint
                    method: 'PUT',
                    // headers: {
                    //     'Content-Type': 'You will perhaps need to define a content-type here',
                    // },
                    body, // This is your file object
                })

                const data = await response.json() // if the response is a JSON object
                console.log(data) // Handle the success response object

                const change = this.props.value.change()

                return this.props.onChange(
                    insertImage(change, data.filepath, undefined)
                )
            } catch (error) {
                console.log(error) // Handle the error response object
            }
        }

        return upload(files[0])
    }

    public render() {
        const rightColSpan = 24 / this.props.right.length
        const leftColSpan = 24 / this.props.left.length

        return (
            <div className={'ae-toolbar'}>
                <div className={'left'}>
                    <Button.Group style={{
                        marginRight: 9,
                    }}>
                        <Button
                            icon={'arrow-left'}
                            ghost
                        />
                        <Button
                            icon={'arrow-right'}
                            ghost
                        />
                    </Button.Group>

                    <Row
                        gutter={0}
                    >
                        {this.props.left.map(x => (
                            <Col
                                key={x.id}
                                span={leftColSpan}
                            >
                                {this.createContent(x)}
                            </Col>
                        ))}
                    </Row>

                    {/* <input
                        type={'file'}
                        onChange={this.onChangeFile}
                    /> */}
                    {/* {this.renderButton(this.onClickImage, (
                        <ImageIcon />
                    ))} */}
                    {/* {this.renderButton(this.onClickFile, (
                        <FileIcon />
                    ))} */}

                    {/* {this.renderButton(this.onClickQuote, (
                        <FormatQuoteCloseIcon />
                    ))} */}
                    {/* {this.renderButton(this.onClickAccent, (
                        <AlertBoxIcon />
                    ))} */}
                    {/* {this.renderButton(this.onClickUnorderedList, (
                        <FormatListBulletedIcon />
                    ))} */}
                    {/* {this.renderButton(this.onClickTable, (
                        <TableIcon />
                    ))} */}
                    {/* {this.renderButton(this.onClickDivision, (
                        <DivisionIcon />
                    ))} */}
                    {/* {this.renderButton(this.onClickUrlCard, (
                        <LinkIcon />
                    ))} */}
                </div>

                <div className={'right'}>
                    <Row
                        gutter={10}
                    >
                        {this.props.right.map(x => (
                            <Col
                                key={x.id}
                                span={rightColSpan}
                            >
                                {this.createContent(x)}
                            </Col>
                        ))}
                    </Row>
                </div>
            </div >
        )
    }
}
