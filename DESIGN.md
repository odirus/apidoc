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

## table class
id  
name

## table document  
id  
class_ id  # n n >= 1  
p_ class_ id  # n >= 1  
class_ level # n >= 0  
project_ id  
content_type  #['markdown']  
content  
update_time   

# 数据库设计  redis部分

