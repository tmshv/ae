import React from 'react'
import { Value, ValueJSON } from 'slate'
import Aeditor from '../src/components/Aeditor'
import { slateSample } from '../src/sample'
// import Plain from 'slate-plain-serializer'

interface IState {
    value: Value,
}

export default class Index extends React.Component<object, IState> {
    constructor(props) {
        super(props)

        this.state = {
            value: undefined,
        }
    }

    onChange = ({ value }) => {
        this.setState({
            value
        })
    }

    componentDidMount() {
        const json = slateSample() as ValueJSON
        const value = Value.fromJSON(json)

        this.setState({
            value,
        })

        document.execCommand('enableObjectResizing', false, 'false')
        document.execCommand('enableInlineTableEditing', false, 'false')
    }

    render() {
        if (!this.state.value) {
            return null
        }

        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <div
                    style={{
                        width: '80%',
                        marginTop: '40px',
                    }}
                >
                    <Aeditor
                        value={this.state.value}
                        onChange={this.onChange}
                    />
                </div>
            </div>
        )
    }
}

// Index.getInitialProps = async () => {
//     const json = slateSample()

//     return {
//         json,
//     }
// }
