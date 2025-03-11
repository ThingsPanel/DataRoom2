package com.gccloud.dataroom.core.filter;

import com.gccloud.dataroom.core.utils.TenantContext;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.core.annotation.Order;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import javax.annotation.Resource;
import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

/**
 * API密钥和租户处理过滤器
 *
 * @author Your Name
 * @date 2024
 */
@Order(1)
@Component
@Slf4j
public class ApiKeyTenantFilter implements Filter {

    @Resource
    private RestTemplate restTemplate;

    private static final String DEFAULT_API_KEY = "sk_ebde6efe6f240172f689d458df466f22542901f200e16cb3c0ede44c6e677d3f";

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        try {
            // 获取并打印 x-api-key
            String apiKey = request.getHeader("x-api-key");
            log.info("当前请求的 x-api-key: {}", apiKey);
            
            // 如果x-api-key为空，则使用默认值
            if (StringUtils.isBlank(apiKey)) {
                apiKey = DEFAULT_API_KEY;
            }
            
            // 调用获取用户信息的方法
            String tenantId = getUserInfo(apiKey);
            log.info("获取到的 tenant_id: {}", tenantId);
            
            // 将租户ID存储到上下文中
            TenantContext.setTenantId(tenantId);
            
            // 继续过滤器链
            filterChain.doFilter(servletRequest, servletResponse);
        } finally {
            // 清除租户上下文
            TenantContext.clear();
        }
    }

    /**
     * 获取第三方用户信息
     * @param apiKey API密钥
     * @return tenant_id 租户ID，如果获取失败则返回null
     */
    private String getUserInfo(String apiKey) {
        if (StringUtils.isBlank(apiKey)) {
            log.warn("x-api-key 为空，跳过获取用户信息");
            return null;
        }
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("x-api-key", apiKey);
            HttpEntity<?> entity = new HttpEntity<>(headers);
            
            ResponseEntity<String> response = restTemplate.exchange(
                "http://demo.thingspanel.cn/api/v1/user/tenant/id",
                HttpMethod.GET,
                entity,
                String.class
            );
            
            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                JsonObject jsonObject = new Gson().fromJson(response.getBody(), JsonObject.class);
                log.info("获取到的 jsonObject: {}", jsonObject);
                
                // 检查 code 是否为 200
                if (jsonObject.has("code") && jsonObject.get("code").getAsInt() == 200) {
                    // 直接从 data 字段获取字符串值
                    if (jsonObject.has("data")) {
                        String tenantId = jsonObject.get("data").getAsString();
                        log.info("获取到的 tenant_id: {}", tenantId);
                        return tenantId;
                    }
                } else {
                    log.warn("API请求返回错误: code={}, message={}", 
                        jsonObject.has("code") ? jsonObject.get("code").getAsString() : "未知",
                        jsonObject.has("message") ? jsonObject.get("message").getAsString() : "未知");
                }
            }
        } catch (Exception e) {
            log.error("获取用户信息失败", e);
        }
        return null;
    }
} 