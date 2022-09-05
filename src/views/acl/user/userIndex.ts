import { useI18n } from '/@/hooks/web/useI18n';
const { t } = useI18n();
export const columns = [
  {
    title: t('routes.acl.th.order'),
    dataIndex: 'index',
    className: '!text-center w-80px',
    slots: { customRender: 'index' },
  },
  {
    title: t('routes.acl.th.uname'),
    dataIndex: 'username',
    className: '!text-center w-200px',
    width: 'width',
  },
  {
    title: t('routes.acl.th.email'),
    className: '!text-center ',
    dataIndex: 'email',
    width: 'width',
  },
  {
    title: t('routes.acl.th.phone'),
    className: '!text-center ',
    dataIndex: 'mobile',
    width: 'width',
  },
  {
    title: t('routes.acl.th.role'),
    className: '!text-center ',
    dataIndex: 'role_name',
    width: 'width',
  },
  {
    title: t('routes.acl.th.state'),
    className: '!text-center ',
    dataIndex: 'mg_state',
    width: 'width',
    slots: { customRender: 'mgState' },
  },
  {
    title: t('routes.acl.th.createTime'),
    className: '!text-center ',
    dataIndex: 'create_time',
    width: 'width',
    slots: { customRender: 'createTime' },
  },
  {
    title: t('routes.acl.th.operation'),
    className: '!text-center w-80px',
    width: 200,
    dataIndex: 'operation',
    fixed: 'right',
    slots: { customRender: 'operation' },
  },
];
