import csv
from datetime import datetime
from appname.models import StockData

with open('appname/data.csv') as csvfile:
    reader = csv.DictReader(csvfile)
    objs = [
        StockData(
            date=datetime.strptime(row['Date'], '%d-%m-%Y').date(),
            low=float(row['Low']) if row['Low'] else 0,
            open=float(row['Open']) if row['Open'] else 0,
            volume=float(row['Volume']) if row['Volume'] else 0,
            high=float(row['High']) if row['High'] else 0,
            close=float(row['Close']) if row['Close'] else 0,
            adjusted_close=float(row['Adjusted Close']) if row['Adjusted Close'] else 0,
            stock=row['Stock'],
        )
        for row in reader
    ]
    StockData.objects.bulk_create(objs)
