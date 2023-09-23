from . models import *
from rest_framework.serializers import ModelSerializer

class CourseSerializer(ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'
        # depth =1


class ChapterSerializer(ModelSerializer):
    class Meta:
        model = Chapter
        fields = '__all__'
        # depth = 1