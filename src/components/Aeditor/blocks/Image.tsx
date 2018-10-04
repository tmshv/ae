import React from 'react'
import className from 'classnames'
import { BlockProps } from '.'

const Img = ({ src, mix }) => (
    <img
        className={className(mix)}
        style={{
            display: 'block',
            width: '100%',
        }}
        src={src}
    />
)

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
        // const { node, editor, attributes, connectDragSource, isDragging, isSelected } = this.props;
        const { node, attributes, isSelected } = this.props

        const src = node.data.get('src')
        const caption = node.data.get('caption')
        // const caption = src
        const { readOnly } = this.props.editor.props

        // const imgStyle = {
        //     cursor: readOnly ? 'auto' : 'move',
        //     border: isSelected ? `2px solid gold` : '',
        //     // opacity: isDragging ? 0.5 : 1,
        // };

        return (
            <figure
                {...attributes}
                className={className('ae-block-image', {
                    focused: isSelected,
                })}
            >
                <Img
                    mix={'image'}
                    src={src}
                />

                {/* <figcaption>
                    {readOnly ? caption : (
                        <input
                            onChange={this.onCaptionChange}
                            onClick={this.onCaptionClick}
                            value={caption}
                            placeholder={'caption'}
                        />
                    )}
                </figcaption> */}
            </figure>
        )
    }
}