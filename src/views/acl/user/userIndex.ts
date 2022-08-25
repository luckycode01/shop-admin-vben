export const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    className: '!text-center w-80px',
    slots: { customRender: 'index' },
  },
  {
    title: '用户名 ',
    dataIndex: 'username',
    className: '!text-center w-200px',
    width: 'width',
  },
  {
    title: '邮箱',
    className: '!text-center ',
    dataIndex: 'email',
    width: 'width',
  },
  {
    title: '电话',
    className: '!text-center ',
    dataIndex: 'mobile',
    width: 'width',
  },
  {
    title: '角色',
    className: '!text-center ',
    dataIndex: 'role_name',
    width: 'width',
  },
  {
    title: '状态',
    className: '!text-center ',
    dataIndex: 'mg_state',
    width: 'width',
    slots: { customRender: 'mgState' },
  },
  {
    title: '创建时间',
    className: '!text-center ',
    dataIndex: 'create_time',
    width: 'width',
    slots: { customRender: 'createTime' },
  },
  {
    title: '操作',
    className: '!text-center w-80px',
    width: 200,
    dataIndex: 'operation',
    fixed: 'right',
    slots: { customRender: 'operation' },
  },
];
