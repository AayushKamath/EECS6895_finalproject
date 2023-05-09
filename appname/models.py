from django.db import models

class StockData(models.Model):
    class Meta:
        app_label = 'appname'

    date = models.DateField()
    low = models.FloatField()
    open = models.FloatField()
    volume = models.FloatField()
    high = models.FloatField()
    close = models.FloatField()
    adjusted_close = models.FloatField()
    stock = models.CharField(max_length=1)


if __name__ == '__main__':
    print(__package__)