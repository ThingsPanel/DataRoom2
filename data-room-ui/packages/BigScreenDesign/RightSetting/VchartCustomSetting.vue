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
          <SettingTitle>图表样式</SettingTitle>
          <div class="lc-field-body">
             <!-- 固定显示：主题选择 -->
             <el-form-item label="主题选择">
               <el-select
                 v-model="themeValue" 
                 popper-class="bs-el-select"
                 class="bs-el-select"
                 placeholder="请选择主题"
                 clearable
               >
                 <el-option
                   v-for="(opt, optIndex) in vchartThemes"
                   :key="optIndex"
                   :label="opt.label"
                   :value="opt.value"
                 />
               </el-select>
             </el-form-item>
             
             <!-- 固定显示：Option 覆盖 -->
             <el-form-item label="Option 覆盖 (JSON)">
                <el-input
                  type="textarea"
                  v-model="overrideValue"
                  :rows="5" 
                  placeholder="请输入有效的 JSON 覆盖配置"
                />
             </el-form-item>
          </div>
          <template v-for="group in groupList">
        <div :key="group.groupName">
          <SettingTitle>   {{ group.groupName | filterGroupName }}</SettingTitle>
          <div class="lc-field-body">
            <div
              v-for="(setting, settingIndex) in group.list"
              :key="settingIndex+1"
            >
              <!-- 排除已固定显示的配置 -->
              <template v-if="setting.field !== 'chartTheme' && setting.field !== 'optionOverride'">
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
                     <el-form-item
                        v-else-if="setting.type === 'textarea'"
                       :label="setting.label"
                       label-width="120px"
                     >
                       <el-input
                         type="textarea"
                         v-model="setting.value"
                         :rows="5" 
                         :placeholder="`请输入 ${setting.label}`"
                       />
                     </el-form-item>
                  </el-form-item>
              </template>
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
import cloneDeep from 'lodash/cloneDeep'

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
      groupList: [],
      vchartThemes: [
        { label: '亮色 (默认)', value: 'light' },
        { label: '暗色', value: 'dark' },
        { label: '大屏-火山蓝', value: 'vScreenVolcanoBlue' },
        { label: '大屏-清新蜡笔', value: 'vScreenClean' },
        { label: '大屏-郊外', value: 'vScreenOutskirts' },
        { label: '大屏-汽车蓝橙', value: 'vScreenBlueOrange' },
        { label: '大屏-金融黄', value: 'vScreenFinanceYellow' },
        { label: '大屏-文旅青', value: 'vScreenWenLvCyan' },
        { label: '大屏-电力绿', value: 'vScreenElectricGreen' },
        { label: '大屏-电商紫', value: 'vScreenECommercePurple' },
        { label: '大屏-红蓝', value: 'vScreenRedBlue' },
        { label: '大屏-党建红', value: 'vScreenPartyRed' },
        { label: 'Arco-亮色', value: 'arcoDesignLight' },
        { label: 'Arco-暗色', value: 'arcoDesignDark' },
        { label: 'Semi-亮色', value: 'semiDesignLight' },
        { label: 'Semi-暗色', value: 'semiDesignDark' },
        // ...可以继续添加其他主题
      ]
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
    },
    // 计算属性：获取或设置主题值
    themeValue: {
      get() {
        const setting = this.config?.setting?.find(s => s.field === 'chartTheme');
        return setting ? setting.value : 'light'; // 默认 'light'
      },
      set(newValue) {
        const newConfig = cloneDeep(this.config);
        let setting = newConfig.setting?.find(s => s.field === 'chartTheme');
        if (setting) {
          setting.value = newValue;
        } else {
          // 如果 setting 不存在，则创建并添加到数组
          if (!newConfig.setting) {
              newConfig.setting = [];
          }
          newConfig.setting.push({
            label: '主题选择',
            type: 'select',
            field: 'chartTheme',
            optionField: 'theme',
            value: newValue,
            options: this.vchartThemes, // 引用完整的列表
            tabName: 'custom',
            groupName: 'graph'
          });
        }
        this.$store.commit('bigScreen/changeActiveItemConfig', newConfig);
      }
    },
    // 计算属性：获取或设置 Option 覆盖值
    overrideValue: {
      get() {
        const setting = this.config?.setting?.find(s => s.field === 'optionOverride');
        return setting ? setting.value : '{}'; // 默认 '{}'
      },
      set(newValue) {
        const newConfig = cloneDeep(this.config);
        let setting = newConfig.setting?.find(s => s.field === 'optionOverride');
        if (setting) {
          setting.value = newValue;
        } else {
          // 如果 setting 不存在，则创建并添加到数组
          if (!newConfig.setting) {
              newConfig.setting = [];
          }
          newConfig.setting.push({
            label: 'Option 覆盖 (JSON)',
            type: 'textarea',
            field: 'optionOverride',
            value: newValue,
            tabName: 'custom',
            groupName: 'graph'
          });
        }
         this.$store.commit('bigScreen/changeActiveItemConfig', newConfig);
      }
    }
  },
  watch: {
    // !! 恢复对 groupList 的 watch，以同步动态配置项的更改 !!
    groupList: {
      handler (newGroupList) {
        // 从 groupList 中提取所有 setting 项
        const currentSettings = newGroupList.flatMap(group => group.list);
        
        // 获取 config 的深拷贝以进行修改
        const newConfig = cloneDeep(this.config);
        
        // 确保 newConfig.setting 是数组
        if (!Array.isArray(newConfig.setting)) {
          newConfig.setting = [];
        }
        
        // 更新或添加 currentSettings 中的每一项到 newConfig.setting
        currentSettings.forEach(currentSet => {
          const index = newConfig.setting.findIndex(s => s.field === currentSet.field);
          if (index !== -1) {
            // 如果找到了，更新现有的项 (确保响应性)
            Vue.set(newConfig.setting, index, currentSet);
          } else {
            // 如果没找到 (理论上不应该发生，因为 groupList 来自 config.setting)，
            // 但为了健壮性，可以考虑添加回去，尽管这可能不是预期行为。
            // 暂时不添加，因为 groupSetting 已过滤
             console.warn(`Setting with field '${currentSet.field}' from groupList not found in config.setting during watch.`);
          }
        });
        
        // 提交更新后的 config 到 Vuex
        this.$store.commit('bigScreen/changeActiveItemConfig', newConfig);
      },
      deep: true // 必须深度监听才能检测到 setting.value 的变化
    }
  },
  mounted () {
    // 确保在访问 config 前，config 存在
    if (this.config) {
       this.init()
    } else {
      console.warn('VchartCustomSetting mounted: this.config is initially null or undefined.');
      // 可以考虑在这里添加一个监听器，等待 config 加载后再初始化
      // 或者依赖 Vue 的响应式系统，在 config 更新后自动触发 computed 和 watch
    }
    // 移除 EchartsCustomSetting 中的遗留逻辑
    /*
    const groupNameList = []
    this.config?.setting?.filter(
      (item) => item.tabName === 'custom'
    ).forEach(item => {
      // ... (removed legacy grouping logic) ...
    })
    for (let i = 0; i < this.groupList.length; i++) {
       // ... (removed legacy sorting logic) ...
    }
    */
  },
  methods: {
    init () {
      // groupSetting 内部已有 config?.setting 的检查，但再次确认 config 存在
      if (this.config) {
        this.groupList = this.groupSetting()
      } else {
         console.warn('VchartCustomSetting init: Cannot group settings because this.config is null or undefined.');
         this.groupList = []; // 重置 groupList
      }
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
      // !! 确保在访问 setting 前检查 config 是否存在 !!
      if (!this.config || !this.config.setting) {
           console.warn('VchartCustomSetting groupSetting: this.config or this.config.setting is missing.');
           return []; // 返回空数组，避免错误
      }
      
      this.config.setting.forEach(set => {
        // !! 新增: 过滤掉固定显示的字段 !!
        if (set.field === 'chartTheme' || set.field === 'optionOverride') {
            return; // 跳过这两个字段
        }

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