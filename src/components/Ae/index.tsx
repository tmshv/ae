import React, { Component } from 'react'
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
    value: any,
    onChange(any)
}

export default class Ae extends Component<AeProps, any> {
    get frames() {
        return this.props.value.frames
        // return [
        //     ...this.props.value.rows,
        //     createDefaultDivision(),
        // ]
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
            rows: listPush(this.frames, x),
        })
    }

    onDeleteRowClick = event => {
        this.update({
            rows: dropRight(this.frames),
        })
    }

    onAddContent = (rowIndex, elementIndex, element) => {
        const row = this.frames[rowIndex]
        const content = listReplaceIndex(row.content, elementIndex, element)

        this.update({
            rows: listReplaceIndex(this.frames, rowIndex, merge(row, {
                content,
            })),
        })
    }

    onMergeRight = (rowIndex, elementIndex) => {
        const row = this.frames[rowIndex]
        const divisionRange = div(row.divide)
        divisionRange[elementIndex - 1] = divisionRange[elementIndex]
        const divide = listRemoveIndex(divisionRange, elementIndex)

        let content = cloneDeep(row.content)
        content[elementIndex - 1] = content[elementIndex]
        content = listRemoveIndex(content, elementIndex)

        this.update({
            rows: listReplaceIndex(this.frames, rowIndex, merge(row, {
                content,
                divide,
            })),
        })
    }

    /**
     * @param {Number} divide 
     */
    divideLast(divide) {
        const row = last(this.frames)
        const content = listTrim(
            listFill(row.content, divide, i => `hi-${i}`),
            divide,
        )
        this.update({
            rows: listReplaceLast(this.frames, merge(row, {
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
        // return (
        //     <Division>
        //         <Img
        //             src={image1}
        //             ratio={8 / 16}
        //         />
        //     </Division>
        // )
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
