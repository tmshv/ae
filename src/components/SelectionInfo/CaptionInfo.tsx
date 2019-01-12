import React from 'react'
import { BlockInfoProps } from '.'
import ButtonGroup from '../../ui/Button/ButtonGroup'
import Button from '../Button'
import { ContentAlign } from '../../core/Ae/const'
import setDataField from '../../core/Ae/changes/setDataField'

const alignItems = [
    { name: 'Left', value: ContentAlign.left },
    { name: 'Right', value: ContentAlign.right },
    { name: 'Center', value: ContentAlign.center },
]

export class CaptionInfo extends React.PureComponent<BlockInfoProps, object> {
    onAlignClick = (event: Event, value: string) => {
        // console.log(value)

        return this.props.onChange(
            setDataField(this.props.value, this.props.block, 'align', value)
        )
    }

    render() {
        const { block } = this.props
        const align = block.data.get('align')

        return (
            <div>
                <ButtonGroup>
                    {alignItems.map(x => (
                        <Button
                            key={x.value}
                            value={x.value}
                            onClick={this.onAlignClick}
                            highlight={x.value === align}
                        >
                            {x.name}
                        </Button>
                    ))}
                </ButtonGroup>
            </div>
        )
    }
}