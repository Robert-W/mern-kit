/**
* @type Header
* @description Header object for the request
* @param {String} name - name of the header
* @param {String} value - value of the header
*/

/**
* @name post
* @description Wrapper around the post object
* @param {Object} options - options for the request
* @param {String} options.url - url for the request
* @param {String} options.type - type of the request
* @param {Object} options.params - JSON for the post params
* @param {Array<Header>} options.headers - Array of headers for the request

* @return {Promise}
*/
export default function ({ url, type, params, headers }) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open(type, url, true);
    //- Add optional headers if any
    if (headers) {
      headers.forEach(({ name, value }) => request.setRequestHeader(name, value));
    }
    //- Format params
    const parameters = Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
    //- Add some handlers
    request.onload = () => {
      const handler = request.status === 200 ? resolve : reject;
      // Safely parse JSON
      try {
        const response = JSON.parse(request.responseText);
        handler(response);
      } catch (err) {
        reject(new Error('Invalid response'));
      }
    };
    request.onerror = reject;
    request.send(parameters);
  });
}
