# Generated by Django 4.0.4 on 2022-07-30 23:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0003_alter_project_img'),
    ]

    operations = [
        migrations.RenameField(
            model_name='projectmember',
            old_name='is_ip',
            new_name='is_manager',
        ),
    ]
