package com.gccloud.dataroom.core.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * ThingsPanel API 配置属性
 *
 * @author Your Name
 * @date 2024
 */
@Data
@Component
@ConfigurationProperties(prefix = "thingspanel.api")
public class ThingsPanelApiProperties {

    /**
     * ThingsPanel API 基础URL
     */
    private String baseUrl = "http://demo.thingspanel.cn";

    /**
     * 获取租户ID的接口路径
     */
    private String tenantIdPath = "/api/v1/user/tenant/id";

    /**
     * 获取完整的租户ID接口URL
     * @return 完整URL
     */
    public String getTenantIdUrl() {
        return baseUrl + tenantIdPath;
    }
} 