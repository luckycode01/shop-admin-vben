import { metaInfo } from '../../public';

/**
 * @description: Login interface UserParamsInfo
 */

export interface UserParamsInfo {
  query: string;
  pagenum: number;
  pagesize: number;
}
export interface UsersListInfo {
  id: number;
  username: string;
  mobile: string;
  type: number;
  email: string;
  create_time: string;
  mg_state: boolean; // 当前用户的状态
  role_name: string;
}
export type UsersListListModel = UsersListInfo[];

export interface DataResUltModel {
  total: number;
  pagenum: number;
  users: UsersListListModel;
}

export interface UsersResultModel {
  data: DataResUltModel;
  meta: metaInfo;
}
export interface changeUserStateModel {
  meta: metaInfo;
}
export interface UserInfoModel {
  id?: number;
  userName: string;
  userPass: string;
  email: string;
  phone: string;
}
