import className from 'classnames'
import * as React from 'react'
import { Upload, Button, message } from 'antd'
import Toolbar from '../Toolbar'
import SelectionInfo from '../SelectionInfo'
import { Value, Change } from 'slate'
import { BlockType } from '../../core/Ae/const'
import insertImage from '../../core/Ae/changes/insertImage'
import { upload } from './upload'

import './styles.less'

function isHasBlock(value: Value, blockType: string) {
    return value.blocks.some(node => node.type === blockType)
}

export interface IProps {
    value: Value
    onSync(value: Value): void
    onChange(change: Change): void
    renderContent(options: IAppState): React.ReactNode
}

export interface IAppState {
    fullSelectionInfo: boolean,
    showRendered: boolean,
}

export default class App extends React.Component<IProps, IAppState> {
    state = {
        fullSelectionInfo: false,
        showRendered: false,
    }

    onChangeFullSelectioInfo = (fullSelectionInfo: boolean) => this.setState({
        fullSelectionInfo,
    })

    onChangeShowRendered = (showRendered: boolean) => this.setState({
        showRendered,
    })

    render() {
        return (
            <div className={'app'}>
                <header className={'header'}>
                    <Toolbar
                        value={this.props.value}
                        onChange={this.props.onChange}
                        left={[
                            {
                                id: 'image',
                                component: (
                                    <Upload
                                        accept={'.jpg,.png'}
                                        showUploadList={false}
                                        customRequest={async options => {
                                            const file: File = (options as any).file
                                            const onSuccess: any = (options as any).onSuccess
                                            const res = await upload(file)

                                            onSuccess(res)
                                        }}
                                        action={'/upload'}
                                        onChange={(info) => {
                                            if (info.file.status !== 'uploading') {

                                            }
                                            if (info.file.status === 'done') {
                                                message.success(`${info.file.name} file uploaded successfully`)

                                                const filepath = info.file.response.filepath
                                                const change = this.props.value.change()

                                                return this.props.onChange(
                                                    insertImage(change, filepath, undefined)
                                                )
                                            } else if (info.file.status === 'error') {
                                                message.error(`${info.file.name} file upload failed.`)
                                            }
                                        }}
                                    >
                                        <Button
                                            icon={'picture'}
                                            ghost
                                        />
                                    </Upload>
                                )
                            },
                            {
                                id: 'heading1',
                                name: 'H1',
                                action: (value, event) => {
                                    event.preventDefault()

                                    const change = value.change()
                                    const type = isHasBlock(value, BlockType.header1)
                                        ? BlockType.paragraph
                                        : BlockType.header1

                                    return this.props.onChange(change.setBlocks(type))
                                }
                            }
                        ]}
                        right={[
                            {
                                id: 'export',
                                icon: 'export',
                                action: (value, event) => {
                                    event.preventDefault()

                                    const data = value.toJSON()
                                    console.log(JSON.stringify(data, undefined, 4))
                                },
                            },
                            {
                                id: 'sync',
                                icon: 'sync',
                                action: (value, event) => {
                                    event.preventDefault()
                                    this.props.onSync(value)
                                },
                            },
                        ]}
                    />
                </header>

                <div className={className('body', {
                    expanded: this.state.fullSelectionInfo,
                })}>
                    <aside className={'side'}>
                        <SelectionInfo
                            value={this.props.value}
                            onChange={this.props.onChange}
                            showFull={this.state.fullSelectionInfo}
                            showRendered={this.state.showRendered}
                            onChangeShowFull={this.onChangeFullSelectioInfo}
                            onChangeShowRendered={this.onChangeShowRendered}
                        />
                    </aside>

                    <div className={'wrapper'}>
                        <main className={'main'}>
                            {this.props.renderContent(this.state)}
                        </main>
                    </div>
                </div>
            </div>
        )
    }
}
