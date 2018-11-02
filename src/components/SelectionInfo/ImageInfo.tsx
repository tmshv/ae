import React from 'react'
import className from 'classnames'
import { AspectRatioIcon, LandscapeIcon } from 'mdi-react'
import { CropLandscapeIcon, CropPortraitIcon, CropSquareIcon } from 'mdi-react'
import InfoIconButton from './InfoIconButton'
import { BlockInfoProps } from '.'

enum ImageLayout {
    square = 'square',
    portrait = 'portrait',
    landscape = 'landscape',
}

function nextLayout(currentValue: ImageLayout): ImageLayout {
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

export class ImageInfo extends React.PureComponent<BlockInfoProps, object> {
    onAspectClick = (event: Event) => {
        event.preventDefault()

        const { block, value } = this.props
        const change = value.change()

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

        return this.props.onChange(
            change.setNodeByKey(block.key, newProps)
        )
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
        const { block } = this.props
        const layout: ImageLayout = block.data.get('layout') || ImageLayout.square

        return (
            <div>
                <InfoIconButton
                    onClick={this.onAspectClick}
                >
                    {this.renderAspectIcon(layout)}
                </InfoIconButton>
            </div>
        )
    }
}