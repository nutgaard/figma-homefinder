type Success<T> = {
    state: 'success';
    data: T;
}
type Failure = {
    state: 'failure';
    statusCode: number;
    status: string;
}

export type Data<T> = Success<T> | Failure;

export function isSuccess<T>(data: Data<T>): data is Success<T> {
    return data.state === 'success';
}