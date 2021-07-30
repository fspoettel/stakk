export type JsonObject = {[Key in string]?: JsonValue};
export type JsonArray = Array<JsonValue>
export type JsonValue = string | number | boolean | null | JsonObject | JsonArray;

export async function makeRequest<T>(
  path: string,
  body: JsonObject
): Promise<T> {
  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

  const res = await fetch(`${baseUrl}${path}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(body),
  });

  const resBody = await res.json();

  if (res.status === 200) {
    const item = resBody;
    return item as unknown as T;
  }

  throw new Error(
    typeof body?.error === 'string'
      ? body.error
      : 'Internal Server Error'
    );
}
