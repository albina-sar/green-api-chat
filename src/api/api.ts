import { API_TOKEN, API_URL, ID_INSTANCE } from "./config";

export async function sendMessage(chatId: string, text: string) {
  const response = await fetch(
    `${API_URL}/waInstance${ID_INSTANCE}/sendMessage/${API_TOKEN}`,
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

export async function receiveNotification() {
  const response = await fetch(
    `${API_URL}/waInstance${ID_INSTANCE}/receiveNotification/${API_TOKEN}`,
    {
      method: "GET",
    },
  );
  if (!response.ok) {
    throw new Error(`Error ${response.status}`);
  }
  const result = await response.json();
  return result;
}

export async function deleteNotification(receiptId: number) {
  const response = await fetch(
    `${API_URL}/waInstance${ID_INSTANCE}/deleteNotification/${API_TOKEN}/${receiptId}`,
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
