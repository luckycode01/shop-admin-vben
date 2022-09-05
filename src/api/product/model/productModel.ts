import { metaInfo } from '../../public';
export interface productParamsInfo {
  query: string;
  pagenum: number;
  pagesize: number;
}
export interface productListInfo {
  goods_id: number;
  goods_name: string;
  goods_price: number;
  goods_number: number;
  goods_weight: number;
  goods_state: null;
  add_time: number;
  upd_time: number;
  hot_mumber: number;
  is_promote: boolean;
}
export type UsersListListModel = productListInfo[];

export interface DataResUltModel {
  total: number;
  pagenum: number;
  goods: UsersListListModel;
}
// 用户列表返回
export interface productResultModel {
  data: DataResUltModel;
  meta: metaInfo;
}
