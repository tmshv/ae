import React from 'react'
import className from 'classnames'
import { BlockProps } from '.';

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
    render() {
        // const { node, editor, attributes, connectDragSource, isDragging, isSelected } = this.props;
        const { node, attributes, isSelected } = this.props;

        const src = node.data.get('src');
        // const caption = node.data.get('caption');
        const caption = JSON.stringify(isSelected);
        // const { readOnly } = editor.props;

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

                <figcaption>
                    {caption}
                </figcaption>
            </figure>
        )
    }
}