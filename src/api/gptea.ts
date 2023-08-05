import { IMessage, IScrap } from "../utils/interfaces";
import { apiWithAuth } from "./axiosApi";

/* GET */
/* thunk함수는 thunk에서 toastFailToRequest 호출 */
export const getChats = async () => {
  const {
    data: { chats },
  } = await apiWithAuth.get("/me/chats");

  return chats;
}; //thunk

export const getChat = async (chatId: string | undefined) => {
  const { data } = await apiWithAuth.get(`/me/chats/${chatId}`);

  return data;
};

export const getMessages = async (chatId: string | undefined) => {
  const {
    data: { messages },
  } = await apiWithAuth.get(`/me/chats/${chatId}/messages`);

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
  } = await apiWithAuth.get("/me/scrapbooks");

  return scrapbooks;
}; //thunk

export const getScrapbook = async (scrapbookId: string | undefined) => {
  const { data } = await apiWithAuth.get(`/me/scrapbooks/${scrapbookId}`);

  return data;
};

export const getScrapsInScrapbook = async (scrapbookId: string | undefined) => {
  const {
    data: { scraps },
  } = await apiWithAuth.get(`/me/scrapbooks/${scrapbookId}/scraps`);

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
  } = await apiWithAuth.get(`/me/scraps/${scrapId}/scrapbooks`);

  return scrapbooks;
};

/* POST */
export const createChat = async (data: { name: string }) => {
  await apiWithAuth.post("/me/chats", data);
};

export const sendMessage = async (chatId: string | undefined, data: { content: string }) => {
  await apiWithAuth.post(`/me/chats/${chatId}/messages`, data);
};

export const createScrapbook = async (data: { name: string }) => {
  await apiWithAuth.post("/me/scrapbooks", data);
};

export const createScrap = async (data: {
  chatID: string | undefined;
  memo: string;
  seq: number | undefined;
  scrapbookIDs: string[];
}) => {
  await apiWithAuth.post(`/me/scraps`, data);
};

export const addSingleScrap = async (scrapId: string | undefined, scrapbookId: string) => {
  await apiWithAuth.post(`/me/scraps/${scrapId}/scrapbooks/${scrapbookId}`);
};

/* PATCH */
export const modifyChat = async (chatId: string, data: { name: string }) => {
  await apiWithAuth.patch(`/me/chats/${chatId}`, data);
};

export const modifyScrapbook = async (scrapbookId: string, data: { name: string }) => {
  await apiWithAuth.patch(`/me/scrapbooks/${scrapbookId}`, data);
};

/* DELETE */
export const deleteChat = async (chatId: string) => {
  await apiWithAuth.delete(`/me/chats/${chatId}`);
};

export const deleteScrapbook = async (scrapbookId: string) => {
  await apiWithAuth.delete(`/me/scrapbooks/${scrapbookId}`);
};

export const deleteSingleScrap = async (scrapId: string | undefined, scrapbookId: string) => {
  await apiWithAuth.delete(`/me/scraps/${scrapId}/scrapbooks/${scrapbookId}`);
};

export const deleteAllScrap = async (scrapId: string | undefined) => {
  apiWithAuth.delete(`/me/scraps/${scrapId}`);
};
