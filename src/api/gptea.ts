import axios from "axios";

import { GPTEA_ACCESS_TOKEN } from "../utils/util";
import { IMessage, IScrap } from "../utils/interfaces";

/* GET */
/* thunk함수는 thunk에서 toastFailToRequest 호출 */
export const getChats = async () => {
  const {
    data: { chats },
  } = await axios("/me/chats", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem(GPTEA_ACCESS_TOKEN)}`,
    },
  });

  return chats;
}; //thunk

export const getChat = async (chatId: string | undefined) => {
  const { data } = await axios(`/me/chats/${chatId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem(GPTEA_ACCESS_TOKEN)}`,
    },
  });

  return data;
};

export const getMessages = async (chatId: string | undefined) => {
  const {
    data: { messages },
  } = await axios(`/me/chats/${chatId}/messages`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem(GPTEA_ACCESS_TOKEN)}`,
    },
  });

  const newMessages = messages.map((message: IMessage) => {
    const newMessage = Object.assign({}, message);
    newMessage.chatId = newMessage.chatID;
    delete newMessage.chatID;
    return newMessage;
  });

  return newMessages;
}; //thunk

export const getScrapbooks = async () => {
  const {
    data: { scrapbooks },
  } = await axios("/me/scrapbooks", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem(GPTEA_ACCESS_TOKEN)}`,
    },
  });

  return scrapbooks;
}; //thunk

export const getScrapbook = async (scrapbookId: string | undefined) => {
  const { data } = await axios(`/me/scrapbooks/${scrapbookId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem(GPTEA_ACCESS_TOKEN)}`,
    },
  });

  return data;
};

export const getScrapsInScrapbook = async (scrapbookId: string | undefined) => {
  const {
    data: { scraps },
  } = await axios(`/me/scrapbooks/${scrapbookId}/scraps`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem(GPTEA_ACCESS_TOKEN)}`,
    },
  });

  const newScraps = scraps.map((scrap: IScrap) => {
    const newScrap = JSON.parse(JSON.stringify(scrap));
    newScrap.message.chatId = newScrap.message.chatID;
    delete newScrap.message.chatID;
    return newScrap;
  });

  return newScraps;
};

export const getScrapParents = async (scrapId: string | undefined) => {
  const {
    data: { scrapbooks },
  } = await axios(`/me/scraps/${scrapId}/scrapbooks`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem(GPTEA_ACCESS_TOKEN)}`,
    },
  });

  return scrapbooks;
};

/* POST */
export const createChat = async (data: { name: string }) => {
  await axios("/me/chats", {
    method: "POST",
    headers: { Authorization: `Bearer ${localStorage.getItem(GPTEA_ACCESS_TOKEN)}` },
    data,
  });
};

export const sendMessage = async (chatId: string | undefined, data: { content: string }) => {
  await axios(`/me/chats/${chatId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem(GPTEA_ACCESS_TOKEN)}`,
    },
    data,
  });
};

export const createScrapbook = async (data: { name: string }) => {
  await axios("/me/scrapbooks", {
    method: "POST",
    headers: { Authorization: `Bearer ${localStorage.getItem(GPTEA_ACCESS_TOKEN)}` },
    data,
  });
};

export const createScrap = async (data: {
  chatID: string | undefined;
  memo: string;
  seq: number | undefined;
  scrapbookIDs: string[];
}) => {
  await axios(`/me/scraps`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem(GPTEA_ACCESS_TOKEN)}`,
      "Content-Type": "application/json",
    },
    data,
  });
};

export const addSingleScrap = async (scrapId: string | undefined, scrapbookId: string) => {
  await axios(`/me/scraps/${scrapId}/scrapbooks/${scrapbookId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem(GPTEA_ACCESS_TOKEN)}`,
    },
  });
};

/* PATCH */
export const modifyChat = async (chatId: string, data: { name: string }) => {
  await axios(`/me/chats/${chatId}`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${localStorage.getItem(GPTEA_ACCESS_TOKEN)}` },
    data,
  });
};

export const modifyScrapbook = async (scrapbookId: string, data: { name: string }) => {
  await axios(`/me/scrapbooks/${scrapbookId}`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${localStorage.getItem(GPTEA_ACCESS_TOKEN)}` },
    data,
  });
};

/* DELETE */
export const deleteChat = async (chatId: string) => {
  await axios(`/me/chats/${chatId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${localStorage.getItem(GPTEA_ACCESS_TOKEN)}` },
  });
};

export const deleteScrapbook = async (scrapbookId: string) => {
  await axios(`/me/scrapbooks/${scrapbookId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem(GPTEA_ACCESS_TOKEN)}`,
    },
  });
};

export const deleteSingleScrap = async (scrapId: string | undefined, scrapbookId: string) => {
  await axios(`/me/scraps/${scrapId}/scrapbooks/${scrapbookId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem(GPTEA_ACCESS_TOKEN)}`,
    },
  });
};

export const deleteAllScrap = async (scrapId: string | undefined) => {
  axios(`/me/scraps/${scrapId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem(GPTEA_ACCESS_TOKEN)}`,
    },
  });
};
