export enum BlockType {
    paragraph = 'paragraph',
    header1 = 'header_1',
    image = 'image',
    file = 'file',
    blockquote = 'blockquote',
    accent = 'accent',
    orderedList = 'orderedList',
    unorderedList = 'unorderedList',
    listItem = 'listItem',
    table = 'table',
    tableRow = 'tableRow',
    tableCell = 'tableCell',
    video = 'video',
    figure = 'figure',
    caption = 'caption',
    division = 'division',
    urlCard = 'urlCard',
}

export enum MarkType {
    bold = 'bold',
    italic = 'italic',
    strikethrough = 'strikethrough',
    underline = 'underline',
    code = 'code',
    highlight = 'highlight',
}

export enum ImageLayout {
    square = 'square',
    portrait = 'portrait',
    landscape = 'landscape',
}

export enum ImageCorner {
    rect = 'rect',
    round = 'round',
    circle = 'circle',
}

export enum ContentAlign {
    left = 'left',
    right = 'right',
    center = 'center',
}

export enum DivisionLayout {
    default = 'default',
    big = 'big',
    full = 'full',
}

export interface IUrlCardData {
    url: string,
    imageSrc: string,
    title: string,
    description: string,
}