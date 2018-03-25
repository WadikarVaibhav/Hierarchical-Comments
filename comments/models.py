from django.db import models

class Users(models.Model):
    user_id = models.AutoField(primary_key = True)
    user_name = models.CharField(max_length = 20)

    def __str__(self):
        return self.user_name + ' ' +str(self.user_id)

class Posts(models.Model):
    post_id = models.AutoField(primary_key = True)
    post = models.TextField()
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)

    def __str__(self):
        return self.post + ' '+ str(self.post_id)

class Comments(models.Model):
    user_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    comment_id = models.AutoField(primary_key = True)
    comment = models.CharField(max_length = 500)
    post_id = models.ForeignKey(Posts, on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True, editable=False)
    date_modified = models.DateTimeField(auto_now=True)
    parent_id = models.ForeignKey('self', on_delete=models.CASCADE, blank=True, null =True)
    likes = models.IntegerField(default=0)

    def __str__(self):
        return self.comment +'--> parent id: '+str(self.parent_id) 