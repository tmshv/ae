import React from 'react'
import className from 'classnames'
import { BlockProps } from '.'
import Aspect from '../../../components/Aspect'

enum ImageLayout {
    square = 'square',
    portrait = 'portrait',
    landscape = 'landscape',
}

function getRatio(layout: ImageLayout = ImageLayout.square, value: number = 1): number {
    value = 3 / 4

    switch (layout) {
        case ImageLayout.landscape: {
            return value
        }

        case ImageLayout.portrait: {
            return 1 / value
        }

        case ImageLayout.square: {
            return 1
        }

        default: {
            return value
        }
    }
}

export class Image extends React.PureComponent<BlockProps, object> {
    render() {
        const { node, attributes, isSelected } = this.props
        const src: string = node.data.get('src')
        const caption: string = node.data.get('caption')
        const layout: ImageLayout = node.data.get('layout') || ImageLayout.square
        const ratio: number = node.data.get('ratio')

        return (
            <div
                {...attributes}
                className={className('ae-block-image', {
                    focused: isSelected,
                })}
            >
                <Aspect
                    ratio={getRatio(layout, ratio)}
                >
                    <img
                        src={src}
                        alt={caption}
                    />
                </Aspect>
            </div>
        )
    }
}