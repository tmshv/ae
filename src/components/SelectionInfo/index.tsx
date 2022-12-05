import * as React from 'react'
import { Button, Switch } from 'antd'
import { Value, Block, Change } from 'slate'
import className from 'classnames'
import { BlockType } from '../../core/Ae/const'
import { DivisionInfo } from './DivisionInfo'
import { ImageInfo } from './ImageInfo'
import { FigureInfo } from './FigureInfo'
import { DocumentInfo } from './DocumentInfo'
import { CaptionInfo } from './CaptionInfo'

interface Props {
    value: Value
    onChange(change: Change): void
    showFull: boolean
    showRendered: boolean
    onChangeShowFull(value: boolean): void
    onChangeShowRendered(value: boolean, event: Event): void
}

export interface BlockInfoProps {
    block: Block,
    value: Value,
    onChange: (change: Change) => void,
}

export default class SelectionInfo extends React.Component<Props, {}, any> {
    onClickShowFull = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.props.onChangeShowFull(!this.props.showFull)
    }

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

    renderCaption(block: Block) {
        return (
            <div key={block.key}>
                <p>
                    {block.type}
                </p>

                <CaptionInfo
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
        return (
            <div key={block.key}>
                <p>
                    {block.type}
                </p>

                <FigureInfo
                    value={this.props.value}
                    onChange={this.props.onChange}
                    block={block}
                />
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

            case BlockType.caption: {
                return this.renderCaption(block)
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

        if (!singleSelection) {
            return null
        }

        const key = (selection as any).startKey
        const ancestors = (document as any).getAncestors(key)
            .filter(x => x.object !== 'document')
            .map(x => x as Block)

        return (
            <React.Fragment>
                {ancestors.map(x => this.renderBlock(x))}

                <DocumentInfo
                    value={this.props.value}
                    onChange={this.props.onChange}
                />

            </React.Fragment>
        )
    }

    render() {
        const icon = this.props.showFull
            ? 'double-left'
            : 'double-right'

        return (
            <div className={className('ae-selection-info', {
                expanded: this.props.showFull,
            })}>
                <div className={'content'}>
                    {!this.props.showFull ? null : (
                        this.renderInfoFragment()
                    )}
                </div>

                <Switch
                    size={'small'}
                    checked={this.props.showRendered}
                    onChange={this.props.onChangeShowRendered}
                    style={{
                        marginBottom: '10px',
                    }}
                />

                <Button
                    icon={icon}
                    onClick={this.onClickShowFull}
                />
            </div>
        )
    }
}
