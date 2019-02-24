import { ReactNode } from 'react'
import { Block } from 'slate'

export interface BlockProps {
    block: Block,
    children: ReactNode,
    // attributes: any,
}