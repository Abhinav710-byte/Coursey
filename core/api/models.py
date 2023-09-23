from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Course(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    timestamp = models.TimeField( auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    subscribers = models.ManyToManyField(User, related_name='subscribers', null =True, blank = True)
    thumbnail = models.URLField(max_length=500)
    def __str__(self):
        return self.name


class Chapter(models.Model):
    name = models.CharField(max_length=300)
    description = models.TextField()
    time = models.TimeField(auto_now_add=True)
    order_no = models.IntegerField(default =0)
    video = models.URLField(max_length=500)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)

    def __str__(self):
        return self.name + ' from ' + self.course.name


