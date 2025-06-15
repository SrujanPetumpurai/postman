export async function sendRequest(
  method: string,
  url: string,
  body?: any,
  customHeaders?: Record<string, string>
) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...customHeaders,
  };

  const options: RequestInit = {
    method,
    headers,
  };

  if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    options.body = JSON.stringify(body);
  }

  try {
    const res = await fetch(url, options);
    const contentType = res.headers.get('Content-Type');
    const data =
      contentType && contentType.includes('application/json')
        ? await res.json()
        : await res.text();

    return {
      status: res.status,
      headers: Object.fromEntries(res.headers.entries()),
      body: data,
    };
  } catch (err) {
    return {
      status: null,
      headers: {},
      body: `Error ${err}`,
    };
  }
}
