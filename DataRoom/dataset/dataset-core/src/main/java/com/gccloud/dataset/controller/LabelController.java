package com.gccloud.dataset.controller;

import com.gccloud.common.permission.ApiPermission;
import com.gccloud.common.vo.PageVO;
import com.gccloud.common.vo.R;
import com.gccloud.dataset.constant.DatasetConstant;
import com.gccloud.dataset.dto.LabelDTO;
import com.gccloud.dataset.dto.LabelSearchDTO;
import com.gccloud.dataset.entity.LabelEntity;
import com.gccloud.dataset.service.IDatasetLabelService;
import com.gccloud.dataset.service.ILabelService;
import com.gccloud.dataset.utils.TenantContext;
import com.gccloud.dataset.vo.DatasetLabelVO;
import com.gccloud.dataset.vo.LabelVO;

import lombok.extern.slf4j.Slf4j;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author hongyang
 * @version 1.0
 * @date 2023/7/5 14:23
 */
@Slf4j
@Api(tags = "标签配置")
@RestController
@RequestMapping("/label")
public class LabelController {

    @Resource
    private ILabelService labelService;

    @Resource
    private IDatasetLabelService datasetLabelService;

    @ApiOperation("查询标签（租户分离）")
    @GetMapping("/list")
    @SuppressWarnings("unchecked")
    @ApiPermission(permissions = {DatasetConstant.Permission.Dataset.LABEL_VIEW})
    public R<PageVO<LabelEntity>> getPage(@ApiParam(name = "查询", value = "传入查询条件", required = true) LabelSearchDTO searchDTO) {
        // 从 TenantContext 获取当前租户ID
        String tenantId = TenantContext.getTenantId();
        log.info("当前查询的租户ID: {}", tenantId);
        
        // 检查租户ID是否为空
        if (StringUtils.isBlank(tenantId)) {
            log.error("租户ID为空，不允许查询标签");
            return R.error(403, "租户ID为空，不允许查询标签");
        }
        
        // 设置租户ID
        searchDTO.setTenantId(tenantId);
        
        PageVO<LabelEntity> page = labelService.getPage(searchDTO);
        return R.success(page);
    }

    @ApiOperation("新增或修改标签（租户分离）")
    @SuppressWarnings("unchecked")
    @PostMapping("/addOrUpdateLabel")
    @ApiPermission(permissions = {DatasetConstant.Permission.Dataset.LABEL_EDIT})
    public R<Void> addOrUpdateLabel(@RequestBody LabelDTO labelDTO) {
        if (StringUtils.isNotBlank(labelDTO.getId())) {
            labelService.update(labelDTO);
            return R.success();
        }
        // 从 TenantContext 获取当前租户ID
        String tenantId = TenantContext.getTenantId();
        log.info("当前新增或修改的租户ID: {}", tenantId);
        
        // 设置租户ID
        labelDTO.setTenantId(tenantId);
        // 检查租户ID是否为空
        if (StringUtils.isBlank(tenantId)) {
            log.error("租户ID为空，不允许新增或修改标签");
            return R.error(403, "租户ID为空，不允许新增或修改标签");
        }
        
        labelService.add(labelDTO);
        return R.success();
    }

    @ApiOperation("检查标签是否重复（租户分离）")
    @PostMapping("/checkRepeat")
    @SuppressWarnings("unchecked")
    @ApiPermission(permissions = {DatasetConstant.Permission.Dataset.LABEL_VIEW})
    public R<Boolean> checkRepeat(@RequestBody LabelEntity labelEntity) {
        // 从 TenantContext 获取当前租户ID
        String tenantId = TenantContext.getTenantId();
        log.info("当前检查标签重复的租户ID: {}", tenantId);
        
        // 检查租户ID是否为空
        if (StringUtils.isBlank(tenantId)) {
            log.error("租户ID为空，不允许检查标签重复");
            return R.error(403, "租户ID为空，不允许检查标签重复");
        }
        
        // 设置租户ID
        labelEntity.setTenantId(tenantId);
        
        boolean repeat = labelService.checkRepeat(labelEntity);
        return R.success(repeat);
    }

    @ApiOperation("删除标签")
    @GetMapping("/removeLabel/{id}")
    @ApiPermission(permissions = {DatasetConstant.Permission.Dataset.LABEL_EDIT})
    public R<Void> removeLabel(@PathVariable String id) {
        labelService.delete(id);
        return R.success();
    }

    @ApiOperation("获取标签详情")
    @GetMapping("/getLabelDetail/{id}")
    @ApiPermission(permissions = {DatasetConstant.Permission.Dataset.LABEL_VIEW})
    public R<LabelVO> getLabelDetail(@PathVariable String id) {
        LabelVO labelVO = labelService.getInfoById(id);
        return R.success(labelVO);
    }

    @ApiOperation("获取全部标签信息")
    @GetMapping("/getLabelList")
    @ApiPermission(permissions = {DatasetConstant.Permission.Dataset.LABEL_VIEW})
    public R<List<LabelEntity>> getLabelList() {
        List<LabelEntity> list = labelService.list();
        return R.success(list);
    }

    @ApiOperation("获取标签类型")
    @GetMapping("/getLabelType")
    @ApiPermission(permissions = {DatasetConstant.Permission.Dataset.LABEL_VIEW})
    public R<List<String>> getLabelType() {
        List<String> labelType = labelService.getLabelType();
        return R.success(labelType);
    }

    @ApiOperation("通过标签类型删除标签")
    @PostMapping("/removeLabelByType")
    @ApiPermission(permissions = {DatasetConstant.Permission.Dataset.LABEL_EDIT})
    public R<Void> removeLabelByType(@RequestBody LabelDTO labelVO) {
        labelService.deleteLabelByType(labelVO.getLabelType());
        return R.success();
    }

    @ApiOperation("标签类型的修改")
    @PostMapping("/updateLabelType")
    @ApiPermission(permissions = {DatasetConstant.Permission.Dataset.LABEL_EDIT})
    public R<Void> updateLabelType(@RequestBody LabelDTO labelVO) {
        labelService.updateLabelType(labelVO.getLabelType(), labelVO.getOldLabelType());
        return R.success();
    }

    @ApiOperation("通过数据集id获取标签")
    @GetMapping("/queryDataSetLabelList/{dataSetId}")
    @ApiPermission(permissions = {DatasetConstant.Permission.Dataset.LABEL_VIEW})
    public R<List<LabelEntity>> queryDataSetLabelList(@PathVariable String dataSetId) {
        List<LabelEntity> labelList = datasetLabelService.getLabelByDatasetId(dataSetId);
        return R.success(labelList);
    }

    @ApiOperation("通过标签id获取关联的数据集id")
    @GetMapping("/queryDataSetIdList/{labelId}")
    @ApiPermission(permissions = {DatasetConstant.Permission.Dataset.LABEL_VIEW})
    public R<List<String>> queryDataSetIdList(@PathVariable String labelId) {
        List<DatasetLabelVO> datasetLabelVOList = datasetLabelService.getDatasetByLabelId(labelId);
        List<String> dataSetIdList = datasetLabelVOList.stream().map(DatasetLabelVO::getId).collect(Collectors.toList());
        return R.success(dataSetIdList);
    }

    @ApiOperation("通过数据集id和标签id解除标签")
    @GetMapping("/removeDataSetLabel")
    @ApiPermission(permissions = {DatasetConstant.Permission.Dataset.LABEL_EDIT})
    public R<Void> removeDataSetLabel(String dataSetId, String labelId) {
        datasetLabelService.delete(dataSetId, labelId);
        return R.success();
    }

}
