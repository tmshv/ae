import * as React from 'react'

export default class EditableBlock extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <span>1</span>
                    <span>2</span>
                </div>

                <div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
