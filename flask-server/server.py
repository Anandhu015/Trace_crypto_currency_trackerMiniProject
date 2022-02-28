from distutils.log import debug
from flask import Flask
from flask import (render_template, url_for, flash,
                   redirect, request, abort, Blueprint)
import jsonpickle
from json import JSONEncoder

#ml joint
#from flask_bootstrap import Bootstrap
import pandas as pd # add to requirements
import numpy as np


#ML Packages
#from sklearn.feature_extraction.text import CountVectorizer
#from sklearn.externals import joblib


# TIME SERIES PACKGAES

from pandas import DataFrame
from pandas import concat
from pandas import read_csv

import tensorflow as tf # add to requirements
from sklearn.preprocessing import MinMaxScaler
import pandas as pd
import datetime # add to requirements
import pandas_datareader.data as web # add to requirements
from pandas import Series, DataFrame
import pygal # add to requirements
import stripe # add to requirements

pub_key = 'pk_test_D53d7w8AcdROmnyDOo2EfFFx00azCXbW0c'
secret_key = 'sk_test_iRSrpQN5FTQlWu3VPGGZg60H00S3wUa5s4'

stripe.api_key = secret_key
app=Flask(__name__)
@app.route('/predict', methods=['GET'])
def predict():
    
    
    if request.method == 'GET':
        #stock_name = 'ewe'
        stock_name = request.args.get("selectcur")
        print(stock_name)
        start = datetime.datetime(2018, 1, 1)
        end = datetime.datetime.now()

        df = web.DataReader(stock_name, 'yahoo', start, end)
        last_date = df.index[-1]
        scaler=MinMaxScaler(feature_range=(0,1))
        scaled_data=scaler.fit_transform(df['Close'].values.reshape(-1,1))

        day_list = []
        
        for d in range(5):
            day_list.append(df.index[-1] + datetime.timedelta(days=d+1))
           



        #read time series dataset assume only one column = "univariate"


        n_input = 5
        n_nodes = [100, 50, 25, 15, 10]
        n_epochs = 300
        n_batch = 30
        num_step = 5
        n_test = 1

        n_in = 5
        n_out = num_step

        data = df['Adj Close'].values
    

        def series_to_supervised(scaled_data, n_in, n_out=1):
            df = DataFrame(scaled_data)
            cols = list()
            # input sequence (t-n, ... t-1)
            for i in range(n_in, 0, -1):
                cols.append(df.shift(i))
            # forecast sequence (t, t+1, ... t+n)
            for i in range(0, n_out):
                cols.append(df.shift(-i))
            # put it all together
            agg = concat(cols, axis=1)
            # drop rows with NaN values
            agg.dropna(inplace=True)
            return agg.values



        prepared_data = series_to_supervised(scaled_data, n_in, n_out)
        train_x, train_y = prepared_data[:, :-num_step], prepared_data[:, -num_step:]
        X_train, X_test = train_x[:-n_test,:], train_x[-n_test:,:]
        y_train, y_test = train_y[:-n_test], train_y[-n_test:]

        model = tf.keras.Sequential([tf.keras.layers.Dense(n_nodes[0], activation='relu', input_dim=n_input),
                                        tf.keras.layers.Dense(n_nodes[1]),
                                        tf.keras.layers.Dense(n_nodes[2]),
                                        tf.keras.layers.Dense(n_nodes[3]),
                                        tf.keras.layers.Dense(n_nodes[4]),
                                        tf.keras.layers.Dense(num_step)
                                                                    ])
        model.compile(loss='mse', optimizer='adam')
        # fit model
        model.fit(X_train, y_train, epochs=n_epochs, batch_size=n_batch, verbose=0)
        pred= model.predict(X_test)
        my_predictions=scaler.inverse_transform(pred)
        
        graph = pygal.Line(x_label_rotation=20)
        graph.title = '5-Day Prediction'
        graph.x_labels =day_list
        graph.add(stock_name, my_predictions[0])


        x={str(day_list[0]):float(my_predictions[0][0]),str(day_list[1]):float(my_predictions[0][1]),str(day_list[2]):float(my_predictions[0][2]),str(day_list[3]):float(my_predictions[0][3]),str(day_list[4]):float(my_predictions[0][4])}
        





    return (x)
    print(my_predictions[0][0])
    

if __name__== "__main__":
    app.run(debug=True)   