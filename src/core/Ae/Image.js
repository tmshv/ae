import { Editor, getEventRange, getEventTransfer } from 'slate-react'
import { Block, Value } from 'slate'
import { LAST_CHILD_TYPE_INVALID } from 'slate-schema-violations'

import React from 'react'
import initialValue from './value.json'
import imageExtensions from 'image-extensions'
import isUrl from 'is-url'

/*
 * A function to determine whether a URL has an image extension.
 *
 * @param {String} url
 * @return {Boolean}
 */

function isImage(url) {
  return !!imageExtensions.find(url.endsWith)
}

/**
 * A change function to standardize inserting images.
 *
 * @param {Change} change
 * @param {String} src
 * @param {Range} target
 */

function insertImage(change, src, target) {
  if (target) {
    change.select(target)
  }

  change.insertBlock({
    type: 'image',
    isVoid: true,
    data: { src },
  })
}

/**
 * A schema to enforce that there's always a paragraph as the last block.
 *
 * @type {Object}
 */

const schema = {
  document: {
    last: { types: ['paragraph'] },
    normalize: (change, reason, { node, child }) => {
      switch (reason) {
        case LAST_CHILD_TYPE_INVALID: {
          const paragraph = Block.create('paragraph')
          return change.insertNodeByKey(node.key, node.nodes.size, paragraph)
        }
      }
    },
  },
}

/**
 * The images example.
 *
 * @type {Component}
 */

export default class Image extends React.Component {
  // /**
  //  * Deserialize the raw initial value.
  //  *
  //  * @type {Object}
  //  */

  // state = {
  //   value: Value.fromJSON(initialValue),
  // }



  // renderEditor = () => {
  //   return (
  //     <div className="editor">
  //       <Editor
  //         placeholder="Enter some text..."
  //         value={this.state.value}
  //         schema={schema}
  //         onChange={this.onChange}
  //         onDrop={this.onDropOrPaste}
  //         onPaste={this.onDropOrPaste}
  //         renderNode={this.renderNode}
  //       />
  //     </div>
  //   )
  // }

  /**
   * Render a Slate node.
   *
   * @param {Object} props
   * @return {Element}
   */

  renderNode = props => {
    const { attributes, node, isSelected } = props

    switch (node.type) {
      case 'image': {
        const src = node.data.get('src')
        const className = isSelected ? 'active' : null
        const style = { display: 'block' }
        return (
          <img src={src} className={className} style={style} {...attributes} />
        )
      }
    }
  }

  /**
   * On change.
   *
   * @param {Change} change
   */

  onChange = ({ value }) => {
    this.setState({ value })
  }

  /**
   * On clicking the image button, prompt for an image and insert it.
   *
   * @param {Event} event
   */

  onClickImage = event => {
    event.preventDefault()
    const src = window.prompt('Enter the URL of the image:')
    if (!src) return

    const change = this.state.value.change().call(insertImage, src)

    this.onChange(change)
  }

  /**
   * On drop, insert the image wherever it is dropped.
   *
   * @param {Event} event
   * @param {Change} change
   * @param {Editor} editor
   */

  onDropOrPaste = (event, change, editor) => {
    const target = getEventRange(event, change.value)
    if (!target && event.type == 'drop') return

    const transfer = getEventTransfer(event)
    const { type, text, files } = transfer

    if (type == 'files') {
      for (const file of files) {
        const reader = new FileReader()
        const [mime] = file.type.split('/')
        if (mime != 'image') continue

        reader.addEventListener('load', () => {
          editor.change(c => {
            c.call(insertImage, reader.result, target)
          })
        })

        reader.readAsDataURL(file)
      }
    }

    if (type == 'text') {
      if (!isUrl(text)) return
      if (!isImage(text)) return
      change.call(insertImage, text, target)
    }
  }
}
