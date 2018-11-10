import React from 'react'
import { Value, ValueJSON, Document, Block, Text, Inline } from 'slate'
import Html from 'slate-html-serializer'
import Aeditor from '../src/components/Aeditor'
import { slateSample } from '../src/sample'
import { rules } from '../src/components/Aeditor/rules'
// import Plain from 'slate-plain-serializer'

const html = new Html({
    rules: rules(),
})

interface IState {
    value: Value,
}

function outline(value: Value) {
    const document: Document = value.document

    document.nodes.forEach(node => {
        outlineNode(node, 0)
    })
}

function pad(depth: number): string {
    return depth !== 0
        ? (' ').padStart(depth * 4)
        : ''
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
            value: undefined,
        }
    }

    onChange = ({ value }: { value: Value }) => {
        // console.log('Outline:')
        // outline(value)

        console.log('html:')
        console.log(html.serialize(value))

        this.setState({
            value
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
                <Aeditor
                    value={this.state.value}
                    onChange={this.onChange}
                />
            </div>
        )
    }
}

// Index.getInitialProps = async () => {
//     const json = slateSample()

//     return {
//         json,
//     }
// }
