import { metaInfo } from '../../public';
export interface orderParamsInfo {
  query: string;
  pagenum: number;
  pagesize: number;
  user_id?: number | string;
  pay_status?: string;
  is_send?: string;
  order_fapiao_title?: string;
  order_fapiao_company?: string;
  order_fapiao_content?: string;
  consignee_addr?: string;
}
export interface orderListInfo {
  order_id: number;
  user_id: number;
  order_number: string;
  order_price: number;
  order_pay: string;
  is_send: string;
  trade_no: string;
  order_fapiao_title: string;
  order_fapiao_company: string;
  order_fapiao_content: string;
  consignee_addr: string;
  pay_status: string;
  create_time: number;
  update_time: number;
}
export type orderListModel = orderListInfo[];

export interface DataResUltModel {
  total: number;
  pagenum: number;
  goods: orderListModel;
}
// 用户列表返回
export interface orderResultModel {
  data: DataResUltModel;
  meta: metaInfo;
}
