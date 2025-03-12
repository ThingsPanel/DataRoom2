package com.gccloud.dataroom.core.module.type.service;

import com.gccloud.dataroom.core.module.type.dto.TypeDTO;
import com.gccloud.dataroom.core.module.type.entity.TypeEntity;
import com.gccloud.common.service.ISuperService;

import java.util.List;

/**
 * @author hongyang
 * @version 1.0
 * @date 2023/5/26 9:40
 */
public interface ITypeService extends ISuperService<TypeEntity> {


    /**
     * 新增分类
     * @param typeDTO
     * @return
     */
    String add(TypeDTO typeDTO);

    /**
     * 更新分类
     * @param typeDTO
     */
    void update(TypeDTO typeDTO);

    /**
     * 删除分类
     * @param id
     */
    void deleteById(String id);

    /**
     * 根据类型获取分类列表
     * @param type 类型
     * @param tenantId 租户ID
     * @return 分类列表
     */
    List<TypeEntity> listByType(String type, String tenantId);

    /**
     * code查重
     * @param id
     * @param type
     * @param code
     * @return
     */
    boolean checkCodeRepeat(String id, String type, String code);

    /**
     * name查重
     * @param id
     * @param type
     * @param name
     * @return
     */
    boolean checkNameRepeat(String id, String type, String name);

}
