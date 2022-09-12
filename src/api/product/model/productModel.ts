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

// 分类管理
export interface categoryParamsInfo {
  type?: number;
  pagenum: number;
  pagesize: number;
}
export interface categoryListInfo {
  cat_id: number;
  cat_name: string;
  cat_pid: number;
  cat_level: number;
  cat_deleted: boolean;
  children: Array<[]>;
}
export type categorytListModel = categoryListInfo[];

export interface cateDataResultModel {
  total: number;
  pagenum: number;
  result: categorytListModel;
}
// 用户列表返回
export interface categoryResultModel {
  data: cateDataResultModel;
  meta: metaInfo;
}
