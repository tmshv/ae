import { Node } from 'slate'
import { BlockType } from '../const'
import * as s from './blocks'

export function rules() {
    return [
        {
            serialize(obj: Node, children) {
                if (obj.object == 'block') {
                    switch (obj.type) {
                        case BlockType.header1: {
                            return s.serializeHeader(obj, children)
                        }

                        case BlockType.paragraph: {
                            return s.serializeParagraph(obj, children)
                        }

                        case BlockType.image: {
                            return s.serializeImage(obj, children)
                        }

                        case BlockType.figure: {
                            return s.serializeFigure(obj, children)
                        }

                        case BlockType.caption: {
                            return s.serializeCaption(obj, children)
                        }

                        case BlockType.blockquote: {
                            return s.serializeBlockquote(obj, children)
                        }

                        case BlockType.video: {
                            return s.serializeVideo(obj, children)
                        }

                        case BlockType.division: {
                            return s.serializeDivision(obj, children)
                        }

                        case BlockType.accent: {
                            return s.serializeAccent(obj, children)
                        }
                    }
                }
            }
        }
    ]
}