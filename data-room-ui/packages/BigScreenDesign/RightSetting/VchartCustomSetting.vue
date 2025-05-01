<template>
  <div class="bs-setting-wrap">
    <el-form
      ref="form"
      :model="config"
      :rules="customRules"
      label-width="120px"
      label-position="left"
      class="setting-body bs-el-form"
    >
      <SettingTitle>基础</SettingTitle>
      <div class="lc-field-body">
        <el-form-item
          label="标题"
          label-width="120px"
        >
          <el-input
            v-model="config.title"
            placeholder="请输入标题"
            clearable
          />
        </el-form-item>
      </div>
      <SettingTitle>边框</SettingTitle>
      <div class="lc-field-body">
         <BorderSetting
          v-if="config.border"
          label-width="120px"
          :config="config.border"
          :bigTitle='config.title'
        />
      </div>
      <SettingTitle>位置</SettingTitle>
      <div class="lc-field-body">
        <PosWhSetting
          label-width="120px"
          :config="config"
        />
      </div>
      <SettingTitle>旋转</SettingTitle>
          <div class="lc-field-body">
            <RotateSetting
              :config="config"
            />
          </div>
          <template v-for="group in groupList">
        <div :key="group.groupName">
          <SettingTitle>   {{ group.groupName | filterGroupName }}</SettingTitle>
          <div class="lc-field-body">
            <div
              v-for="(setting, settingIndex) in group.list"
              :key="settingIndex+1"
            >
              <el-form-item
                :label="setting.type=== 'padding' ? '' : setting.label"
                :label-width="setting.type=== 'padding' ? '0px' :'120px'"
              >
                <el-input
                  v-if="setting.type === 'input'"
                  v-model="setting.value"
                  :placeholder="`请输入${setting.label}`"
                  clearable
                />
                <el-select
                  v-else-if="setting.type === 'select'"
                  v-model="setting.value"
                  popper-class="bs-el-select"
                  class="bs-el-select"
                  :placeholder="`请选择${setting.label}`"
                  :multiple="setting.multiple"
                  clearable
                >
                  <el-option
                    v-for="(opt, optIndex) in setting.options"
                    :key="optIndex"
                    :label="opt.label"
                    :value="opt.value"
                  />
                </el-select>
                <template v-else-if="setting.type === 'colorSelect'">
                  <color-select
                    v-model="setting.value"
                    @update="updateColorScheme"
                  />
                  <div
                    style="
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                  "
                    class="color-picker-box"
                  >
                    <el-color-picker
                      v-for="(colorItem, colorItemIndex) in colors"
                      :key="colorItemIndex"
                      v-model="setting.value[colorItemIndex]"
                      popper-class="bs-el-color-picker"
                      show-alpha
                      class="start-color"
                    />
                    <span
                      class="el-icon-circle-plus-outline"
                      style="color: #007aff; font-size: 20px"
                      @click="addColor"
                    />
                    <span
                      v-if="colors.length"
                      class="el-icon-remove-outline"
                      style="color: #ea0b30; font-size: 20px"
                      @click="delColor()"
                    />
                  </div>
                </template>

                <el-color-picker
                  v-else-if="setting.type === 'colorPicker'"
                  v-model="setting.value"
                  popper-class="bs-el-color-picker"
                  class="bs-el-color-picker"
                  show-alpha
                />
                <el-input-number
                  v-else-if="setting.type === 'inputNumber'"
                  v-model="setting.value"
                  class="bs-el-input-number"
                  :step="setting.step || 1"
                  :min="setting.min || 0"
                  :max="setting.max || 100000"
                />
                <el-radio-group
                  v-else-if="setting.type === 'radio'"
                  v-model="setting.value"
                  class="bs-el-radio-group"
                >
                  <template v-for="(opt, optIndex) in setting.options"   >
                    <el-radio-button
                    :key="optIndex"
                      :label="opt.value"
                    >
                      {{ opt.label }}
                    </el-radio-button>
                  </template>
                </el-radio-group>
                <el-switch
                  v-else-if="setting.type === 'switch'"
                  v-model="setting.value"
                  class="bs-el-switch"
                  :active-value="setting.active"
                  :inactive-value="setting.inactive"
                />
                <el-slider
                  v-else-if="setting.type === 'slider'"
                  v-model="setting.value"
                  :min="0"
                  :max="1"
                  :step="0.01"
                />
                <PaddingSetting
                  v-else-if="setting.type === 'padding'"
                  v-model="setting.value"
                />
              </el-form-item>
            </div>
          </div>
        </div>
      </template>
      <!-- </div> -->
    </el-form>
  </div>
