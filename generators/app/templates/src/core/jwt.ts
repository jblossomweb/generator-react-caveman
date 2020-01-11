import sjcl from 'sjcl';
import uuid from 'uuid';

export const parseToken = (token: string) => {
  const base64Url = token.split('.')[1];
  const base64 = (
    base64Url
      .replace(/-/g, '+')
      .replace(/_/g, '/')
  );
  const json = decodeURIComponent(
    atob(base64)
      .split('')
      .map(
        (c: string) => '%' + (
          '00' + c
            .charCodeAt(0)
            .toString(16)
          )
          .slice(-2)
      )
      .join('')
  );
  return JSON.parse(json);
};

export const randomUUID = uuid.v4;

export const hashifyUUID = (uuid: string) => (
  sjcl
    .codec
    .hex
    .fromBits(sjcl
      .hash
      .sha256
      .hash(uuid)
    )
);
