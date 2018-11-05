import getVideoId from 'get-video-id'
import { Change } from 'slate'
import createVideo from '../utils/createVideo'
import { insertOrReplaceBlock } from '../lib/change';

export enum VideoService {
    youtube = 'youtube',
    vimeo = 'vimeo',
}

export default function insertVideo(change: Change, url: string): Change {
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

        default: {
            return null
        }
    }

    return insertOrReplaceBlock(change, createVideo({
        src,
        url,
        caption: '',
    }))
}
