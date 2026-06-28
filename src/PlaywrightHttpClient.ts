import {
  APIRequestContext,
  APIResponse
} from "@playwright/test";

import { HttpClient } from "./HttpClient";
import { RequestOptions } from "./RequestOptions";

export class PlaywrightHttpClient implements HttpClient {
  private token?: string;

  constructor(private request: APIRequestContext) {}

  public setToken(token: string): void {
    this.token = token;
  }

  private buildHeaders(
    headers?: Record<string, string>
  ): Record<string, string> {
    return {
      ...headers,
      ...(this.token && {
        Authorization: `Bearer ${this.token}`,
      }),
    };
  }

  async get<T>(
    url: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    const response = await this.request.get(url, {
      data: body,
      headers: this.buildHeaders(options?.headers),
      params: options?.params,
    });

    return this.handleResponse<T>(response);
  }

  async post<T>(
    url: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    const response = await this.request.post(url, {
      data: body,
      headers: this.buildHeaders(options?.headers),
      params: options?.params,
    });

    return this.handleResponse<T>(response);
  }

  async put<T>(
    url: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    const response = await this.request.put(url, {
      data: body,
      headers: this.buildHeaders(options?.headers),
      params: options?.params,
    });

    return this.handleResponse<T>(response);
  }

  async delete<T>(
    url: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    const response = await this.request.delete(url, {
      data: body,
      headers: this.buildHeaders(options?.headers),
      params: options?.params,
    });

    return this.handleResponse<T>(response);
  }

  private async handleResponse<T>(
    response: APIResponse
  ): Promise<T> {
    try {
      return await response.json();
    } catch {
      try {
        const text = await response.text();
        return {
          success: false,
          message: text || `HTTP Error: ${response.status()} - ${response.statusText()}`,
          errors: [text || response.statusText()],
          data: null,
        } as unknown as T;
      } catch (err) {
        return {
          success: false,
          message: `HTTP Error: ${response.status()} - ${response.statusText()}`,
          errors: [response.statusText() || String(err)],
          data: null,
        } as unknown as T;
      }
    }
  }
}