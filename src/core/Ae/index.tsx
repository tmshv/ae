import React, { useCallback, useState } from 'react'
import { Editable, Slate, useFocused, useSelected, useSlateStatic, withReact } from 'slate-react'
import { createEditor, Editor, Text, Transforms } from 'slate'
import schema from './schema'
import handlePaste from './utils/handlePaste'
import renderNode from './renderNode'
import renderMark from './renderMark'

// TypeScript users only add this code
import { BaseEditor, Descendant } from 'slate'
import { ReactEditor } from 'slate-react'

type CustomText = { text: string }
type CustomElement = { type: 'paragraph'; children: CustomText[] }

type CodeElement = { type: 'code'; children: CustomText[] }
type BreakElement = { type: 'break'; children: CustomText[] }
type ImageElement = {
    type: 'image'
    url: string
    children: CustomText[]
}

declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor
        Element: CustomElement | CodeElement | ImageElement | BreakElement
        Text: CustomText
    }
}

const withBreak = (editor: Editor) => {
    const { isVoid } = editor
    editor.isVoid = element => {
        return element.type === 'break' ? true : isVoid(element)
    }
    return editor
}

const withImages = (editor: Editor) => {
    const { insertData, isVoid } = editor

    editor.isVoid = element => {
        return element.type === 'image' ? true : isVoid(element)
    }


    // editor.insertData = data => {
    //     const text = data.getData('text/plain')
    //     const { files } = data

    //     if (files && files.length > 0) {
    //         for (const file of files) {
    //             const reader = new FileReader()
    //             const [mime] = file.type.split('/')

    //             if (mime === 'image') {
    //                 reader.addEventListener('load', () => {
    //                     const url = reader.result
    //                     insertImage(editor, url)
    //                 })

    //                 reader.readAsDataURL(file)
    //             }
    //         }
    //     } else if (isImageUrl(text)) {
    //         insertImage(editor, text)
    //     } else {
    //         insertData(data)
    //     }
    // }

    return editor
}

const insertImage = (editor: Editor, url: string) => {
    const text = { text: '' }
    const image: ImageElement = { type: 'image', url, children: [text] }
    Transforms.insertNodes(editor, image)
}

// Define a React component renderer for our code blocks.
const CodeElement: React.FC<any> = props => {
    return (
        <pre {...props.attributes}>
            <code>{props.children}</code>
        </pre>
    )
}


// Define a React component to render leaves with bold text.
const Leaf: React.FC<any> = props => {
    return (
        <span
            {...props.attributes}
            style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
        >
            {props.children}
        </span>
    )
}

const HorizontalBreak: React.FC<any> = ({ attributes, children }) => {
    return (
        <div {...attributes} contentEditable={false}>
            {children}
            <hr />
        </div>
    )
}

const DefaultElement: React.FC<any> = props => {
    return <p {...props.attributes}>{props.children}</p>
}

const Image: React.FC<any> = ({ attributes, children, element }) => {
    const editor = useSlateStatic()
    const path = ReactEditor.findPath(editor, element)

    const selected = useSelected()
    const focused = useFocused()
    return (
        <div {...attributes}>
            {children}
            <div
                contentEditable={false}
            //         className={css`
            //   position: relative;
            // `}
            >
                <img
                    src={element.url}
                    style={{
                        display: 'block',
                        maxWidth: '100%',
                        maxHeight: 300,
                        boxShadow: `${selected && focused ? '0 0 0 3px #B4D5FF' : 'none'}`,
                    }}
                />
                {/* <Button
                    active
                    onClick={() => Transforms.removeNodes(editor, { at: path })}
                    className={css`
            display: ${selected && focused ? 'inline' : 'none'};
            position: absolute;
            top: 0.5em;
            left: 0.5em;
            background-color: white;
          `}
                >
                    <Icon>delete</Icon>
                </Button> */}
            </div>
        </div>
    )
}

export type AeProps = {
    value: any,
    // onChange: (change: Change) => void,
    // plugins: Plugin[],
}

export const Ae: React.FC<AeProps> = ({ value }) => {
    // Create a Slate editor object that won't change across renders.
    const [editor] = useState(() => withBreak(withImages(withReact(createEditor()))))

    const renderEditor = useCallback((props: any) => (
        <div className={'ae-editor'}>
            {props.children}
        </div>
    ), [])
    // Define a rendering function based on the element passed to `props`. We use
    // `useCallback` here to memoize the function for subsequent renders.
    const renderElement = useCallback(props => {
        switch (props.element.type) {
            case 'code':
                return <CodeElement {...props} />
            case 'break':
                return <HorizontalBreak {...props} />
            case 'image':
                return <Image {...props} />
            default:
                return <DefaultElement {...props} />
        }
    }, [])

    // Define a leaf rendering function that is memoized with `useCallback`.
    const renderLeaf = useCallback(props => {
        return <Leaf {...props} />
    }, [])

    return (
        <Slate
            editor={editor}
            value={value}
            onChange={value => {
                // console.log(value)
                console.log(JSON.stringify(value))
                return
                const isAstChange = editor.operations.some(
                    op => 'set_selection' !== op.type
                )
                if (isAstChange) {
                    // Save the value to Local Storage.
                    // const content = JSON.stringify(value)
                    // localStorage.setItem('content', content)
                }
            }}
        >
            <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                onKeyDown={event => {
                    // console.log(event.key)

                    if (!event.ctrlKey) {
                        return
                    }

                    switch (event.key) {
                        // When "`" is pressed, keep our existing code block logic.
                        case '`': {
                            event.preventDefault()
                            const [match] = Editor.nodes(editor, {
                                match: n => n.type === 'code',
                            })
                            Transforms.setNodes(
                                editor,
                                { type: match ? 'paragraph' : 'code' },
                                { match: n => Editor.isBlock(editor, n) }
                            )
                            break
                        }

                        // When "B" is pressed, bold the text in the selection.
                        case 'b': {
                            event.preventDefault()
                            Transforms.setNodes(
                                editor,
                                { bold: true },
                                // Apply it to text nodes, and split the text node up if the
                                // selection is overlapping only part of it.
                                { match: n => Text.isText(n), split: true }
                            )
                            break
                        }

                        case 'h': {
                            event.preventDefault()
                            Transforms.insertNodes(editor, [
                                {
                                    type: 'break',
                                    children: [
                                        { text: 'inserted hr' }
                                    ]
                                }
                            ])
                            break
                        }

                        case '&': {
                            // Prevent the ampersand character from being inserted.
                            event.preventDefault()
                            // Execute the `insertText` method when the event occurs.
                            editor.insertText('and')
                            break
                        }
                    }
                }}
            />
        </Slate>
    )

    // return (
    //     <Editor
    //         value={value}
    //         // onPaste={handlePaste}
    //         onChange={onChange}
    //         // renderNode={renderNode}
    //         // renderMark={renderMark}
    //         renderEditor={renderEditor}
    //         // schema={schema}
    //         plugins={plugins}
    //     />
    // )
}
