import { defHttp } from '/@/utils/http/axios';
import { UserParamsInfo, UsersResultModel } from './model/userModel';

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
