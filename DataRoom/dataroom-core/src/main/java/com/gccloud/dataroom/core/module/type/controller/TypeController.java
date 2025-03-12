package com.gccloud.dataroom.core.module.type.controller;

import com.gccloud.dataroom.core.module.type.dto.TypeDTO;
import com.gccloud.dataroom.core.module.type.entity.TypeEntity;
import com.gccloud.dataroom.core.module.type.service.ITypeService;
import com.gccloud.dataroom.core.module.type.vo.TypeVO;
import com.gccloud.dataroom.core.utils.TenantContext;
import com.gccloud.common.utils.BeanConvertUtils;
import com.gccloud.common.validator.ValidatorUtils;
import com.gccloud.common.validator.group.Insert;
import com.gccloud.common.validator.group.Update;
import com.gccloud.common.vo.R;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author hongyang
 * @version 1.0
 * @date 2023/5/26 9:44
 */
@Slf4j
@RestController("dataRoomTypeController")
@RequestMapping("/bigScreen/type")
@Api(tags = "分类管理")
public class TypeController {


    @Resource
    private ITypeService typeService;


    @GetMapping("/list/{type}")
    @ApiOperation(value = "分类列表(租户隔离)", position = 10, produces = MediaType.APPLICATION_JSON_VALUE)
    @SuppressWarnings("unchecked")
    public R<List<TypeVO>> list(@PathVariable("type") String type) {
        // 从 TenantContext 获取当前租户ID
        String tenantId = TenantContext.getTenantId();
        log.info("当前查询的租户ID: {}", tenantId);
        
        // 检查租户ID是否为空
        if (StringUtils.isBlank(tenantId)) {
            log.error("租户ID为空，不允许查询分类");
            return (R<List<TypeVO>>) R.error("租户ID为空，不允许查询分类");
        }
        
        List<TypeEntity> entityList = typeService.listByType(type, tenantId);
        List<TypeVO> typeVOList = BeanConvertUtils.convert(entityList, TypeVO.class);
        return R.success(typeVOList);
    }


    @PostMapping("/add")
    @ApiOperation(value = "新增分类(租户隔离)", position = 10, produces = MediaType.APPLICATION_JSON_VALUE)
    @SuppressWarnings("unchecked")
    public R<String> add(@RequestBody TypeDTO typeDTO) {
        ValidatorUtils.validateEntity(typeDTO, Insert.class);
        
        // 从 TenantContext 获取当前租户ID
        String tenantId = TenantContext.getTenantId();
        log.info("当前操作的租户ID: {}", tenantId);
        
        // 检查租户ID是否为空
        if (StringUtils.isBlank(tenantId)) {
            log.error("租户ID为空，不允许新增分类");
            return (R<String>) R.error("租户ID为空，不允许新增分类");
        }
        
        // 设置租户ID
        typeDTO.setTenantId(tenantId);
        
        String id = typeService.add(typeDTO);
        return R.success(id);
    }


    @PostMapping("/update")
    @ApiOperation(value = "修改分类", position = 20, produces = MediaType.APPLICATION_JSON_VALUE)
    public R<String> update(@RequestBody TypeDTO typeDTO) {
        ValidatorUtils.validateEntity(typeDTO, Update.class);
        typeService.update(typeDTO);
        return R.success();
    }


    @PostMapping("/delete/{id}")
    @ApiOperation(value = "删除分类", position = 30, produces = MediaType.APPLICATION_JSON_VALUE)
    public R<String> delete(@PathVariable("id") String id) {
        typeService.deleteById(id);
        return R.success();
    }

    @PostMapping("/nameRepeat")
    @ApiOperation(value = "分类名称重复校验", position = 40, produces = MediaType.APPLICATION_JSON_VALUE)
    public R<Boolean> nameRepeat(@RequestBody TypeDTO typeDTO) {
        Boolean flag = typeService.checkNameRepeat(typeDTO.getId(), typeDTO.getType(), typeDTO.getName());
        return R.success(flag);
    }


}
