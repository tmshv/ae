import className from 'classnames'
import * as React from 'react'
import { Upload, Button, message } from 'antd'
import Toolbar from '../Toolbar'
import SelectionInfo from '../SelectionInfo'
import { Value, Change } from 'slate'
import { BlockType, IUrlCardData } from '../../core/Ae/const'
import insertImage from '../../core/Ae/changes/insertImage'
import insertDivision from '../../core/Ae/changes/insertDivision'
import { IFile } from '../../core/Ae/utils/createFile'
import insertFile from '../../core/Ae/changes/insertFile'
import listPlugin from '../../core/Ae/plugins/list'
import blockquotePlugin from '../../core/Ae/plugins/blockquote'
import tablePlugin from '../../core/Ae/plugins/table'
import insertUrlCard from '../../core/Ae/changes/insertUrlCard'
import { upload } from './upload'

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
                                id: 'upload-file',
                                icon: 'file',
                                action: (value, event) => {
                                    const change = value.change()
                                    const file: IFile = {
                                        srcPreview: 'https://art.shlisselburg.org/data/images/ae64123551407d5c325f75d83f58a338-medium.jpg',
                                        srcFile: '',
                                        name: 'Some PDF file',
                                        size: 5000000,
                                        mimeType: 'application/pdf',
                                    }

                                    return this.props.onChange(
                                        insertFile(change, file, undefined)
                                    )
                                }
                            },
                            {
                                id: 'heading1',
                                // name: 'H1',
                                icon: 'fire',
                                action: (value, event) => {
                                    event.preventDefault()

                                    const change = value.change()
                                    const type = isHasBlock(value, BlockType.header1)
                                        ? BlockType.paragraph
                                        : BlockType.header1

                                    return this.props.onChange(change.setBlocks(type))
                                }
                            },
                            {
                                id: 'division',
                                icon: 'layout',
                                action: (value, event) => {
                                    event.preventDefault()
                                    const change = value.change()

                                    return this.props.onChange(insertDivision(change, 2, null))
                                }
                            },
                            {
                                id: 'accent',
                                icon: 'thunderbolt',
                                action: (value, event) => {
                                    event.preventDefault()
                                    const change = value.change()

                                    const type = isHasBlock(value, BlockType.accent)
                                        ? BlockType.paragraph
                                        : BlockType.accent

                                    return this.props.onChange(
                                        change.setBlocks(type)
                                    )
                                }
                            },
                            {
                                id: 'blockquote',
                                icon: 'sound',
                                action: (value, event) => {
                                    event.preventDefault()
                                    const change = value.change()

                                    return blockquotePlugin.utils.isSelectionInBlockquote(value)
                                        ? this.props.onChange(blockquotePlugin.changes.unwrapBlockquote(change))
                                        : this.props.onChange(blockquotePlugin.changes.wrapInBlockquote(change))
                                }
                            },
                            // {
                            //     id: 'unordered-list',
                            //     icon: 'unordered-list',
                            //     action: (value, event) => {
                            //         event.preventDefault()

                            //         const type = BlockType.unorderedList
                            //         const change = value.change()

                            //         const inList = listPlugin.utils.isSelectionInList(value)

                            //         // const isTargetType = listPlugin.utils.getCurrentList(value).type === type
                            //         // const isActive = listPlugin.utils.isSelectionInList(value) && isTargetType
                            //         // return isActive
                            //         return inList
                            //             ? this.props.onChange(listPlugin.changes.unwrapList(change))
                            //             : this.props.onChange(listPlugin.changes.wrapInList(change, type))
                            //     }
                            // },
                            {
                                id: 'table',
                                icon: 'table',
                                action: (value, event) => {
                                    event.preventDefault()

                                    const change = value.change()
                                    const isActive = tablePlugin.utils.isSelectionInTable(value)

                                    return isActive
                                        ? this.props.onChange(tablePlugin.changes.removeTable(change))
                                        : this.props.onChange(tablePlugin.changes.insertTable(change, 3))
                                }
                            },
                            {
                                id: 'url-card',
                                icon: 'idcard',
                                action: (value, event) => {
                                    const change = value.change()
                                    const data: IUrlCardData = {
                                        url: 'https://varlamov.ru/3160798.html',
                                        title: '20 лучших архитектурных объектов 2018 года',
                                        description: 'D',
                                        imageSrc: 'https://l-files.livejournal.net/og_image/10761149/12346?v=1541254574',
                                    }

                                    return this.props.onChange(
                                        insertUrlCard(change, data, undefined)
                                    )
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
