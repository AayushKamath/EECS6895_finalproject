from django.shortcuts import render
import pickle
import numpy as np
from django.http import JsonResponse
from .models import StockData
from django.views.decorators.csrf import csrf_exempt

model = pickle.load(open('appname/modelrf.pkl','rb'))

@csrf_exempt
def stockdata(request, stockdata):
    data = StockData.objects.filter(stock=stockdata).values()
    response = JsonResponse(list(data), safe=False)
    response['Access-Control-Allow-Origin'] = '*'

    return response

@csrf_exempt
def home(request):
    if request.method == 'POST':
        # get the input from the user
        print(request)
        Low = float(request.POST.get('low', 0))
        Open = float(request.POST.get('open', 0))
        Volume = float(request.POST.get('volume', 0))
        High = float(request.POST.get('high', 0))
        Adjusted_Close = float(request.POST.get('adjustedClose', 0))
        Year = float(request.POST.get('year', 0))
        Month = float(request.POST.get('month', 0))
        Day = float(request.POST.get('day', 0))
        print(Low)
        print(Open)
        print(Volume)
        print(High)
        print(Adjusted_Close)
        print(Year)
        print(Month)
        print(Day)
        inp = np.array([[Low, Open, Volume, High, Adjusted_Close, Year, Month, Day]])

        prediction = model.predict(inp)

        response_data = {
            'prediction': prediction[0]
        }
        print(prediction)
        response = JsonResponse(response_data)
    else:
        stock_data = StockData.objects.filter(stock='A').values()
        response = JsonResponse(list(stock_data), safe=False)
    
    response['Access-Control-Allow-Origin'] = '*'
    return response
