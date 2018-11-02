import React from 'react'
import className from 'classnames'
import { BlockProps } from './'

export default class Video extends React.PureComponent<BlockProps, any, any> {
    render() {
        const { node, isSelected, attributes } = this.props
        const src = node.data.get('src')

        return (
            <div {...attributes}
                className={className('ae-block-video', )}
            >
                <figure {...attributes}
                    className={className('wrapper', {
                        focused: isSelected,
                    })}
                >
                    <iframe
                        title='video-embed'
                        src={src}
                        frameBorder='0'
                        allowFullScreen
                    />
                </figure>
            </div>
        )
    }
}
