import { defHttp } from '/@/utils/http/axios';
import {
  productParamsInfo,
  productResultModel,
  categoryParamsInfo,
  categoryResultModel,
} from './model/productModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  Users = '/goods',
  Category = '/categories',
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
export function getCategoryListApi(params: categoryParamsInfo, mode: ErrorMessageMode = 'modal') {
  return defHttp.get<categoryResultModel>(
    {
      url: Api.Category,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
