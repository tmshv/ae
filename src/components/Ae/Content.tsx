import React from 'react'
import Image from '../Image'

interface BlockProps {
    content: string
}

function Block(props: BlockProps) {
    return (
        <div
            dangerouslySetInnerHTML={{__html: props.content}}
        />
    )
}

interface ContentProps {
    type: string
    options: any
}

export default function Content(props: ContentProps) {
    switch (props.type) {
        case "Block": {
            return (
                <Block
                    content={props.options.content}
                />
            )
        }

        case "Picture": {
            return <Image
                src={props.options.source}
            />
        }

        default: {
            return null
        }
    }
}