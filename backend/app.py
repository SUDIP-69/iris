import pickle
from flask import Flask, jsonify,request
from flask_cors import CORS
import numpy as np
import pandas as pd

app = Flask(__name__)
CORS(app) 


# Load the trained model
with open('SVM.pickle', 'rb') as file:
    model = pickle.load(file)

def pred(a,b,c,d):

    dataset = pd.DataFrame({'slength':[a],'swidth':[b],'plength':[c],'pwidth':[d]})
    return model.predict(dataset)[0]

@app.route('/getresult', methods=['POST'])
def get_result():
    # Get length data from the client
    data1 = request.json
    slength = data1.get('slength')
    swidth = data1.get('swidth')
    plength = data1.get('plength')
    pwidth = data1.get('pwidth')

    # Process the length
    species = pred(slength,swidth,plength,pwidth)
    

    # Return the processed length to the client
    response = {'species': species}
    return jsonify(response)

if __name__ == '__main__':
  app.run(debug=True)
