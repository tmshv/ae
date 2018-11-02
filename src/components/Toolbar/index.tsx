import React from 'react'
import slate from 'slate'
import {
    ImageIcon,
    FormatHeader1Icon,
    BugIcon,
    FileIcon,
    FormatQuoteCloseIcon,
    FormatListBulletedIcon,
    TableIcon,
    DivisionIcon,
} from 'mdi-react'
import IconButton from '../IconButton'
import { BlockType } from '../Aeditor/const'
import insertImage from '../Aeditor/changes/insertImage'
import listPlugin from '../Aeditor/plugins/list'
import tablePlugin from '../Aeditor/plugins/table'
import blockquotePlugin from '../Aeditor/plugins/blockquote'
import insertDivision from '../Aeditor/changes/insertDivision'

import './styles.less'

interface ToolbarProps {
    value: slate.Value,
    onChange: any,
}

export default class Toolbar extends React.Component<ToolbarProps, any> {
    hasBlock(type) {
        return this.props.value.blocks.some(node => node.type === type)
    }

    onClickBug = (event) => {
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
        // const change = this.props.value.change()
        // const file = {
        //     srcPreview: 'https://art.shlisselburg.org/data/images/ae64123551407d5c325f75d83f58a338-medium.jpg',
        //     srcFile: '',
        //     name: 'Some PDF file',
        //     size: 5000000,
        //     mimeType: 'application/pdf',
        // }

        // return this.props.onChange(
        //     insertFile(change, file, undefined)
        // )
    }

    onClickHeader = (event) => {
        event.preventDefault()

        const change = this.props.value.change()
        const type = this.hasBlock(BlockType.header1)
            ? BlockType.paragraph
            : BlockType.header1

        return this.props.onChange(change.setBlocks(type))
    }

    onClickQuote = (event: Event) => {
        event.preventDefault()

        const value = this.props.value
        const change = value.change()

        return blockquotePlugin.utils.isSelectionInBlockquote(value)
            ? this.props.onChange(blockquotePlugin.changes.unwrapBlockquote(change))
            : this.props.onChange(blockquotePlugin.changes.wrapInBlockquote(change))
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

    renderButton(onClick, children) {
        return (
            <IconButton
                mix={'ae-toolbar-button'}
                onClick={onClick}
                size={20}
                color={'#666'}
                hoverColor={'#333'}
                focusColor={'#000'}
                activeColor={'gold'}
                disabledColor={'#ddd'}
                disabled={false}
                active={false}
            >
                {children}
            </IconButton>
        )
    }

    render() {
        return (
            <div className={'ae-toolbar'}>
                <div className={'left'}>
                    <input
                        type={'file'}
                        onChange={this.onChangeFile}
                    />
                    {this.renderButton(this.onClickImage, (
                        <ImageIcon />
                    ))}
                    {/* {this.renderButton(this.onClickFile, (
                        <FileIcon />
                    ))} */}
                    {this.renderButton(this.onClickHeader, (
                        <FormatHeader1Icon />
                    ))}
                    {this.renderButton(this.onClickQuote, (
                        <FormatQuoteCloseIcon />
                    ))}
                    {this.renderButton(this.onClickUnorderedList, (
                        <FormatListBulletedIcon />
                    ))}
                    {this.renderButton(this.onClickTable, (
                        <TableIcon />
                    ))}
                    {this.renderButton(this.onClickDivision, (
                        <DivisionIcon />
                    ))}
                </div>

                <div className={'right'}>
                    {this.renderButton(this.onClickBug, (
                        <BugIcon />
                    ))}
                </div>
            </div>
        )
    }
}
