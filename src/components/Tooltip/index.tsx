import * as React from 'react'
import * as ReactDom from 'react-dom'

export interface ITooltipProps {
    editor: any
}

export default class Tooltip extends React.Component<ITooltipProps> {
    // getRoot() {
    //     // let root = document.getElementById('over')
    //     let root = document.querySelector('#over')

    //     // if (!root) {
    //     //     root = document.createElement('div')
    //     //     root.id = 'over'
    //     //     document.body.appendChild(root)
    //     // }

    //     return root
    // }

    render() {
        // const { className, innerRef } = this.props

        // const root = this.getRoot()

        // console.log('tooltip2')
        // console.log(root)
        // console.log(document)

        return (
            <div>
                {this.props.children}
            </div>
        )

        // return ReactDom.createPortal(
        //     <div
        //     // className={this.props.className}
        //     // innerRef={innerRef}
        //     >
        //         {this.props.children}
        //         {/* {this.renderMarkButton('bold', 'format_bold')}
        //         {this.renderMarkButton('italic', 'format_italic')}
        //         {this.renderMarkButton('underlined', 'format_underlined')}
        //         {this.renderMarkButton('code', 'code')} */}
        //     </div>,
        //     root
        // )
    }

    /**
     * Render a mark-toggling toolbar button.
     *
     * @param {String} type
     * @param {String} icon
     * @return {Element}
     */

    renderMarkButton(type, icon) {
        const { editor } = this.props
        const { value } = editor
        const isActive = value.activeMarks.some(mark => mark.type == type)
        return (
            <button
                // reversed
                // active={isActive}
                onMouseDown={event => this.onClickMark(event, type)}
            >
                {icon}
                {/* <Icon>{icon}</Icon> */}
            </button>
        )
    }

    /**
     * When a mark button is clicked, toggle the current mark.
     *
     * @param {Event} event
     * @param {String} type
     */

    onClickMark(event, type) {
        const { editor } = this.props
        event.preventDefault()
        editor.change(change => change.toggleMark(type))
    }
}