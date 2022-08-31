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
// 用户列表返回
export interface UsersResultModel {
  data: DataResUltModel;
  meta: metaInfo;
}
export interface changeUserStateModel {
  meta: metaInfo;
}
// 添加、编辑用户表单
export interface UserInfoModel {
  id?: number;
  username?: string;
  password?: string;
  email: string;
  mobile: string;
}
export interface addOrEditResUltModel {
  id: number;
  username: string;
  mobile: string;
  type: number;
  openid: string;
  email: string;
  create_time: string;
  is_delete: boolean;
  is_active: boolean;
}
export type addUserModel = addOrEditResUltModel[];
// 添加/编辑用户返回数据类型
export interface AddUsersResultModel {
  data: addUserModel;
  meta: metaInfo;
}

// 根据ID查询用户信息
export interface searchUserInfoModel {
  id?: number;
  username: string;
  role_id: number;
  mobile: string;
  email: string;
}
// 添加/编辑用户返回数据类型
export interface searchUsersResultModel {
  data: searchUserInfoModel;
  meta: metaInfo;
}
