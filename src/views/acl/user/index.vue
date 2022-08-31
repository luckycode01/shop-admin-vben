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

    <Modal v-model:visible="addOrEditUserDialog" :title="dialogTitle" @cancel="closeDialog">
      <template #footer>
        <a-button key="back" @click="handleCancel">取消</a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleAddOrEditOk"
          >确定</a-button
        >
      </template>
      <Form
        class="!mt-30px !ml-20px"
        ref="addOrEditFormRef"
        :model="userInfo"
        :rules="rules"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 14 }"
      >
        <FormItem :label="'用户名称'" name="username">
          <Input v-model:value="userInfo.username" :disabled="userInfo.id ? true : false" />
        </FormItem>
        <FormItem v-if="!userInfo.id" :label="'用户密码'" name="password">
          <Input v-model:value="userInfo.password" />
        </FormItem>
        <FormItem :label="'用户邮箱'" name="email">
          <Input v-model:value="userInfo.email" />
        </FormItem>
        <FormItem :label="'用户电话'" name="mobile">
          <Input v-model:value="userInfo.mobile" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { SizeType } from 'ant-design-vue/lib/config-provider';
  import user from 'mock/sys/user';
  // 为了定义组件名称
  export default defineComponent({
    name: 'User',
  });
</script>

<script lang="ts" setup>
  import { message } from 'ant-design-vue';
  import { PlusOutlined } from '@ant-design/icons-vue';
  import { RuleObject } from 'ant-design-vue/es/form/interface';
  import { ref, onMounted, reactive, UnwrapRef } from 'vue';
  import { UserParamsInfo, UsersListListModel, UserInfoModel } from '/@/api/acl/model/userModel';
  import {
    getUsersListApi,
    changeUsersStateApi,
    addUserApi,
    searchUserInfoApi,
    editUserInfoApi,
  } from '/@/api/acl/user';
  import { columns } from './userIndex';
  import { dateFormat } from '/@/utils/dateFormat';
  import _ from 'lodash';

  const current = ref<number>(1);
  const pageSize = ref<number>(5);
  const total = ref<number>(100);
  const size = ref<SizeType>('small');
  const loading = ref<boolean>(false);
  const usersList = ref<UsersListListModel>([]);
  const addOrEditUserDialog = ref<Boolean>(false);
  const addOrEditFormRef = ref();
  let dialogTitle = ref<string>('');
  const userParams = reactive<UserParamsInfo>({
    query: '',
    pagenum: 1,
    pagesize: 10,
  });
  let checkUserName = async (_rule: RuleObject, value: string) => {
    if (!value) {
      return Promise.reject('请输入用户名称');
    }
    if (value.length > 15 || value.length < 3) {
      return Promise.reject('用户名长度为3—15个字符');
    } else {
      return Promise.resolve();
    }
  };
  let checkUserPass = async (_rule: RuleObject, value: string) => {
    if (!value) {
      return Promise.reject('请输入用户密码');
    }
    if (value.length > 15 || value.length < 6) {
      return Promise.reject('用户名长度为6—15个字符');
    } else {
      return Promise.resolve();
    }
  };
  let checkEmail = async (_rule: RuleObject, value: string) => {
    const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (!value) return Promise.resolve();
    if (!reg.test(value)) {
      return Promise.reject('邮箱格式有误');
    } else {
      return Promise.resolve();
    }
  };
  let checkMobile = async (_rule: RuleObject, value: string) => {
    const reg = /^1[34578]\d{9}/;
    if (!value) return Promise.resolve();
    if (!reg.test(value)) {
      return Promise.reject('请输入正确手机号');
    } else {
      return Promise.resolve();
    }
  };
  const rules = {
    // 规则名称必须和表单数据的名称一致
    username: [{ required: true, validator: checkUserName, trigger: 'blur' }],
    password: [{ required: true, validator: checkUserPass, trigger: 'blur' }],
    email: [{ required: false, validator: checkEmail, trigger: 'blur' }],
    mobile: [{ required: false, validator: checkMobile, trigger: 'blur' }],
  };
  // 添加或修改用户表单
  let userInfo: UnwrapRef<UserInfoModel> = reactive({
    username: '',
    password: '',
    email: '',
    mobile: '',
  });
  // const assignUser = reactive<UserModel>({
  //   id: '',
  //   username: '',
  //   roleName: [],
  // });
  // 打开添加修改对话框
  const handleOpenAddOrEdit = async (id?: number) => {
    if (id) {
      dialogTitle.value = '编辑用户';
      userInfo.id = id;
      try {
        const res = await searchUserInfoApi(id);
        if (res.meta.status == 200) {
          userInfo.username = res.data.username;
          userInfo.email = res.data.email;
          userInfo.mobile = res.data.mobile;
        } else {
          message.error(res.meta.msg);
        }
      } catch (error) {
        message.error('用户查询失败');
      }
    } else {
      dialogTitle.value = '添加用户';
    }
    addOrEditUserDialog.value = true;
  };
  //保存 添加、修改用户
  const handleAddOrEditOk = async () => {
    // addOrEditUserDialog.value = true;
    try {
      await addOrEditFormRef.value.validateFields();
      let params = userInfo;
      // addUserApi
      if (!userInfo.id) {
        const res = await addUserApi(params);
        if (res.meta.status == 201) {
          message.success(res.meta.msg);
        } else {
          message.error(res.meta.msg);
        }
        addOrEditUserDialog.value = false;
        addOrEditFormRef.value.resetFields();
        // addOrEditFormRef.resetFields();
        loading.value = false;
      } else if (userInfo.id) {
        delete params.username;
        delete params.password;
        const res = await editUserInfoApi(userInfo.id, params);
        if (res.meta.status == 200) {
          message.success(res.meta.msg);
        } else {
          message.error(res.meta.msg);
        }
        addOrEditUserDialog.value = false;
        addOrEditFormRef.value.resetFields();
        // addOrEditFormRef.resetFields();
        loading.value = false;
      }
    } catch (errorInfo) {
      message.error('用户信息不完整');
    }
  };
  const handleCancel = () => {
    addOrEditUserDialog.value = false;
    addOrEditFormRef.value.resetFields();
    reset();
  };
  const closeDialog = () => {
    addOrEditFormRef.value.resetFields();
    reset();
  };
  const reset = () => {
    userInfo.username = '';
    userInfo.password = '';
    userInfo.email = '';
    userInfo.mobile = '';
    delete userInfo.id;
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
      message.success(res.meta.msg);
    } else {
      message.error(res.meta.msg);
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
