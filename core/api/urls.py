from django.urls import path
from . import views
urlpatterns = [
    path('heartbeat/', views.heartbeat),
    path('courses/', views.get_courses),
    path('create-course/', views.create_course),
    path('add-chapter/<int:course_id>/', views.add_chapter),
    path('get-chapters/<int:course_id>/', views.get_chapters),
    path('subscribe/<int:course_id>/', views.subscribe),
    path('check-author/<int:course_id>/', views.check_author)

]