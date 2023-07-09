export interface IChat {
  createdAt: string;
  id: string;
  name: string;
}

export interface IMessage {
  chatId?: string;
  chatID?: string;
  content: string;
  createdAt: string;
  seq: number;
  role?: string;
  scrap?: IScrap;
}

export interface IScrapbook {
  createdAt: string;
  id: string;
  name: string;
  isDefault: boolean;
}

export interface IScrap {
  createdAt: string;
  id: string;
  memo: string;
  message?: IMessage;
}
