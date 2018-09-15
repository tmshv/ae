import React, { Children } from 'react'
import { dropRight, last, slice, range, isNumber, cloneDeep, isNull, isUndefined, isFunction } from 'lodash'
import Division from '../Division'
import Image from '../Image'

const image1 = '/static/1.jpg'

function createDefaultDivision() {
    return {
        type: 'Division',
        divide: 1,
        content: ['>']
    }
}

function getDivisionRange(divide) {
    const step = 1 / divide

    // return range(0, 1, step).map(x => x + step)
    return range(step, step + 1, step)
}

function div(divide) {
    if (Array.isArray(divide)) {
        return divide
    }

    if (isNumber(divide)) {
        return getDivisionRange(divide)
    }

    return []
}

function Block(props) {
    return (
        <div
            style={{
                width: props.width,
                height: props.height,
            }}
        >
            {props.children}
        </div>
    )
}

interface FrameProps {
    onMergeRight(number)
    onAddContent(number, any)

    frame: any
    // divide: number | [number]
    // direction: string
    // nodes: [any]

    //     value:string,
    //     name:string
}

//   export default class Home extends React.Component<FrameProps>{

// () => (
//     <Block
//         width={'100%'}
//     >
//         <Image
//             src={image1}
//             ratio={3 / 4}
//         />
//     </Block>
// )

export default class Frame extends React.Component<FrameProps, any> {
    get frame(){
        return this.props.frame
    }

    renderControls(i: number) {
        return (
            <div
                className={'ae-block-controls'}
            >
                {i === 0 ? null : (
                    <button
                        onClick={() => {
                            this.props.onMergeRight(i)
                        }}
                    >merge right</button>
                )}
                <button
                    onClick={() => {
                        this.props.onAddContent(i, {})
                    }}
                >+</button>
            </div>
        )
    }

    renderNode(node, i) {
        // {isFunction(x) ? (
        //     x()
        // ) : (
        //         <span>{x}</span>
        //     )
        // }

        if (node.type === "Frame") {
            return (
                <Frame
                    key={i}
                    frame={node.options}
                    onMergeRight={this.props.onMergeRight}
                    onAddContent={this.props.onAddContent}
                />
            )
        }

        return (
            <div
                key={i}
                className={'ae-frame-section'}
            >
                <span>
                    {node.options.content}
                </span>
                {this.renderControls(i)}
            </div>
        )
    }

    render() {
        const divide = this.frame.divide
        const nodes = this.frame.nodes

        const vertical = this.frame.direction === 'vertical'

        // const contentSize = nodes.length
        // const contentSize = isNumber(divide)
        //     ? divide
        //     : Array.from(divide).length

        const division = div(divide)

        return (
            <Division
                className={'ae-frame'}
                division={division}
                vertical={vertical}
            >
                {nodes.map((x, i) => this.renderNode(x, i))}
            </Division>
        )
    }
}
