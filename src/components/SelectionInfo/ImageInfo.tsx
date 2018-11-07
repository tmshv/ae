import React from 'react'
import className from 'classnames'
import { BlockInfoProps } from '.'
import ButtonGroup from '../../ui/Button/ButtonGroup'
import Button from '../Button'

enum ImageLayout {
    square = 'square',
    portrait = 'portrait',
    landscape = 'landscape',
}

const items = [
    { name: 'Square', value: ImageLayout.square },
    { name: 'Landscape', value: ImageLayout.landscape },
    { name: 'Portrait', value: ImageLayout.portrait },
]

export class ImageInfo extends React.PureComponent<BlockInfoProps, object> {
    setLayout(layout: ImageLayout) {
        const { block, value } = this.props
        const change = value.change()

        const newProps: any = {
            data: block.data.set('layout', layout)
        }

        return this.props.onChange(
            change.setNodeByKey(block.key, newProps)
        )
    }

    onAspectClick = (event: Event, value: string) => {
        return this.setLayout(value as ImageLayout)
    }

    render() {
        const { block } = this.props
        const layout: ImageLayout = block.data.get('layout')

        return (
            <div>
                <ButtonGroup>
                    {items.map(x => (
                        <Button
                            key={x.value}
                            value={x.value}
                            onClick={this.onAspectClick}
                            highlight={x.value === layout}
                        >
                            {x.name}
                        </Button>
                    ))}
                </ButtonGroup>
            </div>
        )
    }
}