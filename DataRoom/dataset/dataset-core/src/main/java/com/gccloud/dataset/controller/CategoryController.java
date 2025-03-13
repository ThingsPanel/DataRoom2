package com.gccloud.dataset.controller;

import com.gccloud.common.vo.R;
import com.gccloud.common.permission.ApiPermission;
import com.gccloud.dataset.constant.DatasetConstant;
import com.gccloud.dataset.dto.CategorySearchDTO;
import com.gccloud.dataset.entity.CategoryEntity;
import com.gccloud.dataset.service.ICategoryService;
import com.gccloud.dataset.vo.CategoryVO;
import com.gccloud.dataset.utils.TenantContext;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author hongyang
 * @version 1.0
 * @date 2023/6/7 15:17
 */
@Slf4j
@Api(tags = "数据集")
@RestController
@RequestMapping("/category")
@ConditionalOnProperty(prefix = "gc.starter.dataset.component", name = "DatasetCategoryController", havingValue = "DatasetCategoryController", matchIfMissing = true)
public class CategoryController {

    @Resource
    private ICategoryService categoryService;

    @ApiOperation("依据类型查询对应的种类树（租户分离）")
    @GetMapping("/queryTreeList")
    @SuppressWarnings("unchecked")
    @ApiPermission(permissions = {DatasetConstant.Permission.Dataset.CATEGORY_VIEW})
    public R<List<CategoryVO>> queryTreeList(CategorySearchDTO searchDTO) {
        // 从 TenantContext 获取当前租户ID
        String tenantId = TenantContext.getTenantId();
        log.info("当前查询的租户ID: {}", tenantId);
        
        // 检查租户ID是否为空
        if (StringUtils.isBlank(tenantId)) {
            log.error("租户ID为空，不允许查询分类");
            return R.error(403, "租户ID为空，不允许查询分类");
        }
        
        // 设置租户ID
        searchDTO.setTenantId(tenantId);
        
        List<CategoryVO> tree = categoryService.getTree(searchDTO);
        return R.success(tree);
    }

    @ApiOperation("新增（租户分离）")
    @PostMapping("/add")
    @SuppressWarnings("unchecked")
    @ApiPermission(permissions = {DatasetConstant.Permission.Dataset.CATEGORY_EDIT})
    public R<String> add(@RequestBody CategoryEntity categoryEntity) {
        // 从 TenantContext 获取当前租户ID
        String tenantId = TenantContext.getTenantId();
        log.info("当前操作的租户ID: {}", tenantId);
        
        // 检查租户ID是否为空
        if (StringUtils.isBlank(tenantId)) {
            log.error("租户ID为空，不允许新增分类");
            return R.error(403, "租户ID为空，不允许新增分类");
        }
        
        // 设置租户ID
        categoryEntity.setTenantId(tenantId);
        
        String id = categoryService.add(categoryEntity);
        return R.success(id);
    }

    @ApiOperation("修改")
    @PostMapping("/update")
    @ApiPermission(permissions = {DatasetConstant.Permission.Dataset.CATEGORY_EDIT})
    public R<Void> update(@RequestBody CategoryEntity categoryEntity) {
        categoryService.update(categoryEntity);
        return R.success();
    }

    @ApiOperation("删除")
    @PostMapping("/delete/{id}")
    @ApiPermission(permissions = {DatasetConstant.Permission.Dataset.CATEGORY_EDIT})
    public R<Void> delete(@PathVariable String id) {
        categoryService.delete(id);
        return R.success();
    }

    @ApiOperation("名称查重（租户分离）")
    @PostMapping("/checkRepeat")
    @ApiPermission(permissions = {DatasetConstant.Permission.Dataset.CATEGORY_VIEW})
    public R<Boolean> checkRepeat(@RequestBody CategoryEntity entity) {
        // 从 TenantContext 获取当前租户ID
        String tenantId = TenantContext.getTenantId();
        
        // 设置租户ID，确保在同一租户下检查重复
        entity.setTenantId(tenantId);
        
        Boolean flag = categoryService.checkNameRepeat(entity);
        return R.success(flag);
    }
}
