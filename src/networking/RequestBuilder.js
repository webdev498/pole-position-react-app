const EncodeHashComponent = component => {
  let params = {};

  for (let key in component) {
    if (Array.isArray(component[key])) {
      const items = EncodeHashComponent(component[key]);

      for (let subkey in items) {
        params[key + '[]'] = items[subkey];
      }
    } else if (typeof component[key] == 'object') {
      const items = EncodeHashComponent(component[key]);
      for (let subkey in items){
        params[key + '[' + subkey + ']'] = items[subkey];
      }
    } else {
      if (component[key]!== undefined) {
        params[key] = component[key];
      }
    }
  }

  return params;
};

export const ConvertQueryHashToString = (query = {}) => {
  const items = EncodeHashComponent(query);
  const keys = Object.keys(items);

  const params = keys.map(
    key => encodeURIComponent(key) + '=' + encodeURIComponent(items[key])
  );
  return params.join('&');
};

const checkForJSON = response => {
  const contentType = response.headers.get('content-type');
  return contentType && contentType.indexOf('application/json') !== -1;
};

export const BuildJsonRequest = ({
  url = '',
  params = {},
  body = null,
  method = 'GET',
  authToken = ''
}) => {
  let request_url = url;
  if (params !== {}) {
    request_url = request_url + '?' + ConvertQueryHashToString(params);
  }
  var request = {
    method: method,
    headers: {
      Authorization: authToken ? 'Token: ' + authToken : '',
      'Content-Type': 'application/json'
    },
    body: body == null ? null : JSON.stringify(body)
  };
  return fetch(request_url, request).then(response => {
    if (!response.ok) {
      throw response;
    }
    if (checkForJSON(response)) {
      return response.json();
    }
  });
};

export const BuildFormRequest = ({
  url = '',
  params = {},
  body = null,
  method = 'GET',
  authToken = ''
}) => {
  var request_url = url;
  if (params !== {}) {
    request_url = request_url + '?' + ConvertQueryHashToString(params);
  }
  var request = {
    method: method,
    headers: {
      Authorization: authToken ? 'Token: ' + authToken : ''
    },
    body: body
  };
  // console.log('Request data: ', finalUrl, request);
  return fetch(request_url, request).then(response => {
    // console.log('Response: ', response);
    if (!response.ok) {
      throw response;
    }
    if (checkForJSON(response)) {
      return response.json();
    }
  });
};
