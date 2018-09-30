import React from 'react'
import slate from 'slate'
import { ImageIcon, FormatHeader1Icon, BugIcon } from 'mdi-react'
import IconButton from '../IconButton'
import { BlockType } from '../Aeditor/const'
import { insertImage } from '../Aeditor/lib'

import './styles.less'

interface ToolbarProps {
    value: slate.Value,
    onChange: any,
}

export default class Toolbar extends React.Component<ToolbarProps, any> {
    hasBlock(type) {
        return this.props.value.blocks.some(node => node.type === type)
    }

    onClickBug = (event) => {
        event.preventDefault()

        const data = this.props.value.toJSON()

        console.log(JSON.stringify(data, null, 4))
    }

    onClickImage = () => {
        const change = this.props.value.change();

        return this.props.onChange(
            insertImage(change, '/static/1.jpg', null)
        )
    }

    onClickHeader = (event) => {
        event.preventDefault()

        const change = this.props.value.change();
        const type = this.hasBlock(BlockType.header1)
            ? BlockType.paragraph
            : BlockType.header1

        return this.props.onChange(change.setBlocks(type))
    }

    renderButton(onClick, children) {
        return (
            <IconButton
                mix={'ae-toolbar-button'}
                onClick={onClick}
                size={20}
                color={'#999'}
                hoverColor={'#999'}
                focusColor={'#999'}
                disabledColor={'#999'}
                disabled={false}
            >
                {children}
            </IconButton>
        )
    }

    render() {
        return (
            <div className={'ae-toolbar'}>
                <div className={'left'}>
                    {this.renderButton(this.onClickImage, (
                        <ImageIcon />
                    ))}
                    {this.renderButton(this.onClickHeader, (
                        <FormatHeader1Icon />
                    ))}
                </div>

                <div className={'right'}>
                    {this.renderButton(this.onClickBug, (
                        <BugIcon />
                    ))}
                </div>
            </div>
        )
    }
}
