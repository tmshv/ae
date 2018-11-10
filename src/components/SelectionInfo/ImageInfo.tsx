import React from 'react'
import className from 'classnames'
import { BlockInfoProps } from '.'
import ButtonGroup from '../../ui/Button/ButtonGroup'
import Button from '../Button'
import { ImageCorner } from '../Aeditor/const'

enum ImageLayout {
    square = 'square',
    portrait = 'portrait',
    landscape = 'landscape',
}

const layoutItems = [
    { name: 'Square', value: ImageLayout.square },
    { name: 'Landscape', value: ImageLayout.landscape },
    { name: 'Portrait', value: ImageLayout.portrait },
]

const cornerItems = [
    { name: 'Rectangle', value: ImageCorner.rect },
    { name: 'Round', value: ImageCorner.round },
    { name: 'Circle', value: ImageCorner.circle },
]

export class ImageInfo extends React.PureComponent<BlockInfoProps, object> {
    changeField(field: string, newValue: any) {
        const { block, value } = this.props
        const change = value.change()

        const newProps: any = {
            data: block.data.set(field, newValue)
        }

        return this.props.onChange(
            change.setNodeByKey(block.key, newProps)
        )
    }

    onCornerClick = (event: Event, value: string) => {
        return this.changeField('corner', value)
    }

    onLayoutClick = (event: Event, value: string) => {
        return this.changeField('layout', value)
    }

    render() {
        const { block } = this.props
        const layout: ImageLayout = block.data.get('layout')
        const corner: ImageCorner = block.data.get('corner')

        return (
            <div>
                <ButtonGroup>
                    {layoutItems.map(x => (
                        <Button
                            key={x.value}
                            value={x.value}
                            onClick={this.onLayoutClick}
                            highlight={x.value === layout}
                        >
                            {x.name}
                        </Button>
                    ))}
                </ButtonGroup>

                <ButtonGroup>
                    {cornerItems.map(x => (
                        <Button
                            key={x.value}
                            value={x.value}
                            onClick={this.onCornerClick}
                            highlight={x.value === corner}
                        >
                            {x.name}
                        </Button>
                    ))}
                </ButtonGroup>
            </div>
        )
    }
}