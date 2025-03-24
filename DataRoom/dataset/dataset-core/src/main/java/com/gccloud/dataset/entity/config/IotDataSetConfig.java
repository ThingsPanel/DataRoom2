package com.gccloud.dataset.entity.config;

import com.gccloud.dataset.constant.DatasetConstant;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;
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

    @ApiModelProperty(value = "请求地址")
    private String url;

    @ApiModelProperty(value = "请求类型 GET POST")
    private String method;

    @ApiModelProperty(value = "请求方式 前端 后端")
    private String requestType;

    @ApiModelProperty(value = "设备ID")
    private String device_id;

    @ApiModelProperty(value = "数据类型")
    private String data_type;

    @ApiModelProperty(value = "数据模式")
    private String data_mode;

    @ApiModelProperty(value = "属性键名")
    private String key;

    @ApiModelProperty(value = "请求头")
    private List<Map<String, Object>> headers;

    @ApiModelProperty(value = "请求参数")
    private List<Map<String, Object>> params;

    @ApiModelProperty(value = "字段描述")
    private Map<String, Object> fieldDesc;

    @ApiModelProperty(value = "刷新频率(秒)")
    private Integer refreshRate;
    
    @ApiModelProperty(value = "是否启用自动刷新")
    private Boolean autoRefresh;
} 