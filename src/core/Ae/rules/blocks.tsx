import className from 'classnames'
import { Block } from 'slate'
import Division from '../../../components/Division'
import Aspect from '../../../components/Aspect'
import Paragraph from '../../../blocks/Paragraph'
import { getRatio } from '../blocks/Image'

export function serializeHeader(obj: Block, children) {
    return (
        <h1
            className={className('ae-block-header', 'text')}
        >
            {children}
        </h1>
    )
}

export function serializeParagraph(obj: Block, children) {
    return (
        <Paragraph
            block={obj}
        >
            {children}
        </Paragraph>
    )
}

export function serializeFigure(obj: Block, children) {
    return (
        <figure
            className={'ae-block-figure'}
        >
            {children}
        </figure>
    )
}

export function serializeCaption(obj: Block, children) {
    return (
        <figcaption
            className={'ae-block-caption'}
        >
            {children}
        </figcaption>
    )
}

export function serializeBlockquote(obj: Block, children) {
    return (
        <blockquote
            className={'ae-block-blockquote'}
        >
            {children}
        </blockquote>
    )
}

export function serializeVideo(obj: Block, children) {
    const src = obj.data.get('src')

    return (
        <div
            className={'ae-block-video'}
        >
            <figure
                className='wrapper'
            >
                <iframe
                    title='video-embed'
                    src={src}
                    frameBorder='0'
                    allowFullScreen
                />
            </figure>
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
    const corner: string = obj.data.get('corner')
    const src: string = obj.data.get('src')
    const caption: string = obj.data.get('caption')
    const layout: string = obj.data.get('layout')
    const ratio: number = obj.data.get('ratio')

    const aspectRatio = getRatio(layout, ratio)

    const cornerClass = `corner-${corner}`

    return (
        <div
            className={className('ae-block-image', cornerClass)}
        >
            <Aspect
                ratio={aspectRatio}
            >
                <img
                    src={src}
                    alt={caption}
                />
            </Aspect>
        </div>
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
