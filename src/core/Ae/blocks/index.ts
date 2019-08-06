import * as React from 'react'

export interface BlockProps {
    className?: string
    // node: slate.Node,
    node: any
    attributes: object
    isSelected: boolean
    children: React.ReactNode

    editor: any
}
