import React from 'react'
import axios from 'axios'
import { Value, ValueJSON, Document, Block, Text, Inline } from 'slate'
import Html from 'slate-html-serializer'
import Ae from '../src/core/Ae'
import { rules } from '../src/core/Ae/rules'
import App from '../src/components/App'
// import Plain from 'slate-plain-serializer'
import Typograf from 'typograf'

const tp = new Typograf({ locale: ['ru', 'en-US'] })
const typo = (value: string) => tp.execute(value)
// const typo = (value: string) => value

import 'antd/dist/antd.css'

const html = new Html({
    rules: rules(typo),
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

export default class Index extends React.Component<{ data: ValueJSON}, IState> {
    static async getInitialProps() {
        const res = await axios.get('http://localhost:8000/samples/1')
        const item = res.data

        return {
            data: item.data
        }
    }

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
        const value = Value.fromJSON(this.props.data)

        this.setState({
            value,
        })
    }

    render() {
        const value = this.state.value

        if (!value) {
            return null
        }

        return (
            <App
                value={value}
                onChange={this.onChange}
                renderContent={this.renderContent}
            />
        )
    }

    private renderContent = (options: any) => {
        const value = this.state.value

        const { showRendered = true } = options

        const ae = (
            <Ae
                value={value}
                onChange={this.onChange}
            />
        )

        if (!showRendered) {
            return ae
        }

        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <div
                    className={'ae-editor'}
                    style={{
                        width: '50%',
                        borderRight: '2px solid black',
                    }}
                >
                    {ae}
                </div>

                <div
                    className={'ae-editor'}
                    style={{
                        width: '50%',
                        borderLeft: '2px solid black',
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
