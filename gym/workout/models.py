from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.validators import UnicodeUsernameValidator


class Warrior(AbstractUser):
    username = models.CharField(error_messages={
                                'unique': 'A user with that username already exists.'}, max_length=20, unique=True, verbose_name='username')

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []


class Log(models.Model):
    exercise = models.CharField(max_length=255, blank=False)
    sets = models.IntegerField(blank=False)
    reps = models.IntegerField(blank=False)
    pounds = models.IntegerField(blank=True, default=0)
    warrior = models.ForeignKey(Warrior, on_delete=models.CASCADE)
