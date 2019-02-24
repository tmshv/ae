import React from 'react'
import className from 'classnames'
import { BlockProps } from '.'
import Aspect from '../../../components/Aspect'
import { ImageLayout } from '../const'

export function getRatio(layout: string, value: number = 1): number {
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
        const layout: string = node.data.get('layout')
        const corner: string = node.data.get('corner')
        const ratio: number = node.data.get('ratio')
        const aspectRatio = getRatio(layout, ratio)

        const cornerClass = `corner-${corner}`

        return (
            <div
                {...attributes}
                className={className('ae-block-image', cornerClass, {
                    focused: isSelected,
                })}
            >
                <Aspect
                    ratio={aspectRatio}
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