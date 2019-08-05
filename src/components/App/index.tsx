import className from 'classnames'
import * as React from 'react'
import Toolbar from '../Toolbar'
import SelectionInfo from '../SelectionInfo'
import { Value, Change } from 'slate'

import './styles.less'

export interface IProps {
    value: Value
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
