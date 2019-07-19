import * as React from 'react'

export interface BlockProps {
    // node: slate.Node,
    node: any,
    attributes: object,
    isSelected: boolean,
    children: React.ReactNode,

    editor: any
}
