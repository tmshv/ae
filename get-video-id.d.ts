declare module 'get-video-id' {
    interface IVideoMeta {
        id: string
        service: string
    }

    export default function getVideoId(url: string): IVideoMeta
}