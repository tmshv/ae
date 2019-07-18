import React from 'react'
import { Block } from 'slate'
import { FlashlightIcon, FlashlightOffIcon } from 'mdi-react'
import InfoIconButton from './InfoIconButton'
import { BlockInfoProps } from '.'
import { BlockType } from '../../core/Ae/const'
import createCaption from '../../core/Ae/utils/createCaption'

function getCaptions(block: Block) {
    return (block as any).getBlocksByType(BlockType.caption)
}

export class FigureInfo extends React.PureComponent<BlockInfoProps, object> {
    onAddCaptionClick = (event: Event) => {
        event.preventDefault()

        const caption = createCaption('...')

        const { block, value } = this.props
        const change = value.change()
        const indexAfterImage = 1 // find it

        return this.props.onChange(
            change.insertNodeByKey(block.key, indexAfterImage, caption)
        )
    }

    onRemoveCaptionClick = (event: Event) => {
        event.preventDefault()

        const { block, value } = this.props
        const change = getCaptions(block)
            .reduce(
                (change, x) => change.removeNodeByKey(x.key),
                value.change()
            )

        return this.props.onChange(
            change
        )
    }

    render() {
        const { block } = this.props

        const hasCaption = getCaptions(block).size > 0

        return (
            <div>
                {hasCaption ? (
                    <InfoIconButton
                        onClick={this.onRemoveCaptionClick}
                    >
                        <FlashlightOffIcon />
                    </InfoIconButton>
                ) : (
                        <InfoIconButton
                            onClick={this.onAddCaptionClick}
                        >
                            <FlashlightIcon />
                        </InfoIconButton>
                    )}
            </div>
        )
    }
}