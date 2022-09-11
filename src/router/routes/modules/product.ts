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
      path: 'productList',
      name: 'Productlist',
      component: () => import('/@/views/product/proList/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.product.productList'),
      },
    },
    {
      path: 'addoreditprod',
      name: 'addOrEditProd',
      component: () => import('/@/views/product/addOrEditProd/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.product.addoreditprod'),
      },
    },
    {
      path: 'cateparams',
      name: 'Cateparams',
      component: () => import('/@/views/product/cateParams/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.product.cateParams'),
      },
    },
    {
      path: 'productcate',
      name: 'Productcate',
      component: () => import('/@/views/product/category/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.product.productCate'),
      },
    },
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
