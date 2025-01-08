interface HttpApiProps {
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: Record<string, unknown>;
}

export const HttpApi = async ({
  path,
  method,
  headers = {},
  body,
}: HttpApiProps) => {
  const options: RequestInit = {
    method,
    headers,
  };

  if (method !== "GET" && body) {
    options.body = JSON.stringify(body);
  }
  const response = await fetch(path, options);

  return response.json();
};
