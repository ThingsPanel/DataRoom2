package com.gccloud.dataroom.core.filter;

import com.baomidou.mybatisplus.core.config.GlobalConfig;
import com.gccloud.common.vo.R;
import com.gccloud.dataroom.core.config.DataRoomConfig;
import com.gccloud.dataroom.core.config.bean.DemoEnv;
import com.gccloud.dataroom.core.utils.TenantContext;
import com.google.common.collect.Sets;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.client.RestTemplate;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Set;

/**
 * 演示环境
 *
 * @author liuchengbiao
 * @date 2021年07月28日17:31:33
 */
@Order(2)
@Component
@Slf4j
@ConditionalOnProperty(prefix = "gc.starter.demoEnv", name = "enable", havingValue = "true")
public class DemoEnvFilter implements Filter {

    @Resource
    private DataRoomConfig dataRoomConfig;

    @Resource
    private RestTemplate restTemplate;

    /**
     * 系统默认的post请求放行接口
     */
    private static final Set<String> POST_URL_PASS_SET = Sets.newHashSet(
            "/dataroom/design",
            "/dataroom/file",
            "/datasource/"
    );


    @PostConstruct
    public void init() {
        log.info("启动演示环境过滤器，用于保证演示环境的稳定性，仅允许指定的一些接口请求访问，可通过gc.starter.demoEnv.enable 设置是否禁用");
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        try {
            // 获取并打印 x-api-key
            String apiKey = request.getHeader("x-api-key");
            log.info("当前请求的 x-api-key: {}", apiKey);
            // 如果x-api-key为空，则默认sk_ebde6efe6f240172f689d458df466f22542901f200e16cb3c0ede44c6e677d3f
            if (StringUtils.isBlank(apiKey)) {
                apiKey = "sk_ebde6efe6f240172f689d458df466f22542901f200e16cb3c0ede44c6e677d3f";
            }
            // 调用获取用户信息的方法
            String tenantId = getUserInfo(apiKey);
            log.info("获取到的 tenant_id: {}", tenantId);
            
            // 将租户ID存储到上下文中
            TenantContext.setTenantId(tenantId);

            String method = request.getMethod();
            if (StringUtils.equalsAnyIgnoreCase(RequestMethod.GET.toString(), method)
                    || StringUtils.equalsAnyIgnoreCase(RequestMethod.OPTIONS.toString(), method)) {
                filterChain.doFilter(servletRequest, servletResponse);
                return;
            }
            String uri = request.getServletPath();
            DemoEnv demoEnv = dataRoomConfig.getDemoEnv();
            for (String startWithUrl : demoEnv.getStartWithUrlPassSet()) {
                if (uri.startsWith(startWithUrl)) {
                    filterChain.doFilter(servletRequest, servletResponse);
                    return;
                }
            }
            if (StringUtils.equalsAnyIgnoreCase(RequestMethod.POST.toString(), method) && (demoEnv.getPostUrlPassSet().contains(uri) || POST_URL_PASS_SET.contains(uri))) {
                filterChain.doFilter(servletRequest, servletResponse);
                return;
            } else if (StringUtils.equalsAnyIgnoreCase(RequestMethod.PUT.toString(), method) && demoEnv.getPutUrlPassSet().contains(uri)) {
                filterChain.doFilter(servletRequest, servletResponse);
                return;
            } else if (StringUtils.equalsAnyIgnoreCase(RequestMethod.DELETE.toString(), method) && (demoEnv.getDeleteUrlPassSet().contains(uri))) {
                filterChain.doFilter(servletRequest, servletResponse);
                return;
            }
            log.error("演示环境，不允许发送 {} 的 {} 请求", uri, request.getMethod());
            HttpServletResponse response = (HttpServletResponse) servletResponse;
            response.setHeader("Access-Control-Allow-Credentials", "true");
            response.setContentType("application/json;charset=UTF-8");
            response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
            String json = new Gson().toJson(R.error(500, demoEnv.getTip()));
            response.getWriter().print(json);
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
                "http://demo.thingspanel.cn/api/v1/board/user/info",
                HttpMethod.GET,
                entity,
                String.class
            );
            
            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                JsonObject jsonObject = new Gson().fromJson(response.getBody(), JsonObject.class);
                if (jsonObject.has("data") && jsonObject.get("data").isJsonObject()) {
                    JsonObject data = jsonObject.getAsJsonObject("data");
                    String tenantId = data.has("tenant_id") ? data.get("tenant_id").getAsString() : null;
                    log.info("获取到的 tenant_id: {}", tenantId);
                    return tenantId;
                }
            }
        } catch (Exception e) {
            log.error("获取用户信息失败", e);
        }
        return null;
    }
}
