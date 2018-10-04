import React from 'react'
import className from 'classnames'

export default class Video extends React.PureComponent {
    onClick = (event: Event) => {
        event.stopPropagation()
    }

    render() {
        const {
            node, isSelected, editor, attributes,
        } = this.props
        const src = node.data.get('src')
        // const url = node.data.get('url')

        // const { readOnly } = editor.props

        // const wrapperStyle = {
        //     position: 'relative',
        //     paddingBottom: '50.66%',
        //     paddingTop: '25px',
        //     height: '0',
        //     // outline: isSelected ? `2px solid ${blue[500]}` : 'none',
        // }

        // const maskStyle = {
        //     display: isSelected ? 'none' : 'block',
        //     position: 'absolute',
        //     top: '0px',
        //     left: '0px',
        //     right: '0px',
        //     bottom: '0px',
        //     height: '100%',
        //     cursor: 'cell',
        //     zIndex: 1,
        // }

        const iframeStyle = {
            // position: 'absolute',
            // top: '0px',
            // left: '0px',
            // width: '100%',
            // height: '100%',
        }

        return (
            <figure {...attributes}
                className={className('ae-block-video', {
                    focused: isSelected,
                })}
            >
                <iframe
                    title='video-embed'
                    // id='ytplayer'
                    // type='text/html'
                    // width='100%'
                    // height='390'
                    src={src}
                    frameBorder='0'
                    style={iframeStyle}
                    allowFullScreen
                />
            </figure>
        )
    }
}