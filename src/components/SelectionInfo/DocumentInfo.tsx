import React from 'react'
import { List } from 'immutable'
import { Change, Value, Block } from 'slate'
import className from 'classnames'
import { BlockType } from '../../core/Ae/const'
import Aspect from '../Aspect'

interface DocumentInfoProps {
    value: Value,
    onChange: (change: Change) => void,
}

function getImages(value: Value): List<Block> {
    const images = value.document.filterDescendants(node => {
        if (Block.isBlock(node)) {
            return (node as Block).type === BlockType.image
        }

        return false
    })

    return images.map(node => (node as Block)).toList()
}

export class DocumentInfo extends React.Component<DocumentInfoProps, object> {
    renderImages() {
        const blocks = getImages(this.props.value)

        return (
            <div className={'ae-document-info--image-list'}>
                {blocks.map(block => {
                    const src = block.data.get('src')

                    return (
                        <div
                            key={block.key}
                            className={className('ae-block-image')}
                            style={{
                                minWidth: 100,
                            }}
                        >
                            <Aspect
                                ratio={1}
                            >
                                <img
                                    src={src}
                                />
                            </Aspect>
                        </div>
                    )
                })}
            </div>
        )
    }

    render() {
        return (
            <div>
                <div>Document</div>

                {this.renderImages()}
            </div>
        )
    }
}
