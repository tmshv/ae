import React from 'react'
import className from 'classnames'
import { BlockProps } from '.'

export class Image extends React.PureComponent<BlockProps, object> {
    onCaptionChange = (event) => {
        const caption = event.target.value
        const { node, editor } = this.props
        const src = node.data.get('src')

        console.log(caption)

        editor.change(c => c.setNodeByKey(node.key, {
            data: {
                caption,
                src,
            }
        }))
    }

    onCaptionClick = (event) => {
        event.stopPropagation()
    }

    render() {
        const { node, attributes, isSelected } = this.props
        const src = node.data.get('src')
        const caption = node.data.get('caption')

        return (
            <div
                {...attributes}
                className={className('ae-block-image', {
                    focused: isSelected,
                })}
            >
                <img
                    src={src}
                    alt={caption}
                />
            </div>
        )
    }
}