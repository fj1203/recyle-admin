<template>
  <el-card>
    <el-form ref="form" :model="form" label-width="110px" label-position="left" :rules="rules">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="sortParam" label="排序方式">
            <el-select v-model="form.sortParam" placeholder="请选择排序方式">
              <el-option label="按金额排序" value="1" />
              <el-option label="按订单数排序" value="2" />
              <el-option label="按创建时间排序" value="3" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="sort" label="正序或者降序">
            <el-select v-model="form.sort" placeholder="请选正序或者降序">
              <el-option label="正序" value="1" />
              <el-option label="倒叙" value="2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      :data="list"
      style="width: 100%"
    >
      <el-table-column
        prop="nickname"
        label="名字"
      />
      <el-table-column
        prop="phone"
        label="电话"
      />
      <el-table-column label="重量">
        <template slot-scope="scope">
          {{ scope.row.allNum }} (kg)
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="info(scope.row)"
          >查看</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="self-page"
      background
      layout="prev, pager, next"
      :total="page.total"
      :page-size="10"
      @current-change="getList"
    />
    <el-dialog title="用户信息" :visible.sync="dialog">
      <el-form label-position="left" label-width="80px">
        <el-form-item label="头像">
          <img width="50px" :src="formDialog.headUrl" alt="">
        </el-form-item>
        <el-form-item label="名称">
          {{ formDialog.nickname }}
        </el-form-item>
        <el-form-item label="电话">
          {{ formDialog.phone }}
        </el-form-item>
        <el-form-item label="重量">
          {{ formDialog.allNum }}kg
        </el-form-item>
        <el-form-item label="创建时间">
          {{ formDialog.createTime | dateFormat }}
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="dialog = false">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import { getUserList, delUser } from '@/api/system'
export default {
  data() {
    return {
      dialog: false,
      form: {
        sortParam: '',
        sort: ''
      },
      list: [],
      page: {
        total: 0,
        page: 1
      },
      rules: {
        // sortParam: { required: true, message: '请选择排序方式' },
        // sort: { required: true, message: '请选正序或者降序' }
      },
      formDialog: ''
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList(page = 1) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          getUserList({
            ...this.form,
            page,
            size: 10
          }).then(res => {
            this.list = res.data.rows
            this.page.total = res.data.records
            this.page.page = res.data.page
          })
        } else {
          return false
        }
      })
    },
    handleDelete(id) {
      console.log(id)
      const that = this
      this.$confirm('确认删除吗,相关订单也会删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delUser({
          id
        }).then(res => {
          that.$Message.success('删除成功')
          that.getList()
        }).catch(() => {
          console.log('cancel')
        })
      })
    },
    info(item) {
      this.dialog = true
      this.formDialog = item
    }
  }
}
</script>

<style scoped>
</style>

