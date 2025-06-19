<!--
 * @description: 标题属性设置面板
 * @Date: 2022-08-17 16:53:28
 * @Author: shiyi
-->
<template>
  <div class="bs-setting-wrap">
    <el-form
      ref="form"
      label-width="100px"
      label-position="left"
      :model="config"
      :rules="rules"
      class="bs-el-form"
    >
      <SettingTitle>标题</SettingTitle>
      <div class="bs-setting-wrap">
        <el-form-item
          label="标题"
          label-width="100px"
          prop="title"
        >
          <el-input
            v-model="config.title"
            placeholder="请输入标题"
            clearable
          />
        </el-form-item>
      </div>
      <SettingTitle>位置</SettingTitle>
      <div class="lc-field-body">
        <PosWhSetting :config="config" />
      </div>
      <SettingTitle v-if="config.border">
        边框
      </SettingTitle>
      <div class="lc-field-body">
        <BorderSetting
          v-if="config.border"
          label-width="100px"
          :config="config.border"
          :big-title="config.title"
        />
      </div>
      <SettingTitle>旋转</SettingTitle>
      <div class="lc-field-body">
        <RotateSetting
          :config="config"
        />
      </div>
      <SettingTitle>基础</SettingTitle>
      <div class="lc-field-body">
        <el-form-item
          label="字体大小"
          label-width="100px"
        >
          <el-input
            v-model="config.customize.fontSize"
            placeholder="请输入字体大小"
            clearable
          >
            <template slot="append">
              px
            </template>
          </el-input>
        </el-form-item>
        <el-form-item
          label="数字权重"
          label-width="100px"
        >
          <el-input-number
            v-model="config.customize.fontWeight"
            class="bs-el-input-number"
            placeholder="请输入数字权重"
            :min="0"
            :step="100"
          />
        </el-form-item>
        <el-form-item
          label="数字间距"
          label-width="100px"
        >
          <el-input-number
            v-model="config.customize.letterSpacing"
            class="bs-el-input-number"
            placeholder="请输入数字间距"
          />
        </el-form-item>
        <!-- 复用字体类型字段作为时间格式 -->
        <el-form-item
          label="时间格式"
          label-width="100px"
        >
          <el-input
            v-model="config.customize.fontFamily"
            placeholder="请输入时间格式"
            clearable
          />
          <div class="format-tips">
            <p>格式示例：</p>
            <p>YYYY-MM-DD HH:mm:ss → 2024-01-15 14:30:25</p>
            <p>YYYY年MM月DD日 → 2024年01月15日</p>
            <p>MM/DD/YYYY → 01/15/2024</p>
            <p>HH:mm → 14:30</p>
          </div>
        </el-form-item>
        <!-- 复用数字对齐方式字段作为数字转换开关 -->
        <el-form-item
          label="数字转换"
          label-width="100px"
        >
          <el-switch
            v-model="config.customize.align"
            active-value="true"
            inactive-value="false"
            class="bs-el-switch"
          />
          <div class="format-tips">
            <p>开启：1转为5，0显示0</p>
            <p>关闭：使用时间戳转换逻辑</p>
          </div>
        </el-form-item>
        <!-- 是否开启语音播报 -->
        <el-form-item
          label="千分位分隔"
          label-width="100px"
        >
          <el-switch
            v-model="config.customize.thousands"
            :active-value="true"
            :inactive-value="false"
            class="bs-el-switch"
          />
        </el-form-item>
        <!-- 原有的数字转换和时间格式配置已复用到上面的字段中 -->
        <TextGradient
          v-model="config.customize.color"
          label="数字"
        />
      </div>
    </el-form>
  </div>
</template>
<script>
import SettingTitle from 'data-room-ui/SettingTitle/index.vue'
import BorderSetting from 'data-room-ui/BigScreenDesign/RightSetting/BorderSetting.vue'
import TextGradient from 'data-room-ui/BigScreenDesign/RightSetting/TextGradient/index'
import PosWhSetting from 'data-room-ui/BigScreenDesign/RightSetting/PosWhSetting.vue'
import RotateSetting from 'data-room-ui/BigScreenDesign/RightSetting/RotateSetting.vue'
import fontList from 'data-room-ui/js/utils/fontList'
import { mapMutations } from 'vuex'
export default {
  name: 'NumberSetting',
  components: {
    TextGradient,
    PosWhSetting,
    SettingTitle,
    BorderSetting,
    RotateSetting
  },
  data () {
    return {
      fontFamilyList: fontList,
      alignList: [{
        label: '靠左',
        value: 'left'
      },
      {
        label: '居中',
        value: 'center'
      },
      {
        label: '靠右',
        value: 'right'
      }],
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    config: {
      get () {
        return this.$store.state.bigScreen.activeItemConfig
      },
      set (val) {
        this.$store.state.bigScreen.activeItemConfig = val
      }
    }
  },
  watch: {
  },
  mounted () {},
  methods: {
    ...mapMutations({
      updateDataset: 'bigScreen/updateDataset',
      updateComputedDatas: 'bigScreen/updateComputedDatas'
    })
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/style/settingWrap.scss";
  .bs-setting-wrap{
    padding-top: 16px;
  }
  .lc-field-body {
    padding: 12px 16px;
  }
  .format-tips {
    margin-top: 8px;
    padding: 8px;
    background-color: #f5f7fa;
    border-radius: 4px;
    font-size: 12px;
    color: #606266;
    p {
      margin: 2px 0;
      line-height: 1.4;
    }
  }
</style>
