import React from 'react'
import { Editor as SlateEditor } from 'slate-react'
import { Value } from 'slate'
import EditList from 'slate-edit-list'
import isUrl from 'is-url'
import schema from './schema'

import { BlockType } from './const'

import imagePasteDrop from './plugins/imagePasteDrop'
import { Paragraph } from './blocks/Paragraph'
import { Image } from './blocks/Image'

import './styles.less'
import Toolbar from '../Toolbar';
import { Header } from './blocks/Header';

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

// const schema = {
//     document: {
//         last: { types: ['paragraph'] },
//         normalize: (change, reason, { node, child }) => {
//             switch (reason) {
//                 case LAST_CHILD_TYPE_INVALID: {
//                     const paragraph = Block.create('paragraph')
//                     return change.insertNodeByKey(node.key, node.nodes.size, paragraph)
//                 }
//             }
//         },
//     },
// }

const plugins = [
    imagePasteDrop({
        insertImage: (change, file, editor) => {
            // console.log(change, file, editor)

            return change.insertBlock({
                type: 'image',
                isVoid: true,
                data: { file }
            })
        }
    })
    // WordCount(),
    // EditList(),
]

// Define our app...
export default class Aeditor extends React.Component {
    // Set the initial value when the app is first constructed.
    state = {
        value: this.props.value,
    }

    onClickImage = () => {
        console.log('Image')
    }

    // On change, update the app's React state with the new editor value.
    onChange = ({ value }) => {
        // console.log('CHANGE')
        // console.log(value.selection.anchor)

        // text of block where curcor is
        // console.log(value.anchorText.text)
        // console.log(value.anchorBlock.type)

        window.x = value

        // console.log(JSON.stringify(value.toJSON()))

        this.setState({ value })
    }

    // Define a new handler which prints the key that was pressed.
    onKeyDown = (event, change) => {
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

    renderNode = props => {
        const { attributes, node } = props

        // console.log('props.isSelected', props.isSelected)
        // console.log(attributes)
        console.log('renderNode', node.type)
        console.log('isSelected', props.isSelected, node.text)
        // debugger

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

            default: {
                break
            }
        }

        return (
            <Paragraph {...props} />
        )
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
            <SlateEditor
                autoFocus={true}
                // schema={schema}
                value={this.state.value}
                onChange={this.onChange}
                // onKeyDown={this.onKeyDown}
                renderNode={this.renderNode}
                schema={schema}
            // renderEditor={renderEditor}
            // plugins={plugins}
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
