import { defHttp } from '/@/utils/http/axios';
import {
  UserParamsInfo,
  UsersResultModel,
  changeUserStateModel,
  UserInfoModel,
  AddUsersResultModel,
  searchUsersResultModel,
  deleteUsersResultModel,
} from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  Users = '/users',
}

/**
 * @description: user login api
 */
export function getUsersListApi(params: UserParamsInfo, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<UsersResultModel>(
    {
      url: Api.Users,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
export function changeUsersStateApi(uId: number, type: boolean, mode: ErrorMessageMode = 'modal') {
  return defHttp.put<changeUserStateModel>(
    {
      url: Api.Users,
      params: `/${uId}/state/${type}`,
    },
    {
      errorMessageMode: mode,
    },
  );
}
export function addUserApi(params: UserInfoModel, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<AddUsersResultModel>(
    {
      url: Api.Users,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
export function searchUserInfoApi(id: number, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<searchUsersResultModel>(
    {
      url: Api.Users,
      params: `/${id}`,
    },
    {
      errorMessageMode: mode,
    },
  );
}
export function editUserInfoApi(
  id: number,
  params: UserInfoModel,
  mode: ErrorMessageMode = 'modal',
) {
  return defHttp.put<searchUsersResultModel>(
    {
      url: Api.Users,
      params: `/${id}`,
      data: params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
export function deleteUserInfoApi(id: number, mode: ErrorMessageMode = 'modal') {
  return defHttp.delete<deleteUsersResultModel>(
    {
      url: Api.Users,
      params: `/${id}`,
    },
    {
      errorMessageMode: mode,
    },
  );
}
