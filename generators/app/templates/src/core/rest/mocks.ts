import * as Types from './types';

export const mockUrl: string = 'https://api.nowhere.noplace';

export type MockResponseType = 'array' | 'object';

export const mockResponses = {
  array: [],
  object: {},
};

export const mockErrorResponse: Error = {
  name: 'Error',
  message: 'Mock Error Response.',
};

export const mockRest = (
  responseType: MockResponseType = 'object',
) => ({
  get: (
    url: Types.GetInterface['url'],
  ): Promise<any> => Promise.resolve({
    data: mockResponses[responseType],
  }),
  post: (
    url: Types.PostInterface['url'],
    data: Types.PostInterface['data'],
  ): Promise<any> => Promise.resolve({
    data: mockResponses[responseType],
  }),
  put: (
    url: Types.PutInterface['url'],
    data: Types.PutInterface['data'],
  ): Promise<any> => Promise.resolve({
    data: mockResponses[responseType],
  }),
  patch: (
    url: Types.PatchInterface['url'],
    data: Types.PutInterface['data'],
  ): Promise<any> => Promise.resolve({
    data: mockResponses[responseType],
  }),
  delete: (
    url: Types.DeleteInterface['url'],
  ): Promise<any> => Promise.resolve({
    data: mockResponses[responseType],
  }),
});

export const mockReject = (...args: any[]): Promise<any> =>
  Promise.reject(mockErrorResponse);

export const mockRestError = () => ({
  get: mockReject,
  post: mockReject,
  put: mockReject,
  patch: mockReject,
  delete: mockReject,
});
