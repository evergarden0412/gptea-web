import { toast } from "react-toastify";

export const toastRegister = () => toast("계정 가입", { type: "success" }); //
export const toastFailToRegister = () => toast("계정 가입 실패", { type: "error" }); //

export const toastLogin = () => toast("로그인", { type: "success" }); //
export const toastFailToLogin = () => toast("로그인 실패", { type: "error" }); //

export const toastLogout = () => toast("로그아웃", { type: "success" }); //
export const toastFailToLogout = () => toast("로그아웃 실패", { type: "error" });

//실패

export const toastFailToDeleteScrap = () => toast("하나 이상의 스크랩북에 저장해야 합니다.", { type: "error" }); //

export const toastFailToCreateScrapbook = () => toast("이미 존재하는 이름입니다.", { type: "error" });

export const toastFailToWithdrawal = () => toast("입력을 확인해주세요.", { type: "error" }); //

export const toastFailToRequest = () => toast("요청에 실패했습니다.", { type: "error" }); //

//성공

//스크랩북
export const toastSuccessToCreateScrapbook = () => toast("스크랩북을 생성했습니다.", { type: "success" }); //
export const toastSuccessToDeleteScrapbook = () => toast("스크랩북을 삭제했습니다.", { type: "success" }); //
export const toastSuccessToModifyScrapbookName = () => toast("스크랩북 이름을 수정했습니다.", { type: "success" }); //

//스크랩
export const toastSuccessToCreateScrap = () => toast("스크랩을 생성하여 스크랩북에 추가했습니다.", { type: "success" }); //
export const toastSuccessToAddScrap = () => toast("스크랩북에 추가했습니다.", { type: "success" }); //
export const toastSuccessToDeleteScrap = () => toast("스크랩북에서 삭제했습니다.", { type: "success" }); //
export const toastSuccessToDeleteAllScrap = () => toast("모든 스크랩을 삭제했습니다.", { type: "success" }); //

//채팅
export const toastSuccessToCreateChat = () => toast("채팅을 생성했습니다.", { type: "success" }); //
export const toastSuccessToModifyChatName = () => toast("채팅 이름을 수정했습니다.", { type: "success" }); //
export const toastSuccessToDeleteChat = () => toast("채팅을 삭제했습니다.", { type: "success" }); //

//계정
export const toastSuccessToWithdrawal = () => toast("계정 삭제", { type: "success" }); //
