import { RequestOptions } from "./RequestOptions";

export interface HttpClient {
    get<T>(
        url: string,
        body?: unknown,
        options?: RequestOptions
    ) : Promise<T>;

    post<T>(
        url: string,
        body?: unknown,
        options?: RequestOptions
    ) : Promise<T>;

    put<T>(
        url: string,
        body?: unknown,
        options?: RequestOptions
    ) : Promise<T>;

    delete<T>(
        url: string,
        body?: unknown,
        options?: RequestOptions
    ) : Promise<T>;
}