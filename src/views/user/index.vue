<template>
  <el-card class="box-card">
    <el-form label-width="100px" label-position="left" :model="form" class="demo-form-inline">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="审批人">
            <el-input v-model="form.user" placeholder="审批人" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="审批人">
            <el-input v-model="form.user" placeholder="审批人" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" @click="getList">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      :data="list"
      style="width: 100%"
    >
      <el-table-column
        prop="date"
        label="日期"
        width="180"
      />
      <el-table-column
        prop="name"
        label="姓名"
        width="180"
      />
      <el-table-column
        prop="address"
        label="地址"
      />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      form: {
        user: '',
        region: ''
      },
      list: []
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    getList() {

    }
  }
}
</script>

<style scoped>
</style>

