import React from 'react'
import { Editor, getEventTransfer } from 'slate-react'
import { Value, Change } from 'slate'
import EditList from 'slate-edit-list'
import isUrl from 'is-url'
import blockquotePlugin from './plugins/blockquote'
import listPlugin from './plugins/list'
import tablePlugin from './plugins/table'
import schema from './schema'
import { handleTextPaste } from './lib'

import { BlockType } from './const'

import imagePasteDrop from './plugins/imagePasteDrop'
import { Paragraph } from './blocks/Paragraph'
import { Image } from './blocks/Image'
import { File } from './blocks/File'
import { Blockquote } from './blocks/Blockquote'

import Toolbar from '../Toolbar'
import { Header } from './blocks/Header'
import exitHeader from './plugins/exitHeader'

import './styles.less'

// Define a React component renderer for our code blocks.
function CodeNode(props) {
    return (
        <pre {...props.attributes}>
            <code>{props.children}</code>
        </pre>
    )
}

function WordCount() {
    return {
        renderEditor(props) {
            const { children, editor } = props

            console.log(editor)

            // const wordCount = countWords(editor.value.text)
            // const wordCount = editor.value.text.length

            const wordCount = Math.random()

            return (
                <div>
                    {children}
                    <span className="word-count">{wordCount}</span>
                </div>
            )
        }
    }
}

function renderEditor(props) {
    const { editor } = props

    console.log(props.value)

    // const wordCount = countWords(editor.value.text)
    // const wordCount = editor.value.text.length

    // const wordCount = Math.random()

    return (
        <div>
            {props.children}
        </div>
    )
}

const plugins = [
    blockquotePlugin,
    listPlugin,
    tablePlugin,
    exitHeader(),
    // imagePasteDrop({
    //     insertImage: (change, file, editor) => {
    //         // console.log(change, file, editor)

    //         return change.insertBlock({
    //             type: 'image',
    //             isVoid: true,
    //             data: { file }
    //         })
    //     }
    // })
    // WordCount(),
    // EditList(),
]

export interface AeditorProps {
    value: Value,
}

interface State {
    value: Value,
}

// Define our app...
export default class Aeditor extends React.Component<AeditorProps, State> {
    // Set the initial value when the app is first constructed.
    state = {
        value: this.props.value,
    }

    // On change, update the app's React state with the new editor value.
    onChange = ({ value }) => {
        // text of block where curcor is
        // console.log(value.anchorText.text)
        // console.log(value.anchorBlock.type)
        // console.log(JSON.stringify(value.toJSON()))

        this.setState({ value })
    }

    // Define a new handler which prints the key that was pressed.
    onKeyDown = (event: KeyboardEvent, change: Change) => {
        // if (event.key === '§') {
        //     change.setBlocks('img')
        //     return true
        // }

        // if (event.key != '`' || !event.ctrlKey) return

        // event.preventDefault()

        // // Determine whether any of the currently selected blocks are code blocks.
        // const isCode = change.value.blocks.some(block => block.type == 'code')

        // // Toggle the block type depending on `isCode`.
        // change.setBlocks(isCode ? 'paragraph' : 'code')
        // return true

        // switch (event.key) {
        //     case 'Enter':{
        //         const currentLine = change.value.blocks.map(block => block.getText())
        //         console.log(currentLine.join(''))

        //         // console.log(change.value.blocks)
        //     }
        // }

        // // Return with no changes if the keypress is not '&'
        // if (event.key !== '&') return

        // // Prevent the ampersand character from being inserted.
        // event.preventDefault()

        // // Change the value by inserting 'and' at the cursor's position.
        // change.insertText('and')
        // return true
    }

    onPaste = (e, change) => {
        const transfer = getEventTransfer(e)

        switch (transfer.type) {
            // case 'files': return this.handleOnDrop(files);
            case 'text': {
                return handleTextPaste(e, change)
            }
            // case 'html': return onPasteHtml(e, change);
            default: break
        }
    }

    renderNode = props => {
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
                    <table>
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

            default: {
                break
            }
        }
    }

    renderToolbar() {
        return (
            <Toolbar
                value={this.state.value}
                onChange={this.onChange}
            />
        )
    }

    renderEditor() {
        return (
            <Editor
                onPaste={this.onPaste}
                value={this.state.value}
                onChange={this.onChange}
                renderNode={this.renderNode}
                // onKeyDown={this.onKeyDown}
                // schema={schema}
                // renderEditor={renderEditor}
                plugins={plugins}
            />
        )
    }

    render() {
        console.log('')

        return (
            <div className={'ae-editor'}>
                {this.renderToolbar()}
                {this.renderEditor()}
            </div>
        )
    }
}
