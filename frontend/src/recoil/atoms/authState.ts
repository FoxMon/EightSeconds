import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface channelsType {
  _id: string;
  title: string;
  img: string;
  locationDist: string;
  locationCity: string;
  memberNum: number;
  curMemberNum: number;
  position: number;
}

export interface IUser {
  _id: string;
  token?: string;
  email?: string;
  nickname: string;
  password?: string;
  channels: channelsType[];
  description: string;
  waitResList?: string[];
  waitReqList?: string[];
  following?: string[];
  profPic?: string;
  __v?: number;
}
export interface IUserId {
  CurUserId: string;
}

export const authState = atom({
  key: "authState",
  default: {
    userId: "123",
  },
});

const { persistAtom } = recoilPersist();

export const loginUserIdState = atom<string>({
  key: "loginUserId",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const authRefreshTokenState = atom<string>({
  key: "refreshToken",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const curUserState = atom<IUser>({
  key: "curUser",
  default: {
    _id: "",
    token: "",
    email: "",
    nickname: "",
    password: "",
    channels: [],
    description: "",
    waitResList: [],
    waitReqList: [],
    following: [],
    profPic: "",
    __v: 0,
  },
});
