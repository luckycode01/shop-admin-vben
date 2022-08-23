import { defHttp } from '/@/utils/http/axios';
import { UserParamsInfo, UsersResultModel, changeUserStateModel } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  Users = '/users',
  changeUserState = `/users`,
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
