import React from 'react'
import className from 'classnames'
import { BlockProps } from '.'

const Img = ({ src, mix }) => (
    <img
        className={className(mix)}
        style={{
            display: 'block',
        }}
        src={src}
    />
)

export class File extends React.PureComponent<BlockProps, object> {
    render() {
        // const { node, editor, attributes, connectDragSource, isDragging, isSelected } = this.props;
        const { node, attributes, isSelected } = this.props

        const src = node.data.get('srcPreview')
        const name = node.data.get('name')
        const { readOnly } = this.props.editor.props

        return (
            <figure
                {...attributes}
                className={className('ae-block-file', {
                    focused: isSelected,
                })}
            >
                <Img
                    mix={'file-preview'}
                    src={src}
                />

                {/* {this.props.children} */}
            </figure>
        )
    }
}
