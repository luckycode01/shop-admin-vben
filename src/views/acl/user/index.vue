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
          <Button type="primary" @click="handleOpenAddOrEdit()">
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
          {{ dateFormat(text) }}
        </template>
        <template #operation="{ column, record }">
          <template v-if="column.dataIndex === 'operation'">
            <Button type="primary" @click="handleOpenAddOrEdit(record.id)" :size="size"
              >修改</Button
            >
            <Button danger :size="size" class="ml-20px">删除</Button>
          </template>
        </template>
      </Table>
    </Card>

    <Modal v-model:visible="addOrEditUserDialog" :title="dialogTitle">
      <template #footer>
        <a-button key="back" @click="handleCancel">取消</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleAddOrEditOk"
          >确定</a-button
        >
      </template>
      <Form
        class="!mt-30px !ml-20px"
        ref="formRef"
        :model="userInfo"
        :rules="rules"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 14 }"
      >
        <FormItem :label="'用户名称'" name="userName">
          <Input v-model:value="userInfo.userName" />
        </FormItem>
        <FormItem v-if="!userInfo.id" :label="'用户密码'" name="userPass">
          <Input v-model:value="userInfo.userPass" />
        </FormItem>
        <FormItem :label="'用户邮箱'" name="email">
          <Input v-model:value="userInfo.email" />
        </FormItem>
        <FormItem :label="'用户电话'" name="phone">
          <Input v-model:value="userInfo.phone" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { SizeType } from 'ant-design-vue/lib/config-provider';
  import { time } from 'console';
  // 为了定义组件名称
  export default defineComponent({
    name: 'User',
  });
</script>

<script lang="ts" setup>
  import { PlusOutlined } from '@ant-design/icons-vue';
  import {
    ref,
    onMounted,
    reactive,
    UnwrapRef,
    getCurrentInstance,
    ComponentInternalInstance,
  } from 'vue';
  import { UserParamsInfo, UsersListListModel, UserInfoModel } from '/@/api/acl/model/userModel';
  import { getUsersListApi, changeUsersStateApi } from '/@/api/acl/user';
  import { columns } from './userIndex';
  import { dateFormat } from '/@/utils/dateFormat';
  import _ from 'lodash';
  const { proxy } = getCurrentInstance() as ComponentInternalInstance;

  const current = ref<number>(1);
  const pageSize = ref<number>(5);
  const total = ref<number>(100);
  const size = ref<SizeType>('small');
  const loading = ref<boolean>(false);
  const usersList = ref<UsersListListModel>([]);
  const addOrEditUserDialog = ref<Boolean>(false);
  let dialogTitle = ref<string>('');
  const userParams = reactive<UserParamsInfo>({
    query: '',
    pagenum: 1,
    pagesize: 10,
  });
  const rules = {
    // 要求：规则名称必须和表单数据的名称一致
    userName: [{ required: true, message: '请输入用户名称', trigger: 'blur' }],
    userPass: [{ required: true, message: '请输入用户密码', trigger: 'blur' }],
  };
  // 添加或修改用户表单
  const userInfo: UnwrapRef<UserInfoModel> = reactive({
    userName: '',
    userPass: '',
    email: '',
    phone: '',
  });
  // const assignUser = reactive<UserModel>({
  //   id: '',
  //   username: '',
  //   roleName: [],
  // });
  // 打开添加修改对话框
  const handleOpenAddOrEdit = (id?: number) => {
    if (id) {
      dialogTitle.value = '编辑用户';
      console.log(id);
    } else {
      dialogTitle.value = '添加用户';
    }
    addOrEditUserDialog.value = true;
  };
  //保存 添加、修改用户
  const handleAddOrEditOk = () => {
    // addOrEditUserDialog.value = true;
  };
  const handleCancel = () => {
    addOrEditUserDialog.value = false;
    reset();
  };
  const reset = () => {
    userInfo.userName = '';
    userInfo.userPass = '';
    userInfo.email = '';
    userInfo.phone = '';
  };

  // 分页器
  const handleChangePage = (current, pageSize) => {
    console.log(current, pageSize);
  };
  //搜索，节流防抖的使用
  const handleSearch = _.debounce(() => {
    getUserList(userParams);
  }, 600);
  // 获取用户列表
  const getUserList = async (params: UserParamsInfo) => {
    loading.value = true;
    const res = await getUsersListApi(params);
    if (res.meta.status == 200) {
      usersList.value = res.data && res.data.users;
      total.value = res.data.total;
    }
    loading.value = false;
  };
  // 修改用户状态
  const handleUserState = async (record) => {
    const res = await changeUsersStateApi(record.id, record.mg_state);
    if (res.meta.status == 200) {
      proxy?.$message.success(res.meta.msg);
    } else {
      proxy?.$message.error(res.meta.msg);
    }
    getUserList({ query: '', pagenum: 1, pagesize: 10 });
  };

  onMounted(() => {
    getUserList(userParams);
  });
</script>

<style lang="less">
  .ant-modal-header {
    text-align: center;
  }
  .ant-modal-body {
    padding: 0;
  }
  .ant-modal-footer {
    padding: 10px 100px;
  }
</style>
