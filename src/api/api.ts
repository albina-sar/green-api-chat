import { API_URL } from "./config";

export async function sendMessage(
  id: string,
  token: string,
  chatId: string,
  text: string,
) {
  const response = await fetch(
    `${API_URL}/waInstance${id}/sendMessage/${token}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatId,
        message: text,
      }),
    },
  );
  if (!response.ok) {
    throw new Error(`Error ${response.status}`);
  }
  const result = await response.json();
  return result;
}

export async function receiveNotification(id: string, token: string) {
  const response = await fetch(
    `${API_URL}/waInstance${id}/receiveNotification/${token}`,
    { method: "GET" },
  );

  if (response.status === 408) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Error ${response.status}`);
  }

  const result = await response.json();
  return result;
}

export async function deleteNotification(
  receiptId: number,
  id: string,
  token: string,
) {
  const response = await fetch(
    `${API_URL}/waInstance${id}/deleteNotification/${token}/${receiptId}`,
    {
      method: "DELETE",
    },
  );
  if (!response.ok) {
    throw new Error(`Error ${response.status}`);
  }
  const result = await response.json();
  return result;
}
