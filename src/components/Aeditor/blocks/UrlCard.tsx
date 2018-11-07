import React from 'react'
import className from 'classnames'
import { BlockProps } from '.'
import Aspect from '../../../components/Aspect'

export class UrlCard extends React.PureComponent<BlockProps, object> {
    render() {
        const { node, attributes, isSelected } = this.props
        const imageSrc: string = node.data.get('imageSrc')
        const url: string = node.data.get('url')

        return (
            <div
                {...attributes}
                className={className('ae-block-url-card', {
                    focused2: isSelected,
                })}
            >
                {this.props.children}
                {/* {isSelected
                    ? (
                        
                    ) : (
                        <a href={url}>
                            {this.props.children}
                        </a>
                    )} */}
            </div>
        )
    }
}