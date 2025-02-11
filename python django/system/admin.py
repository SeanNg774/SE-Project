from django.contrib import admin
from .models import Admin, Teacher, Student, Fees

admin.site.register(Admin)
admin.site.register(Teacher)
admin.site.register(Student)
admin.site.register(Fees)
