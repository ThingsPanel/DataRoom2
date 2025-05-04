<template>
  <div class="bs-setting-wrap">
    <el-form
      v-if="config && config.setting"
      ref="form"
      :model="config"
      label-width="100px"
      label-position="left"
      class="setting-body bs-el-form"
    >
      <!-- Iterate through grouped settings -->
      <template v-for="group in groupList">
        <div :key="group.groupName">
          <SettingTitle>{{ getGroupName(group.groupName) }}</SettingTitle>
          <div class="lc-field-body">
            <!-- Iterate through settings within the group -->
            <div
              v-for="(setting, settingIndex) in group.list"
              :key="setting.field || settingIndex"
            >
              <el-form-item
                :label="setting.label"
                :label-width="'100px'"
              >
                <!-- Input -->
                <el-input
                  v-if="setting.type === 'input'"
                  v-model="setting.value"
                  :placeholder="`请输入${setting.label}`"
                  clearable
                />
                <!-- Select -->
                <el-select
                  v-else-if="setting.type === 'select'"
                  v-model="setting.value"
                  popper-class="bs-el-select"
                  class="bs-el-select"
                  :placeholder="`请选择${setting.label}`"
                  :multiple="setting.multiple || false"
                  clearable
                >
                  <el-option
                    v-for="(opt, optIndex) in setting.options"
                    :key="optIndex"
                    :label="opt.label"
                    :value="opt.value"
                  />
                </el-select>
                <!-- Switch -->
                 <el-switch
                    v-else-if="setting.type === 'switch'"
                    v-model="setting.value"
                    class="bs-el-switch"
                    :active-value="setting.activeValue !== undefined ? setting.activeValue : true"
                    :inactive-value="setting.inactiveValue !== undefined ? setting.inactiveValue : false"
                  />
                <!-- Input Number -->
                 <el-input-number
                    v-else-if="setting.type === 'inputNumber'"
                    v-model="setting.value"
                    class="bs-el-input-number"
                    :step="setting.step || 1"
                    :min="setting.min === undefined ? -Infinity : setting.min"
                    :max="setting.max === undefined ? Infinity : setting.max"
                    controls-position="right"
                    style="width: 100%;"
                  />
                <!-- Color Picker -->
                <el-color-picker
                  v-else-if="setting.type === 'colorPicker'"
                  v-model="setting.value"
                  popper-class="bs-el-color-picker"
                  class="bs-el-color-picker"
                  show-alpha
                />
                 <!-- Slider -->
                 <el-slider
                     v-else-if="setting.type === 'slider'"
                     v-model="setting.value"
                     :min="setting.min === undefined ? 0 : setting.min"
                     :max="setting.max === undefined ? 1 : setting.max"
                     :step="setting.step === undefined ? 0.01 : setting.step"
                     show-input
                     :show-input-controls="false"
                     input-size="mini"
                   />
                <!-- Textarea for JSON overrides etc. -->
                 <el-input
                   v-else-if="setting.type === 'textarea'"
                   v-model="setting.value"
                   type="textarea"
                   :rows="setting.rows || 3"
                   :placeholder="`请输入${setting.label}`"
                 />
                <!-- Fallback for unknown types -->
                <span v-else>不支持的类型: {{ setting.type }}</span>
              </el-form-item>
            </div>
          </div>
        </div>
      </template>

    </el-form>
    <div v-else class="empty-tip">
      请先选中一个 VChart 图表组件，或检查其配置。
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import _ from 'lodash'; // 使用 lodash 进行 debounce
import cloneDeep from 'lodash/cloneDeep';
import SettingTitle from 'data-room-ui/SettingTitle/index.vue';

// VChart 主题列表 (保持不变)
const vchartThemesList = [
   { label: '亮色 (默认)', value: 'light' },
   { label: '暗色', value: 'dark' },
   { label: '大屏-火山蓝', value: 'vScreenVolcanoBlue' },
   // ... (其他主题保持不变)
   { label: 'Semi-暗色', value: 'semiDesignDark' },
 ];

