import getVideoId from 'get-video-id'
import { Change } from 'slate'
import { BlockType } from '../const'

export enum VideoService {
    youtube = 'youtube',
    vimeo = 'vimeo',
}

export default function insertVideo(change: Change, url: string): object {
    const video = getVideoId(url)

    if (!video) {
        return null
    }

    let src = ''

    switch (video.service) {
        case VideoService.youtube: {
            src = `https://www.youtube.com/embed/${video.id}`

            break
        }

        case VideoService.vimeo: {
            src = `https://player.vimeo.com/video/${video.id}`

            break
        }
    }

    return change.insertBlock({
        type: BlockType.video,
        data: { src, url },
        isVoid: true,
    })
}
