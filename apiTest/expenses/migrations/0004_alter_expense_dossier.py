# Generated by Django 4.0.4 on 2022-06-23 16:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('expenses', '0003_alter_expense_dossier'),
    ]

    operations = [
        migrations.AlterField(
            model_name='expense',
            name='dossier',
            field=models.FileField(upload_to='documents'),
        ),
    ]
