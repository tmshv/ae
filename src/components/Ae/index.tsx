import React from 'react'
import PropTypes from 'prop-types'
import { dropRight, last, slice, range, isNumber, cloneDeep, isNull, isUndefined, isFunction } from 'lodash'
import AeBlock from './AeBlock'
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

export default class Ae extends React.Component {
    static propTypes = {
        value: PropTypes.object,
        onChange: PropTypes.func,
    }

    get rows() {
        return this.props.value.rows
        // return [
        //     ...this.props.value.rows,
        //     createDefaultDivision(),
        // ]
    }

    get hasRows() {
        return this.rows.length > 0
    }

    update(partial) {
        this.props.onChange({
            ...this.props.value,
            ...partial,
        })
    }

    onAddRowClick = event => {
        const x = this.hasRows
            ? cloneDeep(last(this.rows))
            : createDefaultDivision()

        this.update({
            rows: listPush(this.rows, x),
        })
    }

    onDeleteRowClick = event => {
        this.update({
            rows: dropRight(this.rows),
        })
    }

    onAddContent = (rowIndex, elementIndex, element) => {
        const row = this.rows[rowIndex]
        const content = listReplaceIndex(row.content, elementIndex, element)

        this.update({
            rows: listReplaceIndex(this.rows, rowIndex, merge(row, {
                content,
            })),
        })
    }

    onMergeRight = (rowIndex, elementIndex) => {
        const row = this.rows[rowIndex]
        const divisionRange = div(row.divide)
        divisionRange[elementIndex - 1] = divisionRange[elementIndex]
        const divide = listRemoveIndex(divisionRange, elementIndex)

        let content = cloneDeep(row.content)
        content[elementIndex - 1] = content[elementIndex]
        content = listRemoveIndex(content, elementIndex)

        this.update({
            rows: listReplaceIndex(this.rows, rowIndex, merge(row, {
                content,
                divide,
            })),
        })
    }

    /**
     * @param {Number} divide 
     */
    divideLast(divide) {
        const row = last(this.rows)
        const content = listTrim(
            listFill(row.content, divide, i => `hi-${i}`),
            divide,
        )
        this.update({
            rows: listReplaceLast(this.rows, merge(row, {
                content,
                divide,
            })),
        })
    }

    renderRow = (row, index) => {
        return (
            <AeBlock
                row={row}
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

    render() {
        console.log(this.props.value)

        const rows = this.rows;

        return (
            <div
                className={'ae'}
            >
                <div
                    tabIndex={0}
                    className={'ae-layout-container'}
                    onKeyDown={this.onKeyDown}
                >
                    {rows.map(this.renderRow)}
                </div>

                <div
                    className={'controls'}
                >
                    <button
                        onClick={this.onAddRowClick}
                    >add row</button>

                    <button
                        onClick={this.onDeleteRowClick}
                    // disabled={!this.hasRows}
                    >delete row</button>
                </div>
            </div>
        )
    }
}
