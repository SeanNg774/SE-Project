from django.db import models

# Admin model
class Admin(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    email = models.EmailField()

    def __str__(self):
        return self.username

# Teacher model
class Teacher(models.Model):
    name = models.CharField(max_length=100)
    subject = models.CharField(max_length=100)
    email = models.EmailField()
    hire_date = models.DateField()

    def __str__(self):
        return self.name

# Student model
class Student(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    grade = models.CharField(max_length=50)
    teacher = models.ForeignKey(Teacher, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name

# Fees model
class Fee(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=8, decimal_places=2)
    due_date = models.DateField()
    status = models.CharField(max_length=20, choices=[('Paid', 'Paid'), ('Unpaid', 'Unpaid')])

    def __str__(self):
        return f"{self.student.name} - {self.status}"
    
#Accountant Model
class Accountant(models.Model):
    accountantID = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    email = models.EmailField()

    def __str__(self):
        return self.username

class Parent(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField()
    phone_number = models.IntegerField()

    def __str__(self):
        return self.name

class Payment(models.Model):
    amount = models.DecimalField(max_digits=8, decimal_places=2)
    date = models.DateField()

    def __str__(self):
        return f"Payment: {self.amount} on {self.date}"


class Reminder(models.Model):
    content = models.CharField(max_length=255)  # Renamed to snake_case
    date_sent = models.DateField()             # Renamed to snake_case

    def __str__(self):
        return f"Reminder: {self.content} on {self.date_sent}"


class Class(models.Model):
    class_name = models.CharField(max_length=10)  # Renamed to snake_case

    def __str__(self):
        return f"Class: {self.class_name}"


class MonthlyInvoice(models.Model):  # Renamed to remove underscore (PEP8)
    total_amount = models.DecimalField(max_digits=8, decimal_places=2)  # Renamed to snake_case
    due_date = models.DateField()                                       # Renamed to snake_case

    def __str__(self):
        return f"Invoice: {self.total_amount} due on {self.due_date}"


class Report(models.Model):
    summary = models.CharField(max_length=255)  # Renamed to snake_case

    def __str__(self):
        return f"Report: {self.summary}"
