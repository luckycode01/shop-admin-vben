import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const acl: AppRouteModule = {
  path: '/order',
  name: 'Order',
  component: LAYOUT,
  redirect: '/order/orderlist',
  meta: {
    hideChildrenInMenu: false,
    orderNo: 21,
    icon: 'icon-park-outline:permissions',
    title: t('routes.order.order'),
  },
  children: [
    {
      path: 'user',
      name: 'User',
      component: () => import('/@/views/order/orderList/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.order.orderList'),
      },
    },
    {
      path: 'role',
      name: 'Role',
      component: () => import('/@/views/order/detail/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.order.orderDetatil'),
      },
    },
  ],
};

export default acl;
