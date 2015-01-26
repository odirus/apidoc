# 数据库设计 MongoDB部分

## collection user  
id  
username  
password #md5(md5 + md5)  
privilege => {project_ id => 5 | 1}

## collection project  
id  
name  
admin_id  

## collection document  
id  
class_ id  
p_ class_ id  
class_ level  
project_ id  
document => {0 => doc, 1 => doc}


# 数据库设计  redis部分

