import React from 'react'
import className from 'classnames'
import { Change } from 'slate'
import { Dice1Icon, Dice4Icon, Dice5Icon } from 'mdi-react'
import { BlockInfoProps } from '.'
import IconButton from '../IconButton'

enum DivisionLayout {
    default = 'default',
    big = 'big',
    full = 'full',
}

function nextLayout(currentValue: DivisionLayout): DivisionLayout {
    const values = [
        DivisionLayout.default,
        DivisionLayout.big,
        DivisionLayout.full,
    ]

    let i = values.indexOf(currentValue)
    if (i >= values.length - 1) {
        i = 0
    } else {
        i++
    }

    return values[i]
}

export class DivisionInfo extends React.Component<BlockInfoProps, object> {
    onMouseDown = (event: Event) => {
        event.preventDefault()
    }

    onClick = (event: Event) => {
        console.log('division_info: click')

        event.preventDefault()

        const { block, value } = this.props
        const change: Change = value.change()

        const src = block.data.get('src')
        const caption = block.data.get('caption')
        const ratio = block.data.get('ratio')
        const layout = nextLayout(block.data.get('layout'))

        const newProps: any = {
            data: {
                caption,
                ratio,
                src,
                layout,
            }
        }

        return this.props.onChange(change.setNodeByKey(block.key, newProps))
    }

    renderIcon(layout: DivisionLayout) {
        switch (layout) {
            case DivisionLayout.default: {
                return (
                    <Dice1Icon />
                )
            }

            case DivisionLayout.big: {
                return (
                    <Dice4Icon />
                )
            }

            case DivisionLayout.full: {
                return (
                    <Dice5Icon />
                )
            }

            default: {
                return (
                    <Dice1Icon />
                )
            }
        }
    }

    render() {
        const { block } = this.props
        const layout: DivisionLayout = block.data.get('layout') || DivisionLayout.default

        return (
            <IconButton
                hoverColor={'blue'}
                size={20}
                onClick={this.onClick}
                onMouseDown={this.onMouseDown}
            >
                {this.renderIcon(layout)}
            </IconButton>
        )
    }
}
