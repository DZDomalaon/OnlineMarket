# Generated by Django 3.2.3 on 2021-06-06 23:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0021_alter_cardpayment_expiration'),
    ]

    operations = [
        migrations.RenameField(
            model_name='category',
            old_name='category',
            new_name='name',
        ),
        migrations.RenameField(
            model_name='subcategory',
            old_name='subcategory',
            new_name='name',
        ),
    ]
