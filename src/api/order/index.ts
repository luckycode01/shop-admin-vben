import { defHttp } from '/@/utils/http/axios';
import { orderParamsInfo, orderResultModel } from './model/index';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  Users = '/orders',
}

/**
 * @description: user login api
 */
export function reqOrderListApi(params: orderParamsInfo, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<orderResultModel>(
    {
      url: Api.Users,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
