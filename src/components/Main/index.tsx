import React, { useCallback, useState } from 'react'
import { Value, Document, Block, Text, Inline } from 'slate'
import Html from 'slate-html-serializer'
import Ae from '@/core/Ae'
import { rules } from '@/core/Ae/rules'
import App, { IAppState } from '../App'
import Typograf from 'typograf'

const tp = new Typograf({ locale: ['ru', 'en-US'] })
function typo(value: string): string {
    return tp.execute(value)
}

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

type MainProps = {
    initialValue: Value
}

export const Main: React.FC<MainProps> = ({ initialValue }) => {
    const [state, setState] = useState<{ value: Value, htmlValue: string }>({
        value: initialValue,
        htmlValue: '',
    })

    const onChange = useCallback(({ value }: { value: Value }) => {
        // console.log('Outline:')
        // outline(value)

        // console.log('html:')
        const htmlValue = html.serialize(value)

        setState({
            value,
            htmlValue,
        })
    }, [])

    const renderContent = (options: IAppState) => {
        const value = state.value

        const { showRendered = true } = options

        const ae = (
            <Ae
                value={value}
                onChange={onChange}
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
                        dangerouslySetInnerHTML={{ __html: state.htmlValue }}
                    />
                </div>
            </div>
        )
    }

    // const value = state.value
    // if (!value) {
    //     return null
    // }

    return (
        <App
            value={state.value}
            onChange={onChange}
            renderContent={renderContent}
            onSync={async value => {
                const data = {
                    id: Date.now(),
                    meta: {},
                    data: value.toJSON(),
                }
                console.log(data)
                // const res = await axios.put('http://localhost:8000/samples/2', data)
            }}
        />
    )
}
