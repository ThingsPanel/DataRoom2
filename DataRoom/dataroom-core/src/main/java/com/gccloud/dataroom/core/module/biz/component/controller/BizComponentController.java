package com.gccloud.dataroom.core.module.biz.component.controller;

import com.gccloud.common.permission.ApiPermission;
import com.gccloud.common.utils.BeanConvertUtils;
import com.gccloud.dataroom.core.module.biz.component.dto.BizComponentDTO;
import com.gccloud.dataroom.core.module.biz.component.dto.BizComponentSearchDTO;
import com.gccloud.dataroom.core.module.biz.component.entity.BizComponentEntity;
import com.gccloud.dataroom.core.module.biz.component.service.IBizComponentService;
import com.gccloud.common.vo.PageVO;
import com.gccloud.common.vo.R;
import com.gccloud.dataroom.core.permission.Permission;
import com.gccloud.dataroom.core.utils.TenantContext;
import io.swagger.annotations.*;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author hongyang
 * @version 1.0
 * @date 2023/6/5 13:43
 */
@Slf4j
@RestController("dataRoomBizComponentController")
@RequestMapping("/bigScreen/bizComponent")
@Api(tags = "业务组件")
@ApiSort(value = 110)
public class BizComponentController {


    @Resource
    private IBizComponentService bizComponentService;

    @ApiPermission(permissions = {Permission.Component.VIEW})
    @GetMapping("/page")
    @ApiOperation(value = "分页（租户分离）", position = 10, notes = "分页查询业务组件", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiImplicitParams({
            @ApiImplicitParam(name = "current", value = "页码", paramType = "query", required = true, dataType = "int"),
            @ApiImplicitParam(name = "size", value = "每页条数", paramType = "query", required = true, dataType = "int"),
            @ApiImplicitParam(name = "name", value = "名称模糊查询", paramType = "query", dataType = "string")
    })
    @SuppressWarnings("unchecked")
    public R<PageVO<BizComponentEntity>> getPage(@ApiParam(name = "查询", value = "传入查询的业务条件", required = true) BizComponentSearchDTO searchDTO) {
        // 从 TenantContext 获取当前租户ID
        String tenantId = TenantContext.getTenantId();
        log.info("当前查询的租户ID: {}", tenantId);
        
        // 检查租户ID是否为空
        if (StringUtils.isBlank(tenantId)) {
            log.error("租户ID为空，不允许查询组件");
            return (R<PageVO<BizComponentEntity>>) R.error("租户ID为空，不允许查询组件");
        }
        
        PageVO<BizComponentEntity> page = bizComponentService.getPage(searchDTO);
        return R.success(page);
    }

    @ApiPermission(permissions = {Permission.Component.ADD})
    @PostMapping("/add")
    @ApiOperation(value = "新增（租户分离）", notes = "新增", produces = MediaType.APPLICATION_JSON_VALUE)
    @SuppressWarnings("unchecked")
    public R<String> add(@ApiParam(name = "新增", value = "传入新增的业务条件", required = true) @RequestBody BizComponentDTO dto) {
        // 从 TenantContext 获取当前租户ID
        String tenantId = TenantContext.getTenantId();
        log.info("当前操作的租户ID: {}", tenantId);
        
        // 检查租户ID是否为空
        if (StringUtils.isBlank(tenantId)) {
            log.error("租户ID为空，不允许新增组件");
            // 使用显式类型转换来解决类型安全问题
            return R.error("租户ID为空，不允许新增组件");
        }
        
        BizComponentEntity entity = BeanConvertUtils.convert(dto, BizComponentEntity.class);
        
        // 设置租户ID
        entity.setTenantId(tenantId);
        // 打印完整的实体内容
        log.info("保存前的实体内容: {}", entity);
        String code = bizComponentService.add(entity);
        return R.success(code);
    }


    @ApiPermission(permissions = {Permission.Component.UPDATE})
    @PostMapping("/update")
    @ApiOperation(value = "修改", notes = "修改", produces = MediaType.APPLICATION_JSON_VALUE)
    public R<Void> update(@ApiParam(name = "修改", value = "传入修改的业务条件", required = true) @RequestBody BizComponentDTO dto) {
        BizComponentEntity entity = BeanConvertUtils.convert(dto, BizComponentEntity.class);
        bizComponentService.update(entity);
        return R.success();
    }

    @ApiPermission(permissions = {Permission.Component.ADD})
    @PostMapping("/copy/{code}")
    @ApiOperation(value = "复制", notes = "复制", produces = MediaType.APPLICATION_JSON_VALUE)
    public R<String> copy( @PathVariable String code) {
        String newCode = bizComponentService.copy(code);
        return R.success(newCode);
    }

    @ApiPermission(permissions = {Permission.Component.DELETE})
    @PostMapping("/delete/{id}")
    @ApiOperation(value = "删除", notes = "删除", produces = MediaType.APPLICATION_JSON_VALUE)
    public R<Void> delete(@ApiParam(name = "删除", value = "传入删除的业务条件", required = true) @PathVariable String id) {
        bizComponentService.delete(id);
        return R.success();
    }

    @ApiPermission(permissions = {Permission.Component.VIEW})
    @GetMapping("/info/{code}")
    @ApiOperation(value = "根据编码获取组件", notes = "根据编码获取组件", produces = MediaType.APPLICATION_JSON_VALUE)
    public R<BizComponentEntity> getInfoByCode(@ApiParam(name = "根据编码获取组件", value = "传入根据编码获取组件的业务条件", required = true) @PathVariable String code) {
        BizComponentEntity entity = bizComponentService.getInfoByCode(code);
        return R.success(entity);
    }

    @ApiPermission(permissions = {Permission.Component.VIEW})
    @PostMapping("/name/repeat")
    @ApiOperation(value = "名称查重", notes = "名称查重", produces = MediaType.APPLICATION_JSON_VALUE)
    public R<Boolean> nameRepeat(@RequestBody BizComponentDTO dto) {
        return R.success(bizComponentService.checkName(dto.getId(), dto.getName()));
    }

    @ApiPermission(permissions = {Permission.Component.VIEW})
    @GetMapping("/list")
    @ApiOperation(value = "列表（租户分离）", notes = "列表查询业务组件", produces = MediaType.APPLICATION_JSON_VALUE)
    @SuppressWarnings("unchecked")
    public R<List<BizComponentEntity>> getList(@ApiParam(name = "查询", value = "传入查询的业务条件", required = true) BizComponentSearchDTO searchDTO) {
        // 从 TenantContext 获取当前租户ID
        String tenantId = TenantContext.getTenantId();
        log.info("当前查询的租户ID: {}", tenantId);
        
        // 检查租户ID是否为空
        if (StringUtils.isBlank(tenantId)) {
            log.error("租户ID为空，不允许查询组件");
            return (R<List<BizComponentEntity>>) R.error("租户ID为空，不允许查询组件");
        }
        
        List<BizComponentEntity> list = bizComponentService.getList(searchDTO);
        return R.success(list);
    }

}