// Mapping for group names (similar to G2CustomSetting filter)
const settingGroupMap = {
  basic: '基础配置',
  style: '图表样式',
  legend: '图例',
  axes: '坐标轴',
  axis: '坐标轴', // Allow singular 'axis'
  xAxis: 'X轴',
  yAxis: 'Y轴',
  grid: '网格线',
  tooltip: '提示信息',
  label: '标签',
  itemStyle: '图形样式',
  lineStyle: '线条样式',
  areaStyle: '区域样式',
  interaction: '交互',
  animation: '动画',
  markPoint: '标记点',
  markLine: '标记线',
  markArea: '标记区域',
  data: '数据字段', // Added for data mapping fields
  other: '其他'
};

export default {
  name: 'VchartCustomSetting',
  // 注册使用的组件
  components: {
    SettingTitle // Custom title component
  },
  data() {
    return {
      vchartThemes: vchartThemesList,
      debouncedCommit: null,
      // 用于内部操作的配置副本，避免直接修改 prop
      internalConfig: null,
      groupList: [] // To store grouped settings for rendering
    };
  },
  computed: {
    // 从 Vuex 获取激活项配置
    ...mapState('bigScreen', {
      activeConfig: state => state.activeItemConfig
    }),

    // 提供给模板使用的 config，只读
    config() {
      return this.internalConfig;
    },

    // 计算属性：处理主题值
    chartThemeValue: {
      get() {
        if (!this.internalConfig || !this.internalConfig.setting) {
          return 'light'; // 默认值
        }
        // 从当前 internalConfig 的 setting 中查找主题值
        const setting = this.internalConfig.setting.find(s => s.field === 'chartTheme');
        return setting ? setting.value : 'light'; // 默认值
      },
      set(newValue) {
        // --- Log Point 1 ---
        console.log('[chartThemeValue set] Start - Current internalConfig.option:', JSON.stringify(this.internalConfig?.option, null, 2));
        // 使用防抖函数提交更改
        this.updateSettingValue('chartTheme', newValue, {
          label: '主题选择',
          type: 'select', // 类型信息，虽然这里不渲染，但保持一致性
          optionField: 'theme', // 对应的 VChart Spec 字段
          options: this.vchartThemes, // 选项列表
          tabName: 'custom', // 分类
          groupName: 'graph', // 分组
        });
      },
    },
  },
  watch: {
    // 监听外部 activeConfig 的变化来更新 internalConfig
    activeConfig: {
      handler(newVal) {
        // --- Log Point 2 ---
         console.log('[Watcher activeConfig] Received newVal.option:', JSON.stringify(newVal?.option, null, 2));
         // 深度克隆以创建独立的内部副本
        if (!newVal || !newVal.setting) {
          this.internalConfig = cloneDeep(newVal); // Clone even if setting is missing
          this.groupList = []; // Reset group list
          console.log('[Watcher activeConfig] newVal or setting missing, internalConfig reset.');
          return;
        }
        // Deep clone to create an independent internal copy
        this.internalConfig = cloneDeep(newVal);
        console.log('[Watcher activeConfig] Initialized internalConfig.option:', JSON.stringify(this.internalConfig?.option, null, 2));
        this.updateGroupList(); // Update the group list based on the new internalConfig
      },
      deep: true,
      immediate: true // 立即执行以进行初始化
    },
    // Watch internalConfig to trigger debounced commit on changes
    // Note: This might be less performant than @change but simpler for direct v-model
    internalConfig: {
       handler(newVal, oldVal) {
          // Avoid triggering commit on initial load or when activeConfig changes externally
          // Check if oldVal exists and if newVal is different from oldVal
          // Also check if newVal exists to prevent errors
          if (oldVal && newVal && !_.isEqual(newVal, oldVal)) {
              // Ensure debouncedCommit exists before calling
               if (this.debouncedCommit) {
                   console.log('[Watcher internalConfig] Change detected, calling debouncedCommit.');
                   // Pass a clone to the commit function to avoid race conditions
                   // with further modifications before debounce timeout
                   this.debouncedCommit(cloneDeep(newVal));
               }
          }
       },
       deep: true
    }
  },
  created() {
    // 创建防抖提交函数
    this.debouncedCommit = _.debounce((configToCommit) => {
      // 获取最新的 Vuex 状态作为参照
      const currentActiveConfig = this.$store.state.bigScreen.activeItemConfig;
       // --- Log Point 6 ---
       console.log('[Debounced Commit] Start - Received config.option:', JSON.stringify(configToCommit?.option, null, 2));
       console.log('[Debounced Commit] Start - Current Vuex activeConfig.option:', JSON.stringify(currentActiveConfig?.option, null, 2));

      // --- 配置保留和一致性检查 ---
      if (configToCommit && currentActiveConfig) {
        // 1. 确保 option 对象存在
        if (!configToCommit.option) {
            // console.warn('[Debounced Commit] configToCommit.option was missing, initializing.');
            configToCommit.option = {};
        }

        // 2. Preserve essential root properties from Vuex state if missing in commit data
        const rootPropsToPreserve = ['code', 'type', 'chartType', 'title', 'w', 'h', 'x', 'y', 'z', 'rotate', 'option', 'setting', 'data', 'dataSource', 'refreshTime', 'border'];
        rootPropsToPreserve.forEach(prop => {
            // Check if property exists in currentActiveConfig but not in configToCommit
            if ((prop in currentActiveConfig) && !(prop in configToCommit)) {
                configToCommit[prop] = cloneDeep(currentActiveConfig[prop]);
                console.warn(`[Debounced Commit] Restored missing root property '${prop}' from current Vuex state.`);
            }
        });


        // 3. 保留 option.data 结构 (crucial)
        const currentOptionData = currentActiveConfig.option?.data;
        if (Array.isArray(currentOptionData)) { // Check if current data is a valid array
          // Only restore if incoming data is missing or invalid
          if (!Array.isArray(configToCommit.option.data) || configToCommit.option.data.length === 0 ) {
            console.warn('[Debounced Commit] Restoring config.option.data from current Vuex state:', JSON.stringify(currentOptionData));
            configToCommit.option.data = cloneDeep(currentOptionData);
          }
        } else if (!Array.isArray(configToCommit.option.data)){ // Ensure incoming data is at least an array if current is invalid
           console.warn('[Debounced Commit] Ensuring config.option.data is array when Vuex state has no valid data.');
           configToCommit.option.data = [];
        }

        // 4. Preserve rawData if it exists in Vuex state and not in commit data
        const currentRawData = currentActiveConfig.data?.rawData; // Assuming rawData is at root level now based on G2 example
         if (Array.isArray(currentRawData)) {
             // Only restore if incoming rawData is missing or invalid
             if (!Array.isArray(configToCommit.data?.rawData)) {
                 console.warn('[Debounced Commit] Restoring config.data.rawData from current Vuex state.');
                 if (!configToCommit.data) { configToCommit.data = {}; } // Ensure data object exists
                 configToCommit.data.rawData = cloneDeep(currentRawData);
             }
         }


        // 5. 确保 option.theme 与 setting 中的 chartTheme 一致
        const themeSetting = configToCommit.setting?.find(s => s.field === 'chartTheme');
        const themeValueFromSetting = themeSetting ? themeSetting.value : 'light'; // Default theme
        // Ensure option exists before accessing theme
        if (!configToCommit.option) configToCommit.option = {};
        if (configToCommit.option.theme !== themeValueFromSetting) {
            console.warn(`[Debounced Commit] Forcing option.theme ('${configToCommit.option.theme}') to match setting value ('${themeValueFromSetting}').`);
            configToCommit.option.theme = themeValueFromSetting;
        }

        // 6. Ensure essential chart types are present
         if (!configToCommit.type && currentActiveConfig.type) {
             configToCommit.type = currentActiveConfig.type;
             console.warn('[Debounced Commit] Restored missing type.');
         }
         if (!configToCommit.chartType && currentActiveConfig.chartType) {
             configToCommit.chartType = currentActiveConfig.chartType;
             console.warn('[Debounced Commit] Restored missing chartType.');
         }


      } else {
         console.error('[Debounced Commit] Cannot perform checks: configToCommit or currentActiveConfig is missing.');
         return; // Avoid committing if essential data is missing
      }

      // --- Log Point 7 ---
      console.log('[Debounced Commit] Committing final config.option:', JSON.stringify(configToCommit?.option, null, 2));
      // --- 提交到 Vuex ---
      this.$store.commit('bigScreen/changeActiveItemConfig', configToCommit);

    }, 400); // 400ms 延迟

     // 组件销毁时取消 debounce
     this.$on('hook:beforeDestroy', () => {
       if (this.debouncedCommit) {
         this.debouncedCommit.cancel();
       }
     });
  },
  methods: {
    // 统一处理 setting 值更新并触发防抖 commit
    updateSettingValue(field, newValue, settingTemplate) {
       // --- Log Point 4 ---
      console.log('[updateSettingValue] Start - Current internalConfig.option:', JSON.stringify(this.internalConfig?.option, null, 2));
      // 必须操作 internalConfig 的副本
      if (!this.internalConfig) {
          console.error('Cannot update setting: internalConfig is null.');
          return;
      }

      // 创建一个新的副本进行修改
      const newConfig = cloneDeep(this.internalConfig);

      // 确保 setting 数组存在
      if (!Array.isArray(newConfig.setting)) {
          newConfig.setting = [];
      }

      let settingIndex = newConfig.setting.findIndex(s => s.field === field);

      if (settingIndex !== -1) {
        // 如果存在，直接更新值
        newConfig.setting[settingIndex].value = newValue;
      } else {
        // 如果不存在，使用模板创建新设置项并添加
        const newSetting = { ...settingTemplate, field: field, value: newValue };
        newConfig.setting.push(newSetting);
      }

      // 更新内部状态，这样 getter 能立刻反映变化
      this.internalConfig = newConfig; // 更新内部状态以反映 set 操作

      // 调用防抖提交，传递修改后的副本
      const configToCommit = cloneDeep(newConfig);
       // --- Log Point 5 ---
      console.log('[updateSettingValue] Calling debouncedCommit with config.option:', JSON.stringify(configToCommit?.option, null, 2));
      this.debouncedCommit(configToCommit); // 传递新副本给 debounce
    },
     // Method to update the groupList based on internalConfig.setting
     updateGroupList() {
        // Ensure internalConfig and its setting array exist
        if (!this.internalConfig || !Array.isArray(this.internalConfig.setting)) {
            this.groupList = [];
            console.log('[updateGroupList] internalConfig or setting missing, groupList cleared.');
            return;
        }

        const groups = {};
        // Filter for settings intended for the 'custom' tab and have a groupName
        this.internalConfig.setting
            .filter(item => item.tabName === 'custom' && item.groupName)
            .forEach(item => {
                const groupName = item.groupName || 'other'; // Assign to 'other' if groupName is missing
                if (!groups[groupName]) {
                    groups[groupName] = {
                        groupName: groupName,
                        list: []
                    };
                }
                groups[groupName].list.push(item);
            });

        // Convert groups object to array and sort (e.g., 'basic' first, 'other' last)
        const sortedGroupList = Object.values(groups).sort((a, b) => {
            if (a.groupName === 'basic') return -1;
            if (b.groupName === 'basic') return 1;
            if (a.groupName === 'other') return 1;
            if (b.groupName === 'other') return -1;
            // Optional: Alphabetical sort for other groups
            // Use localeCompare for robust string comparison
            return a.groupName.localeCompare(b.groupName);
        });

        this.groupList = sortedGroupList;
         console.log('[updateGroupList] Generated groupList:', this.groupList);
     },

    // Helper to get display name for group
    getGroupName(technicalName) {
      return settingGroupMap[technicalName] || technicalName; // Fallback to technical name if no mapping
    }
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/style/settingWrap.scss'; // Common styles

.bs-setting-wrap {
  height: 100%;
  overflow-y: auto;
  padding: 0 10px; // Adjust padding as needed
}

.setting-body {
  padding: 10px 0;
}

.lc-field-body {
  padding: 12px 16px;
}

.el-form-item {
  margin-bottom: 12px !important; // Consistent spacing
}

.bs-el-select,
.bs-el-input-number,
.bs-el-switch,
.bs-el-color-picker {
  width: 100%; // Make controls take full width
}
// Ensure slider input is reasonably sized
::v-deep .el-slider__input {
    width: 80px;
}
::v-deep .el-slider__runway.show-input {
    margin-right: 100px;
}


.empty-tip {
  text-align: center;
  color: #999;
  margin-top: 20px;
  padding: 20px;
}

// Add specific styles for color picker if needed
// ::v-deep .el-color-picker__trigger { ... }
</style>

