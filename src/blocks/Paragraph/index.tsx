import { BlockProps } from '..'
import className from 'classnames'

export default function Paragraph(props: BlockProps) {
    return (
        <p
            className={className('ae-block-paragraph', 'text', 'd111')}
        >
            {props.children}
        </p>
    )
}