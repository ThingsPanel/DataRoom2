package com.gccloud.dataset.entity.config;

import com.gccloud.dataset.constant.DatasetConstant;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.Map;

/**
 * 物联网平台数据集配置
 * @author hongyang
 * @version 1.0
 * @date 2023/6/1 10:43
 */
@Data
public class IotDataSetConfig extends BaseDataSetConfig {

    @ApiModelProperty("数据集类型")
    private String datasetType = DatasetConstant.DataSetType.IOT;

    @ApiModelProperty(value = "用户自定义json")
    private Map<String, Object> userDefinedJson;
} 