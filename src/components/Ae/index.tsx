import React, { Component } from 'react'
import Ae from './Ae'
import { dropRight, last, slice, range, isNumber, cloneDeep, isNull, isUndefined, isFunction } from 'lodash'
import Frame from './Frame'
import {
    createDefaultDivision,
    div,
    listTrim,
    listFill,
    listRemoveIndex,
    listReplaceIndex,
    listPush,
    listReplaceLast,
    merge,
} from './lib'

import './styles.less'

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

interface AeProps {
    value: Ae,
    onChange(any)
}

export default class AeEditor extends Component<AeProps, any> {
    get frames() {
        return this.props.value.frames
    }

    get hasFrames() {
        return this.frames.length > 0
    }

    update(partial) {
        this.props.onChange({
            ...this.props.value,
            ...partial,
        })
    }

    onAddRowClick = event => {
        const x = this.hasFrames
            ? cloneDeep(last(this.frames))
            : createDefaultDivision()

        this.update({
            frames: listPush(this.frames, x),
        })
    }

    onDeleteRowClick = event => {
        this.update({
            frames: dropRight(this.frames),
        })
    }

    onAddContent = (frameIndex, elementIndex, element) => {
        const frame = this.frames[frameIndex]
        const content = listReplaceIndex(frame.content, elementIndex, element)

        this.update({
            frames: listReplaceIndex(this.frames, frameIndex, merge(frame, {
                content,
            })),
        })
    }

    onMergeRight = (frameIndex, elementIndex) => {
        const frame = this.frames[frameIndex]
        const divisionRange = div(frame.divide)
        divisionRange[elementIndex - 1] = divisionRange[elementIndex]
        const divide = listRemoveIndex(divisionRange, elementIndex)

        let content = cloneDeep(frame.content)
        content[elementIndex - 1] = content[elementIndex]
        content = listRemoveIndex(content, elementIndex)

        this.update({
            frames: listReplaceIndex(this.frames, frameIndex, merge(frame, {
                content,
                divide,
            })),
        })
    }

    /**
     * @param {Number} divide 
     */
    divideLast(divide) {
        const frame = last(this.frames)
        const content = listTrim(
            listFill(frame.content, divide, i => `hi-${i}`),
            divide,
        )
        this.update({
            frames: listReplaceLast(this.frames, merge(frame, {
                content,
                divide,
            })),
        })
    }

    renderFrame = (frame, index) => {
        return (
            <Frame
                frame={frame}
                onMergeRight={i => this.onMergeRight(index, i)}
                onAddContent={(i, element) => this.onAddContent(index, i, element)}
                key={index}
            />
        )
    }

    onKeyDown = (event) => {
        event.preventDefault()
        const n = parseInt(event.key)

        if (isNaN(n)) {
            return
        }

        this.divideLast(n)
    }

    renderControls() {
        return (
            <div
                className={'controls'}
            >
                <button
                    onClick={this.onAddRowClick}
                >+</button>

                <button
                    onClick={this.onDeleteRowClick}
                // disabled={!this.hasFrames}
                >–</button>
            </div>
        )
    }

    render() {
        console.log(this.props.value)

        return (
            <div
                className={'ae'}
            >
                <div
                    tabIndex={0}
                    className={'ae-layout-container'}
                    onKeyDown={this.onKeyDown}
                >
                    {this.frames.map(this.renderFrame)}
                </div>

                {this.renderControls()}
            </div>
        )
    }
}
