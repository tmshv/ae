import className from 'classnames'
import { Block } from 'slate'
import Division from '../../../components/Division'

export function serializeHeader(obj: Block, children) {
    return (
        <h1>
            {children}
        </h1>
    )
}

export function serializeParagraph(obj: Block, children) {
    return (
        <p>{children}</p>
    )
}

export function serializeFigure(obj: Block, children) {
    return (
        <figure>
            {children}
        </figure>
    )
}

export function serializeCaption(obj: Block, children) {
    return (
        <figcaption>
            {children}
        </figcaption>
    )
}

export function serializeBlockquote(obj: Block, children) {
    return (
        <blockquote>
            {children}
        </blockquote>
    )
}

export function serializeVideo(obj: Block, children) {
    return (
        <div>
            video
        </div>
    )
}

export function serializeDivision(obj: Block, children) {
    const layout = obj.data.get('layout')

    return (
        <Division
            className={className('ae-block-division', {
                [layout]: true,
            })}
        >
            {children}
        </Division>
    )
}

export function serializeImage(obj: Block, children) {
    return (
        <img
            src={obj.data.get('src')}
        />
    )
}

export function serializeAccent(obj: Block, children) {
    return (
        <p
            className={className('ae-block-accent', 'text')}
        >
            {children}
        </p>
    )
}
