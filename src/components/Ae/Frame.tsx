import React from 'react'
import { range, isNumber } from 'lodash'
import Division from '../Division'
import Content from './Content';

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

interface FrameProps {
    onMergeRight(number)
    onAddContent(number, any)

    frame: any
}

export default class Frame extends React.Component<FrameProps, any> {
    get frame() {
        return this.props.frame
    }

    renderControls(i: number) {
        return (
            <div
                className={'ae-frame-controls'}
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

    renderNode = (node, i) => {
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
                <Content
                    type={node.type}
                    options={node.options}
                />
                {this.renderControls(i)}
            </div>
        )
    }

    render() {
        const divide = this.frame.divide
        const nodes = this.frame.nodes
        const division = div(divide)
        const vertical = this.frame.direction === 'vertical'

        return (
            <Division
                className={'ae-frame'}
                division={division}
                vertical={vertical}
            >
                {nodes.map(this.renderNode)}
            </Division>
        )
    }
}
