export enum MimeType {
    pdf = 'application/pdf',
}

export interface IFile {
    srcPreview: string,
    srcFile: string,
    size: number,
    mimeType: MimeType,
}

export function createFile(file: IFile): IFile {
    return file
}
