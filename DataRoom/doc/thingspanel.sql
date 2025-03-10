#20250310 
# big_screen_biz_component 表增加tenant_id字段，36位字符串
ALTER TABLE big_screen_biz_component ADD COLUMN tenant_id varchar(36) DEFAULT NULL COMMENT '租户ID';
