package com.gccloud.dataset.service.impl.dataset;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.gccloud.common.exception.GlobalException;
import com.gccloud.common.utils.JSON;
import com.gccloud.dataset.constant.DatasetConstant;
import com.gccloud.dataset.dao.DatasetDao;
import com.gccloud.dataset.dto.DatasetParamDTO;
import com.gccloud.dataset.dto.TestExecuteDTO;
import com.gccloud.dataset.entity.DatasetEntity;
import com.gccloud.dataset.entity.config.IotDataSetConfig;
import com.gccloud.dataset.params.ParamsClient;
import com.gccloud.dataset.permission.DatasetPermissionClient;
import com.gccloud.dataset.service.IBaseDataSetService;
import com.gccloud.dataset.vo.DataVO;
import com.gccloud.dataset.vo.DatasetInfoVO;
import com.google.common.collect.Lists;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

/**
 * 物联网平台数据集服务实现类
 * @author hongyang
 * @version 1.0
 * @date 2023/6/1 11:20
 */
@Slf4j
@Service(DatasetConstant.DataSetType.IOT)
public class IotDataSetServiceImpl extends ServiceImpl<DatasetDao, DatasetEntity> implements IBaseDataSetService {

    @Resource
    private ParamsClient paramsClient;

    @Resource
    private DatasetPermissionClient datasetPermissionClient;

    @Override
    public String add(DatasetEntity entity) {
        String id = IBaseDataSetService.super.add(entity);
        if (datasetPermissionClient.hasPermissionService()) {
            // 添加数据集权限
            datasetPermissionClient.addPermission(id);
        }
        return id;
    }

    @Override
    public void delete(String id) {
        IBaseDataSetService.super.delete(id);
        if (datasetPermissionClient.hasPermissionService()) {
            // 删除数据集权限
            datasetPermissionClient.deletePermission(id);
        }
    }

    @Override
    public Object execute(String id, List<DatasetParamDTO> paramList) {
        if (StringUtils.isBlank(id)) {
            throw new GlobalException("数据集id不能为空");
        }
        DatasetEntity entity = this.getByIdFromCache(id);
        if (entity == null) {
            throw new GlobalException("数据集不存在");
        }
        final List<DatasetParamDTO> finalParamList = Lists.newArrayList(paramList);
        if (DatasetConstant.DatasetCache.OPEN.equals(entity.getCache())) {
            CompletableFuture<Object> future = DATASET_CACHE.get(id, key -> getData(entity, finalParamList));
            try {
                return future.get();
            } catch (Exception e) {
                log.error("数据集缓存异常：{}", e.getMessage());
                log.error(ExceptionUtils.getStackTrace(e));
            }
        }
        return getData(entity, finalParamList);
    }

    /**
     * 获取数据
     * @param entity
     * @param finalParamList
     * @return
     */
    private Object getData(DatasetEntity entity, List<DatasetParamDTO> finalParamList) {
        IotDataSetConfig config = (IotDataSetConfig) entity.getConfig();
        // 复制一份config，避免直接修改缓存
        IotDataSetConfig configCopy = JSON.parseObject(JSON.toJSONString(config), IotDataSetConfig.class);
        // 自定义参数拓展处理
        List<DatasetParamDTO> params = paramsClient.handleParams(finalParamList);
        // 处理参数
        configCopy = this.handleParams(configCopy, params);
        
        log.info("执行【{}】数据集（类型：【IOT】，ID:【{}】）", entity.getName(), entity.getId());
        
        // IOT类型的数据集只支持前端执行，这里返回处理后的配置，由前端处理具体逻辑
        return configCopy;
    }

    @Override
    public DataVO execute(TestExecuteDTO executeDTO) {
        String apiInfoJson = executeDTO.getScript();
        if (StringUtils.isBlank(apiInfoJson)) {
            throw new GlobalException("数据集测试数据不能为空");
        }
        apiInfoJson = paramsClient.handleScript(executeDTO.getDataSetType(), apiInfoJson);
        IotDataSetConfig config = JSON.parseObject(apiInfoJson, IotDataSetConfig.class);
        List<DatasetParamDTO> paramList = executeDTO.getParams();
        paramList = paramsClient.handleParams(paramList);

        config = this.handleParams(config, paramList);
        DataVO dataVO = new DataVO();
        dataVO.setData(config);
        return dataVO;
    }

    /**
     * 替换参数
     * @param config
     * @param datasetParamList
     * @return
     */
    private IotDataSetConfig handleParams(IotDataSetConfig config, List<DatasetParamDTO> datasetParamList) {
        if (datasetParamList == null || datasetParamList.size() == 0) {
            return config;
        }
        
        // 处理userDefinedJson中的参数
        Map<String, Object> userDefinedJson = config.getUserDefinedJson();
        if (userDefinedJson != null && !userDefinedJson.isEmpty()) {
            // 将Map转换为JSON字符串，进行参数替换
            String jsonStr = JSON.toJSONString(userDefinedJson);
            boolean needReplace = false;
            
            for (DatasetParamDTO param : datasetParamList) {
                if (jsonStr.contains("${" + param.getName() + "}")) {
                    jsonStr = this.parameterReplace(param, jsonStr);
                    needReplace = true;
                }
            }
            
            // 如果进行了参数替换，则需要将JSON字符串转回Map
            if (needReplace) {
                userDefinedJson = JSON.parseObject(jsonStr, Map.class);
                config.setUserDefinedJson(userDefinedJson);
            }
        }
        
        return config;
    }

    /**
     * 参数替换
     * @param param
     * @param str
     * @return
     */
    private String parameterReplace(DatasetParamDTO param, String str) {
        String value = param.getValue() == null ? "" : param.getValue().toString();
        return str.replace("${" + param.getName() + "}", value);
    }

    @Override
    public DatasetInfoVO getInfoById(String id) {
        DatasetEntity entity = this.getByIdFromCache(id);
        if (entity == null) {
            throw new GlobalException("数据集不存在");
        }
        // 创建新的DatasetInfoVO并手动复制属性
        DatasetInfoVO datasetInfoVO = new DatasetInfoVO();
        datasetInfoVO.setId(entity.getId());
        datasetInfoVO.setName(entity.getName());
        datasetInfoVO.setTypeId(entity.getTypeId());
        datasetInfoVO.setRemark(entity.getRemark());
        datasetInfoVO.setDatasetType(entity.getDatasetType());
        datasetInfoVO.setSourceId(entity.getSourceId());
        datasetInfoVO.setModuleCode(entity.getModuleCode());
        datasetInfoVO.setEditable(entity.getEditable());
        
        IotDataSetConfig config = (IotDataSetConfig) entity.getConfig();
        datasetInfoVO.setFields(config.getFieldList());
        datasetInfoVO.setParams(config.getParamsList());
        // IOT类型的数据集只支持前端执行
        datasetInfoVO.setExecutionByFrontend(true);
        return datasetInfoVO;
    }

    @Override
    public boolean checkBackendExecutionNeeded(String datasetId) {
        // IOT类型的数据集只支持前端执行
        return false;
    }
} 