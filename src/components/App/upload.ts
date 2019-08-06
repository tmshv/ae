export type UploadResponse = {
    filepath: string,
    status: 'ok' | 'failed',
}

export async function upload(file: File): Promise<UploadResponse> {
    const body = new FormData()
    body.append('file', file)

    try {
        const response = await fetch('/upload', { // Your PUT endpoint
            method: 'PUT',
            // headers: {
            //     'Content-Type': 'You will perhaps need to define a content-type here',
            // },
            body, // This is your file object
        })

        return await response.json() // if the response is a JSON object
    } catch (error) {
        console.log(error) // Handle the error response object
    }
}
