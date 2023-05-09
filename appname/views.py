from django.shortcuts import render
import pickle
import os
import numpy as np
from django.http import JsonResponse
from .models import StockData
from django.views.decorators.csrf import csrf_exempt
from sklearn.preprocessing import MinMaxScaler
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
# import matplotlib.pyplot as plt
from tensorflow import keras
import base64

model = pickle.load(open('appname/modelrf.pkl','rb'))
model_LSTM = keras.models.load_model('appname/LSTM_80.h5')

def create_sequences(data, t, d):
    X, y = [], []
    for i in range(len(data)-t-1):
        a = data[i:(i+t), :]
        X.append(a)
        y.append(data[i + t, :])
    return np.array(X), np.array(y)

@csrf_exempt
def stockdata(request, stockdata):
    data = StockData.objects.filter(stock=stockdata).values()
    response = JsonResponse(list(data), safe=False)
    response['Access-Control-Allow-Origin'] = '*'

    return response

@csrf_exempt
def predict(request):
    if request.method == 'POST':
        # get the input from the user
        print(request)
        # try:
        #     print("hello")
        #     os.remove('appname/inverse_plot.png')
        # except:
        #     pass
        

        csv_file = request.FILES.get('csv_file')
        df = pd.read_csv(csv_file)
        scaler = MinMaxScaler(feature_range=(0, 1))
        df_scaled = scaler.fit_transform(df)

        t = 10 # timesteps
        d = 9 # dimensions (including year, month, and day)
        # X_train, y_train = create_sequences(train, t, d)
        X_test, y_test = create_sequences(df_scaled, t, d)

        test_pred = model_LSTM.predict(X_test)

        testPredict = scaler.inverse_transform(test_pred)
        testPredictPlot = np.empty_like(df_scaled)
        testPredictPlot[:, :] = np.nan
        testPredictPlot[10:len(df_scaled)-1, :] = testPredict

        plt.plot(scaler.inverse_transform(df_scaled)[:,4],'b')
        plt.plot(testPredictPlot[:,4],'g')
        plt.xlabel('No of iterations')
        plt.ylabel('Close value of stock')
        plt.legend(['Actual value', 'Predicted value'])
        # plt.show()
        plt.savefig('appname/inverse_plot.png')
        plt.close()
        with open('appname/inverse_plot.png', 'rb') as f:
            image_data = f.read()

        encoded_image_data = base64.b64encode(image_data).decode('utf-8')


        response_data = {
            'image': f'data:image/png;base64,{encoded_image_data}'
        }
        # print(response_data)
        response = JsonResponse(response_data)
    # else:
    #     stock_data = StockData.objects.filter(stock='A').values()
    #     response = JsonResponse(list(stock_data), safe=False)
    
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
