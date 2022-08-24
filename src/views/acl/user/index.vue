<template>
  <div>
    <Card>
      <Row :gutter="24">
        <Col span="6">
          <input-search
            v-model:value="userParams.query"
            placeholder="请输入用户名"
            enter-button
            @search="handleSearch"
            @change="handleSearch"
          />
        </Col>
        <Col span="6">
          <Button type="primary">
            <template #icon><plus-outlined /></template>
            添加用户
          </Button></Col
        >
      </Row>
      <Table
        :row-key="(record) => record.id"
        :dataSource="usersList"
        :columns="columns"
        bordered
        :loading="loading"
        :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)"
        :pagination="{
          current,
          pageSize,
          total,
          pageSizeOptions: ['5', '10', '15', '20'],
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total) => `总共${total}条`,
          onChange: handleChangePage,
        }"
      >
        <template #index="{ index, column }">
          <template v-if="column.dataIndex === 'index'">
            {{ index + 1 }}
          </template>
        </template>
        <template #mgState="{ record, column }">
          <template v-if="column.dataIndex === 'mg_state'">
            <Switch v-model:checked="record.mg_state" @change="handleUserState(record)"></Switch>
          </template>
        </template>
        <template #createTime="{ text }">
          {{ handleTime(text) }}
        </template>
        <template #operation="{ column }">
          <template v-if="column.dataIndex === 'operation'">
            <Button type="primary" :size="size">修改</Button>
            <Button danger :size="size" class="ml-20px">删除</Button>
          </template>
        </template>
      </Table>
    </Card>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { SizeType } from 'ant-design-vue/lib/config-provider';
  // 为了定义组件名称
  export default defineComponent({
    name: 'User',
  });
</script>

<script lang="ts" setup>
  import { Button, Card, Table, InputSearch, Row, Col, Switch, message } from 'ant-design-vue';
  import { PlusOutlined } from '@ant-design/icons-vue';
  import { ref, onMounted, reactive } from 'vue';
  import { UserParamsInfo, UsersListListModel } from '/@/api/acl/model/userModel';
  import { getUsersListApi, changeUsersStateApi } from '/@/api/acl/user';
  import _ from 'lodash';

  const columns = [
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
  const current = ref<number>(1);
  const pageSize = ref<number>(5);
  const total = ref<number>(100);
  const size = ref<SizeType>('small');
  const loading = ref<boolean>(false);
  const usersList = ref<UsersListListModel>([]);
  const userParams = reactive<UserParamsInfo>({
    query: '',
    pagenum: 1,
    pagesize: 10,
  });
  // const assignUser = reactive<UserModel>({
  //   id: '',
  //   username: '',
  //   roleName: [],
  // });

  const handleChangePage = (current, pageSize) => {
    console.log(current, pageSize);
  };
  const handleSearch = _.debounce(() => {
    getUserList(userParams);
  }, 600);
  const getUserList = async (params: UserParamsInfo) => {
    loading.value = true;
    const res = await getUsersListApi(params);
    if (res.meta.status == 200) {
      usersList.value = res.data && res.data.users;
      total.value = res.data.total;
    }

    // total.value = res.total;
    // current.value = page;
    // pageSize.value = limit;
    loading.value = false;
  };
  // 修改用户状态
  const handleUserState = async (record) => {
    console.log(record.mg_state);
    const res = await changeUsersStateApi(record.id, record.mg_state);
    if (res.meta.status == 200) {
      message.success(res.meta.msg);
    } else {
      message.error(res.meta.msg);
    }
    getUserList({ query: '', pagenum: 1, pagesize: 10 });
  };
  const handleTime = (time) => {
    let date = new Date(time);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    return `${year}-${month}-${day} ${hours}:${min}:${sec}`;
  };

  onMounted(() => {
    getUserList(userParams);
  });
</script>

<style lang="less" scoped></style>
