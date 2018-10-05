import React from 'react'
import { Value, ValueJSON } from 'slate'
import Aeditor from '../src/components/Aeditor'
import { slateSample } from '../src/sample'
// import Plain from 'slate-plain-serializer'

export default class Index extends React.Component<object, object> {
    constructor(props) {
        super(props)

        this.state = {
            initialValue: undefined,
        }
    }

    componentDidMount() {
        const json = slateSample() as ValueJSON
        const initialValue = Value.fromJSON(json)

        this.setState({
            initialValue,
        })

        document.execCommand('enableObjectResizing', false, 'false')
        document.execCommand('enableInlineTableEditing', false, 'false')
    }

    render() {
        if (!this.state.initialValue) {
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
                    <Aeditor value={this.state.initialValue} />
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
