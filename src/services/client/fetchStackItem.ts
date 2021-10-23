import { StackItem } from '@stakk/types/StackItem';

type JsonObject = { [Key in string]?: JsonValue };
type JsonArray = Array<JsonValue>;
type JsonValue = string | number | boolean | null | JsonObject | JsonArray;

async function makeRequest(type: string, body: JsonObject): Promise<StackItem> {
  const baseUrl = '/api/v1';

  const res = await fetch(`${baseUrl}/${type}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    mode: 'no-cors',
    body: JSON.stringify(body),
  });

  const resBody = await res.json();

  if (res.status === 200) {
    const item = resBody;
    return item as unknown as StackItem;
  }

  throw new Error(typeof body?.error === 'string' ? body.error : 'Internal Server Error');
}

export default makeRequest;
