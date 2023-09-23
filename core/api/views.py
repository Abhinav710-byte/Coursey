from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from . models import *
from . serializers import *
# Create your views here.


@api_view(["GET"])
def heartbeat(request):
    return Response({"data":"hello"}, status = status.HTTP_200_OK)


@api_view(['GET'])
def get_courses(request):
    course_id = request.GET.get('id', '')
    print(course_id)
    if course_id:
        course = Course.objects.filter(id= course_id)
        if course:
            serializer = CourseSerializer(course[0])
            chapters = Chapter.objects.filter(course = course[0])
            chapter_serializer = ChapterSerializer(chapters, many=True)
            return Response({"course": serializer.data, 'chapters':chapter_serializer.data}, status = status.HTTP_200_OK)
        else:
            return Response({"message: Not found"}, status = status.HTTP_404_NOT_FOUND)
    else:

        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many= True)

        return Response(serializer.data, status = status.HTTP_200_OK)



@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_course(request):
    data = request.data
    author = request.user
    data['author'] = author.pk
    print(data)
    serializer = CourseSerializer(data = data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status = status.HTTP_201_CREATED)
        
    else:
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_chapter(request, course_id):
    print(course_id)
    
    data = request.data
    course = get_object_or_404(Course, id=course_id)
    if course.author != request.user:
        return Response({"message: You are not authorized!!"}, status= status.HTTP_400_BAD_REQUEST)
    data['course'] = course.pk
    serializer = ChapterSerializer(data = data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status= status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_chapters(request, course_id):
    course = get_object_or_404(Course, id = course_id)
    chapters = Chapter.objects.filter(course = course)
    serializer = ChapterSerializer(chapters, many=True)
    return Response(serializer.data, status = status.HTTP_200_OK)



@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def subscribe(request, course_id):
    course = get_object_or_404(Course, id = course_id)
    course.subscribers.add(request.user)

    course.save()

    return Response({"message":"subscribed"}, status = status.HTTP_200_OK)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_author(request, course_id):
    course = get_object_or_404(Course, id = course_id)
    author = course.author
    serializer = CourseSerializer(course)
    chapters = Chapter.objects.filter(course = course)
    chapter_serializer = ChapterSerializer(chapters, many=True)
    if request.user == author:
        return Response({"authorized":True, "course":serializer.data, "chapters":chapter_serializer.data}, status = status.HTTP_200_OK)
    else:
        return Response({"authorized":False}, status = status.HTTP_400_BAD_REQUEST)


    
    


