<template>
  <el-card>
    <el-card class="sys-item">
      <el-form>
        <el-form-item label="轮播图" label-width="120px">
          <el-upload
            list-type="picture-card"
            action="customize"
            :show-file-list="true"
            :on-remove="remove"
            :http-request="upload"
            :file-list="fileList"
            :auto-upload="true"
          >
            <!-- <img v-for="(item,index) in imageArr" :key="index" :src="imageArr" class="avatar"> -->
            <i class="el-icon-plus" />
          </el-upload>
        </el-form-item>
      </el-form>
      <div class="text-right"><el-button type="primary">提交</el-button></div>
    </el-card>
    <el-card class="sys-item">
      <el-row>
        <el-col :span="12">
          <el-form>
            <el-form-item label="今日价格" label-width="120px">
              <el-input v-model="price" />
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div class="text-right"><el-button type="primary" @click="setPrice">提交</el-button></div>
    </el-card>
    <el-card class="sys-item">
      <el-row>
        <el-col :span="12">
          <el-form>
            <el-form-item label="滚动文字" label-width="120px">
              <el-input v-model="content" />
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div class="text-right"><el-button type="primary" @click="setContent">提交</el-button></div>
    </el-card>
  </el-card>
</template>
<script>
import { uploadFace, getPrice, setPrice, getContent, setContent } from '@/api/system'
export default {
  data() {
    return {
      fileList: [],
      price: '',
      content: ''
    }
  },
  created() {
    this.getPrice()
    this.getContent()
  },
  methods: {
    upload(data) {
      console.log(data)
      const _file = data.file
      var formData = new FormData()
      formData.append('files', _file)
      console.log(_file)
      uploadFace(formData).then(res => {
        // this.imageUrl = 'http://123.207.86.66:6784' + res.data.data
        // this.fileList.push(`http://www.wwwruiqilinmuyinghuli.cn${res.data.data}`)
        console.log(this.fileList)
      })
    },
    remove(file, fileList) {
      console.log(fileList)
    },
    getPrice() {
      getPrice().then(res => {
        this.price = res.data
      }).catch(() => {
        console.log('cancel')
      })
    },
    getContent() {
      getContent().then(res => {
        this.content = res.data
      }).catch(() => {
        console.log('cancel')
      })
    },
    setPrice() {
      setPrice({ price: this.price }).then(res => {
        this.$message({
          message: '提交成功',
          type: 'success'
        })
      }).catch(() => {
        console.log('cancel')
      })
    },
    setContent() {
      setContent({ content: this.content }).then(res => {
        this.$message({
          message: '提交成功',
          type: 'success'
        })
      }).catch(() => {
        console.log('cancel')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.text-right{
  text-align: right;
}
.sys-item{
  margin-bottom: 20px;
}
</style>
