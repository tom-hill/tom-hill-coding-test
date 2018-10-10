import sha from 'crypto-js/sha3';

export const makeRequestCancelable = (url) => {
  const requestName = sha(url);

  const activeRequest = window[requestName];
  if (activeRequest) activeRequest.abort();

  if ('AbortController' in window) {
    window[requestName] = new window.AbortController();
    return window[requestName].signal;
  }

  return null;
};

export const get = (url, userOptions, isCancellable = true) => {
  let options = { ...userOptions };
  if (isCancellable) options = Object.assign({}, options, { signal: makeRequestCancelable(url) });

  return fetch(url, options).then((response) => {
    const json = response.json();

    if (response.ok) return json;

    throw new Error(`[API Service]: GET - Can't make GET request to ${url.toString()}.\n\n\tRESPONSE: ${JSON.stringify(json)}`);
  });
};