</template>
<script>
import BorderSetting from 'data-room-ui/BigScreenDesign/RightSetting/BorderSetting.vue'
import SettingTitle from 'data-room-ui/SettingTitle/index.vue'
import { chartSettingMixins } from 'data-room-ui/js/mixins/chartSettingMixins'
import ColorSelect from 'data-room-ui/ColorMultipleSelect/index.vue'
// import ColorPicker from 'data-room-ui/ColorPicker/index.vue'
import PaddingSetting from 'data-room-ui/BigScreenDesign/RightSetting/PaddingSetting/index.vue'
import PosWhSetting from 'data-room-ui/BigScreenDesign/RightSetting/PosWhSetting.vue'
import RotateSetting from 'data-room-ui/BigScreenDesign/RightSetting/RotateSetting.vue'
export default {
  name: 'VchartCustomSetting', // 修改组件名称
  components: {
    ColorSelect,
    // ColorPicker,
    PaddingSetting,
    PosWhSetting,
    BorderSetting,
    SettingTitle,
    RotateSetting
  },
  mixins: [chartSettingMixins],
  data () {
    return {
      groupList: []
    }
  },
  filters: {
    filterGroupName (val) {
      const settingGroup = {
        basic: '基础',
        position: '位置',
        graph: '图表',
        rotate: '旋转',
        grid: '网格线',
        legend: '图例',
        xAxis: 'X轴',
        yAxis: 'Y轴',
        padding: '边距',
        label: '标签',
        axis: '坐标轴',
        animation: '动画',
        tooltip: '提示信息',
        other: '其他'
      }
      return settingGroup[val] || val
    }
  },
  computed: {
    config: {
      get () {
        return this.$store.state.bigScreen.activeItemConfig
      },
      set (val) {
        this.$store.commit('bigScreen/changeActiveItemConfig', val)
      }
    },
    appCode: {
      get () {
        return this.$store.state.bigScreen.pageInfo.appCode
      }
    },
    pageCode () {
      return this.$route.query.code
    }
  },
  watch: {
    groupList: {
      // 1、原数组，2、修改后的数组只包含custom，3、合并的时候xy的配置必须放在最前面
      handler (val) {
        const setList = [].concat(...val.map(item => item.list))
        const newSetList = [...this.config.setting, ...setList]
        let newArr = [] // 存新数组
        const hash = {}
        newArr = newSetList.reduce(function (acc, cru, index) {
          if (!hash[cru.field]) {
            hash[cru.field] = { index: index }
            acc.push(cru)
          } else {
            acc.splice(hash[cru.field].index, 1, cru)
          }
          return acc
        }, [])
        this.$store.commit('bigScreen/changeActiveItemConfig', { ...this.config, setting: newArr })
      },
      deep: true
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.groupList = this.groupSetting()
    },
    groupSetting () {
      const settingGroup = {
        graph: [],
        grid: [],
        legend: [],
        axis: [],
        label: [],
        animation: [],
        tooltip: []
      }
      this.config?.setting.forEach(set => {
        // 只分组 custom 标签页的配置项
        if (set.tabName === 'custom' && set.groupName) {
          const groupKey = (set.groupName === 'xAxis' || set.groupName === 'yAxis') ? 'axis' : set.groupName;
          if (!settingGroup[groupKey]) {
            settingGroup[groupKey] = []
          }
          settingGroup[groupKey].push(set)
        }
      })
      // 将分组后的配置转换为数组形式以便 v-for 循环
      return Object.keys(settingGroup)
        .filter(key => settingGroup[key].length > 0) // 过滤空分组
        .map(key => ({
          groupName: key,
          list: settingGroup[key]
        }))
    },
    updateColorScheme (val) {
      this.config.option.colorScheme = val
    },
    addColor () {
      this.setting?.find(item => item.optionField === 'colorScheme').value?.push('#007aff')
    },
    delColor () {
      this.setting?.find(item => item.optionField === 'colorScheme').value?.pop()
    }

  }

}
</script>
<style lang="scss" scoped>
@import '../../assets/style/settingWrap.scss';
  .lc-field-body {
    padding: 12px 16px;
  }
  ::v-deep .el-form-item__label {
    color: var(--bs-el-title) !important;
  }
  ::v-deep .el-input-number__increase{
    border-left: 1px solid #1a1a1a;
  }
  ::v-deep .el-input-number__decrease{
     border-right: 1px solid #1a1a1a;
  }
</style> 