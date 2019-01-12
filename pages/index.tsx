import React from 'react'
import { Value, ValueJSON, Document, Block, Text, Inline } from 'slate'
import Html from 'slate-html-serializer'
import Ae from '../src/core/Ae'
import { slateSample } from '../src/sample'
import { rules } from '../src/core/Ae/rules'
// import Plain from 'slate-plain-serializer'

const html = new Html({
    rules: rules(),
})

interface IState {
    value: Value,
    htmlValue: string,
}

function outline(value: Value) {
    const document: Document = value.document

    document.nodes.forEach(node => {
        outlineNode(node, 0)
    })
}

function pad(depth: number): string {
    if (depth === 0) {
        return ''
    }

    const x: string = ' '
    return x.padStart(depth * 4)
}

function outlineNode(node: Block | Text | Inline, depth: number) {
    if (Block.isBlock(node)) {
        const block = node as Block
        const t = pad(depth)

        console.log(`${t} ${block.type}`)

        try {
            block.nodes.forEach(node => {
                outlineNode(node, depth + 1)
            })
        } catch (e) {
        }
    }
}

export default class Index extends React.Component<object, IState> {
    constructor(props) {
        super(props)

        this.state = {
            value: null,
            htmlValue: null,
        }
    }

    onChange = ({ value }: { value: Value }) => {
        // console.log('Outline:')
        // outline(value)

        // console.log('html:')
        const htmlValue = html.serialize(value)

        this.setState({
            value,
            htmlValue,
        })
    }

    componentDidMount() {
        const json = slateSample() as ValueJSON
        const value = Value.fromJSON(json)

        this.setState({
            value,
        })
    }

    render() {
        if (!this.state.value) {
            return null
        }

        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Ae
                    value={this.state.value}
                    onChange={this.onChange}
                />

                <div
                    className={'ae-editor'}
                    style={{
                        marginTop: 100,
                        width: '50%',
                    }}
                >
                    <div
                        dangerouslySetInnerHTML={{ __html: this.state.htmlValue }}
                    />
                </div>
            </div>
        )
    }
}
