import {Data} from "@/utils/data";
import {picoid} from "@/utils/picoid";

async function fetchJson<T>(input: RequestInfo | URL, init?: RequestInit): Promise<Data<T>> {
    const reqId = `${input} - ${picoid('xxxx')}`;
    console.time(reqId);
    try {
        const response = await fetch(input, init);
        if (!response.ok) return {
            state: 'failure',
            statusCode: response.status,
            status: response.statusText
        }

        const json = await response.json();
        return {
            state: 'success',
            data: json
        }
    } catch (err: unknown) {
        return {
            state: 'failure',
            statusCode: -1,
            status: (err as any).toString()
        }
    } finally {
        console.timeEnd(reqId);
    }
}

async function get<T>(input: RequestInfo | URL, init?: RequestInit): Promise<Data<T>> {
    return fetchJson<T>(input, {...init, method: 'GET' } )
}

async function post<T>(input: RequestInfo | URL, init?: RequestInit): Promise<Data<T>> {
    return fetchJson<T>(input, {...init, method: 'GET' } )
}

export default { get, post };