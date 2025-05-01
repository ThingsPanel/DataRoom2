import { dataConfig, settingConfig } from '../VchartRender/settingConfig' // 1. Ensure uncommented
import cloneDeep from 'lodash/cloneDeep'
import sortList from './vchartListSort'

const files = require.context('./', true, /[一-龥]+.js$/)
const vchartList = getVchartList(files)

function getVchartList (files) {
  const configMapList = {}
  files.keys().forEach((key) => {
    const parts = key.split('/');
    if (parts.length > 2) {
      const configName = parts[parts.length - 1].replace('.js', '');
      try {
        const module = files(key);
        if (module && module.default) {
          configMapList[configName] = module.default;
        } else {
          console.warn(`Module or default export not found for key: ${key}`);
        }
      } catch (error) {
        console.error(`Error loading module for key ${key}:`, error);
      }
    } else {
      console.warn(`Unexpected key format in require.context: ${key}`);
    }
  })

  const list = []
  for (const configMapKey in configMapList) {
    const index = sortList.findIndex((item) => item === configMapKey)
    const componentConfig = configMapList[configMapKey] // Original component config

    if (!componentConfig) {
      console.warn(`Skipping invalid config for key: ${configMapKey}`);
      continue;
    }

    // --- Configuration Assembly --- 
    // Use deep clones to prevent cross-component pollution
    const baseOption = componentConfig.option ? cloneDeep(componentConfig.option) : {};
    const componentSetting = componentConfig.setting ? cloneDeep(componentConfig.setting) : [];
    const globalSettingConf = cloneDeep(settingConfig); // 2a. Clone global settingConfig
    const globalDataConf = cloneDeep(dataConfig);       // 2a. Clone global dataConfig

    // 2b. Merge base option with global settingConfig (contains initial displayOption)
    // Start with global, overlay with component-specific options
    let finalOption = {
      ...globalSettingConf,
      ...baseOption
    };

    // !! New logic: Store default data in rawData !!
    let defaultDataValues = [];
    let defaultDataId = 'defaultDataId'; // Fallback ID
    if (baseOption.data && Array.isArray(baseOption.data) && baseOption.data.length > 0) {
        // Clone values to prevent mutation issues if baseOption wasn't deep cloned perfectly earlier
        defaultDataValues = baseOption.data[0].values ? cloneDeep(baseOption.data[0].values) : [];
        defaultDataId = baseOption.data[0].id || defaultDataId;
        // Set finalOption.data to only contain the ID
        finalOption.data = [{ id: defaultDataId }];
    } else {
        // If baseOption.data is missing or invalid, initialize data structure
         finalOption.data = [{ id: defaultDataId }];
    }
    // Assign default values (or empty array) to rawData
    finalOption.rawData = defaultDataValues;

    // Ensure finalOption.displayOption exists and is an object
    if (!finalOption.displayOption || typeof finalOption.displayOption !== 'object') {
        finalOption.displayOption = {}; // Initialize if missing
    }
     // Ensure it merges correctly if baseOption also had displayOption (unlikely but safe)
     finalOption.displayOption = { ...(globalSettingConf.displayOption || {}), ...(baseOption.displayOption || {}), ...finalOption.displayOption };

    // 3. *Override* displayOption.multiple based on componentSetting
    if (Array.isArray(componentSetting)) {
      componentSetting.forEach(settingItem => {
        if (settingItem.tabName === 'data' && settingItem.optionField && settingItem.multiple !== undefined) {
          let displayOptionKey = null;
          // Map component setting optionField to displayOption key
          switch (settingItem.optionField) {
            case 'xField':         displayOptionKey = 'dimensionField'; break;
            case 'yField':         displayOptionKey = 'metricField';    break;
            case 'seriesField':    displayOptionKey = 'seriesField';    break;
            // Add other mappings if necessary
          }

          if (displayOptionKey && finalOption.displayOption[displayOptionKey]) {
            // Ensure the target object within displayOption exists
            if (typeof finalOption.displayOption[displayOptionKey] !== 'object') {
                 finalOption.displayOption[displayOptionKey] = {};
            }
            // Override the 'multiple' property
            finalOption.displayOption[displayOptionKey].multiple = settingItem.multiple;
            // console.log(`vchartList (${configMapKey}): Overrode ${displayOptionKey}.multiple to ${settingItem.multiple}`); // Optional debug log
          } else if (displayOptionKey) {
              // If the key (e.g., dimensionField) doesn't exist in displayOption yet, create it.
              finalOption.displayOption[displayOptionKey] = { multiple: settingItem.multiple };
              // console.log(`vchartList (${configMapKey}): Initialized ${displayOptionKey} with multiple: ${settingItem.multiple}`); // Optional debug log
          }
        }
      });
    }

    // 4. Assemble the final config object
    // 嵌入comType到option里
    finalOption.comType = componentConfig.comType || 'vchartComponent';
    const finalConfig = {
      version: componentConfig.version || 'unknown',
      category: configMapKey,
      name: componentConfig.name || configMapKey,
      title: componentConfig.title || configMapKey,
      border: componentConfig.border || { type: '', titleHeight: 60, fontSize: 30, color: ['#5B8FF9'], padding: [16] }, // Simplified default
      icon: componentConfig.icon || null,
      img: (() => {
          try {
             const imgName = componentConfig.title || componentConfig.name || configMapKey;
             return require(`../Vcharts/images/${imgName}.png`);
           }
          catch (e) { /* console.warn(`Image not found for ${imgName}`); */ return null; }
      })(),
      className: componentConfig.className || 'com.gccloud.dataroom.core.module.chart.components.CustomComponentChart',
      w: componentConfig.w ?? baseOption?.width ?? 450,
      h: componentConfig.h ?? baseOption?.height ?? 320,
      x: componentConfig.x ?? 0,
      y: componentConfig.y ?? 0,
      rotateX: componentConfig.rotateX ?? 0,
      rotateY: componentConfig.rotateY ?? 0,
      rotateZ: componentConfig.rotateZ ?? 0,
      perspective: componentConfig.perspective ?? 0,
      skewX: componentConfig.skewX ?? 0,
      skewY: componentConfig.skewY ?? 0,
      type: componentConfig.type || 'customComponent', // 这里用组件自身的type
      loading: false,
      option: finalOption,        // Use the processed finalOption (contains rawData)
      setting: componentSetting,  // Use the cloned componentSetting
      dataHandler: componentConfig.dataHandler || '',
      optionHandler: componentConfig.optionHandler || '',
      chartType: componentConfig.chartType , // 新增，优先用组件自身
      // 2c. Merge global dataConfig properties to the top level
      ...( (typeof globalDataConf === 'object' && globalDataConf !== null) ? globalDataConf : {} )
    };

    // Add to list respecting sort order
    if (index !== -1) {
      while (list.length <= index) { list.push(undefined); }
      list[index] = finalConfig;
    } else {
      list.push(finalConfig);
    }
  }
  return list.filter(item => !!item); // Filter out empty slots more concisely
}

export default vchartList 