package com.gccloud.dataroom.core.module.chart.components.datasource;

import com.fasterxml.jackson.annotation.JsonTypeInfo;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * 图表数据源
 * @author liuchengbiao
 * @version 1.0
 * @date 2022/8/8 15:11
 */
@Data
@JsonTypeInfo(use = JsonTypeInfo.Id.CLASS, include = JsonTypeInfo.As.PROPERTY, property = "className")
public abstract class BaseChartDataSource {

    @ApiModelProperty(notes="是否轮询")
    private Boolean polling;

    @ApiModelProperty(notes = "轮询间隔(毫秒)")
    private String pollingInterval;
    
    @ApiModelProperty(notes = "定时器Id")
    private String pollTimer;

}
