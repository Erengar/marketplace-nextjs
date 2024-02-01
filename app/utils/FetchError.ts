//This might not be needed, but its just in case we will down the road need status code to be passed to the error handler
export default class FetchError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}
