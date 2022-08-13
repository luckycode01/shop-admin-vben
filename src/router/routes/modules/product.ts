import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const product: AppRouteModule = {
  path: '/product',
  name: 'Product',
  component: LAYOUT,
  redirect: '/product/trademark',
  meta: {
    hideChildrenInMenu: false,
    orderNo: 20,
    icon: 'grommet-icons:shop',
    title: t('routes.product.product'),
  },
  children: [
    {
      path: 'trademark',
      name: 'Trademark',
      component: () => import('/@/views/product/trademark/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.product.trademark'),
      },
    },
    {
      path: 'attr',
      name: 'Attr',
      component: () => import('/@/views/product/attr/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.product.attr'),
      },
    },
    {
      path: 'sku',
      name: 'Sku',
      component: () => import('/@/views/product/sku/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.product.sku'),
      },
    },
    {
      path: 'spu',
      name: 'Spu',
      component: () => import('/@/views/product/spu/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.product.spu'),
      },
    },
  ],
};

export default product;
