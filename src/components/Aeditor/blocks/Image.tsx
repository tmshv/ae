import React from 'react'
import className from 'classnames'
import { AspectRatioIcon, LandscapeIcon } from 'mdi-react'
import { CropLandscapeIcon, CropPortraitIcon, CropSquareIcon } from 'mdi-react'
import { BlockProps } from '.'
import Aspect from '../../../components/Aspect'
import BlockControls from '../../../components/BlockControls'
import IconButton from '../../../components/IconButton'

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

function nextLayout(currentValue: ImageLayout): ImageLayout {
    // const values = [
    //     3 / 4,
    //     // 4 / 3,
    //     9 / 16,
    //     // 16 / 9,
    //     1 / 1
    // ]

    const values = [
        ImageLayout.square,
        ImageLayout.landscape,
        ImageLayout.portrait,
    ]

    let i = values.indexOf(currentValue)
    if (i >= values.length - 1) {
        i = 0
    } else {
        i++
    }

    return values[i]
}

export class Image extends React.PureComponent<BlockProps, object> {
    onAspectClick = (event: Event) => {
        event.preventDefault()

        const { node, editor } = this.props

        const src = node.data.get('src')
        const caption = node.data.get('caption')
        const ratio = node.data.get('ratio')
        const layout = nextLayout(node.data.get('layout'))

        editor.change(c => c.setNodeByKey(node.key, {
            data: {
                caption,
                ratio,
                src,
                layout,
            }
        }))
    }

    renderAspectIcon(layout: ImageLayout) {
        switch (layout) {
            case ImageLayout.landscape: {
                return (
                    <CropLandscapeIcon />
                )
            }

            case ImageLayout.portrait: {
                return (
                    <CropPortraitIcon />
                )
            }

            case ImageLayout.square: {
                return (
                    <CropSquareIcon />
                )
            }

            default: {
                return (
                    <AspectRatioIcon />
                )
            }
        }
    }

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

                {!isSelected ? null : (
                    <BlockControls>
                        <IconButton
                            hoverColor={'blue'}
                            size={20}
                            onClick={this.onAspectClick}
                        >
                            {this.renderAspectIcon(layout)}
                        </IconButton>
                    </BlockControls>
                )}
            </div>
        )
    }
}