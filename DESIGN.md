# 数据库设计 Mysql 部分

## table user  
id  
username  
password #md5(md5 + md5)  

## table project  
id  
name  
admin_id  

## table privilege
id  
user_ id   
project_ id  
mode #['r' | 'rw']

组合索引 user_ id & project_ id

## table class
id  
name  
p_ class_ id  

## table document  
id  
class_ id  
project_ id  
content_ type  #['markdown']  
content  
update_time   

# 数据库设计  redis部分

