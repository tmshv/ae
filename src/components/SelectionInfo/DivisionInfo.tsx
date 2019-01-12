import React from 'react'
import className from 'classnames'
import { Change, Block } from 'slate'
import { BlockInfoProps } from '.'
import { DivisionLayout } from '../../core/Ae/const'
import ButtonGroup from '../../ui/Button/ButtonGroup'
import Button from '../Button'

const items = [
    { name: 'Default', value: DivisionLayout.default },
    { name: 'Big', value: DivisionLayout.big },
    { name: 'Full', value: DivisionLayout.full },
]

export class DivisionInfo extends React.Component<BlockInfoProps, object> {
    setLayout = (layout: DivisionLayout) => {
        const { block, value } = this.props
        const change: Change = value.change()

        const newProps: any = {
            data: block.data.set('layout', layout)
        }

        return this.props.onChange(change.setNodeByKey(block.key, newProps))
    }

    onClickLayout = (event: Event, value: string) => {
        return this.setLayout(value as DivisionLayout)
    }

    onAddBefore = (event: Event) => {
        const { block, value } = this.props
        const change: Change = value.change()

        return this.props.onChange(change.insertNodeByKey(block.key, 0, Block.create('paragraph')))
    }

    onAddAfter = (event: Event) => {
        const { block, value } = this.props
        const change: Change = value.change()

        const i = block.nodes.size

        return this.props.onChange(change.insertNodeByKey(block.key, i, Block.create('paragraph')))
    }

    renderLayout() {
        const layout: DivisionLayout = this.props.block.data.get('layout')

        return (
            <ButtonGroup>
                {items.map(x => (
                    <Button
                        key={x.value}
                        highlight={x.value === layout}
                        onClick={this.onClickLayout}
                        value={x.value}
                    >
                        {x.name}
                    </Button>
                ))}
            </ButtonGroup>
        )
    }

    render() {
        return (
            <div>
                {this.renderLayout()}

                <Button
                    onClick={this.onAddBefore}
                >
                    Add Before
                </Button>

                <Button
                    onClick={this.onAddAfter}
                >
                    Add After
                </Button>
            </div>
        )
    }
}
