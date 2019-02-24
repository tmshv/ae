import className from 'classnames'
import * as React from 'react'
import Toolbar from '../Toolbar'
import SelectionInfo from '../SelectionInfo'
import { Value, Change } from 'slate'

import './styles.less'

interface IProps {
    value: Value
    onChange(change: Change): void
}

interface IState {
    fullSelectionInfo: boolean,
}

export default class App extends React.Component<IProps, IState> {
    state = {
        fullSelectionInfo: true,
    }

    onFullSelectioInfoChange = (fullSelectionInfo: boolean) => {
        // event.preventDefault()
        // event.stopPropagation()

        this.setState({
            fullSelectionInfo,
        })
    }

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
                            onShowFullChange={this.onFullSelectioInfoChange}
                        />
                    </aside>

                    <div className={'wrapper'}>
                        <main className={'main'}>
                            {this.props.children}
                        </main>
                    </div>
                </div>
            </div>
        )
    }
}
