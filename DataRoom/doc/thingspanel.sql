#20250310 
# big_screen_biz_component 表增加tenant_id字段，36位字符串
ALTER TABLE big_screen_biz_component ADD COLUMN tenant_id varchar(36) DEFAULT NULL COMMENT '租户ID';

# big_screen_type 表增加tenant_id字段，36位字符串
ALTER TABLE big_screen_type ADD COLUMN tenant_id varchar(36) DEFAULT NULL COMMENT '租户ID';

# big_screen_file 表增加tenant_id字段，36位字符串
ALTER TABLE big_screen_file ADD COLUMN tenant_id varchar(36) DEFAULT NULL COMMENT '租户ID';

# 数据源表增加tenant_id字段
ALTER TABLE ds_datasource ADD COLUMN tenant_id varchar(36) DEFAULT NULL COMMENT '租户ID';

# 数据集表增加tenant_id字段
ALTER TABLE ds_dataset ADD COLUMN tenant_id varchar(36) DEFAULT NULL COMMENT '租户ID';

# 数据集字段表增加tenant_id字段
ALTER TABLE ds_dataset_label ADD COLUMN tenant_id varchar(36) DEFAULT NULL COMMENT '租户ID';

# ds_category_tree表增加tenant_id字段
ALTER TABLE ds_category_tree ADD COLUMN tenant_id varchar(36) DEFAULT NULL COMMENT '租户ID';

