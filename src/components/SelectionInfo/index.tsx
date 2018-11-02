import React from 'react'
import { Value, Block, Change } from 'slate'
import { BlockType } from '../Aeditor/const'
import { DivisionInfo } from './DivisionInfo'
import { ImageInfo } from './ImageInfo'

interface Props {
    value: Value,
    onChange: (change: Change) => void,
}

export interface BlockInfoProps {
    block: Block,
    value: Value,
    onChange: (change: Change) => void,
}

export default class SelectionInfo extends React.Component<Props, {}> {
    renderDivision(block: Block) {
        return (
            <div key={block.key}>
                <p>
                    {block.type}
                </p>

                <DivisionInfo
                    value={this.props.value}
                    onChange={this.props.onChange}
                    block={block}
                />
            </div>
        )
    }

    renderImage(block: Block) {
        return (
            <div key={block.key}>
                <p>
                    {block.type}
                </p>

                <ImageInfo
                    value={this.props.value}
                    onChange={this.props.onChange}
                    block={block}
                />
            </div>
        )
    }

    renderFigure(block: Block) {
        const hasCaption = block.getBlocksByType(BlockType.caption).size > 0

        return (
            <div key={block.key}>
                <p>
                    {block.type}
                </p>

                <p>
                    hasCaption: {JSON.stringify(hasCaption)}
                </p>
            </div>
        )
    }

    renderBlock = (block: Block) => {
        switch (block.type) {
            case BlockType.division: {
                return this.renderDivision(block)
            }

            case BlockType.image: {
                return this.renderImage(block)
            }

            case BlockType.figure: {
                return this.renderFigure(block)
            }

            default: {
                return (
                    <div key={block.key}>
                        {block.type}
                    </div>
                )
            }
        }
    }

    renderInfoFragment() {
        const { value } = this.props
        const { selection, document } = value

        const singleSelection = selection.isFocused && selection.isCollapsed

        // {/* <p>
        //     text: {fragment.text}
        // </p> */}

        if (!singleSelection) {
            return null
        }

        const key = (selection as any).focusKey
        const ancestors = document.getAncestors(key)
            .filter(x => x.object !== 'document')
            .map(x => x as Block)

        return (
            <React.Fragment>
                {ancestors.map(x => this.renderBlock(x))}
            </React.Fragment>
        )
    }

    render() {
        return (
            <div>
                {this.renderInfoFragment()}
            </div>
        )
    }
}
