import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const acl: AppRouteModule = {
  path: '/acl',
  name: 'Acl',
  component: LAYOUT,
  redirect: '/acl/user',
  meta: {
    hideChildrenInMenu: false,
    orderNo: 11,
    icon: 'icon-park-outline:permissions',
    title: t('routes.acl.acl'),
  },
  children: [
    {
      path: 'user',
      name: 'User',
      component: () => import('/@/views/acl/user/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.acl.user'),
      },
    },
    {
      path: 'role',
      name: 'Role',
      component: () => import('/@/views/acl/role/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.acl.role'),
      },
    },
    {
      path: 'permission',
      name: 'Permission',
      component: () => import('/@/views/acl/permission/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.acl.permission'),
      },
    },
  ],
};

export default acl;
