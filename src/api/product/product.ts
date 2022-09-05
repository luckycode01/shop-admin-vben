import { defHttp } from '/@/utils/http/axios';
import { productParamsInfo, productResultModel } from './model/productModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  Users = '/goods',
}

/**
 * @description: user login api
 */
export function getProductListApi(params: productParamsInfo, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<productResultModel>(
    {
      url: Api.Users,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
