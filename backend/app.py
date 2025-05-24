from flask import Flask, jsonify
from flask_cors import CORS
import yfinance as yf
from datetime import datetime, timedelta
import os



app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return "Hello from Render!"

@app.route('/predict/<symbol>', methods=['GET'])
def predict_stock(symbol):
    try:
        stock = yf.Ticker(symbol)
        hist = stock.history(period="7d")  

        if hist.empty:
            return jsonify({"error": f"No stock data found for {symbol}"}), 404

        stock_prices = hist['Close'].tolist()  

        if len(stock_prices) < 3:
            return jsonify({"error": f"Not enough data to predict {symbol}"}), 400

        current_price = stock_prices[-1]  
        predicted_price = round(
            (stock_prices[-1] * 0.5) + (stock_prices[-2] * 0.3) + (stock_prices[-3] * 0.2), 2
        )  

        prediction_date = (datetime.now() + timedelta(days=1)).strftime("%Y-%m-%d")

     
        info = stock.info
        market_cap = info.get("marketCap", "N/A")
        volume = info.get("volume", "N/A")
        pe_ratio = info.get("trailingPE", "N/A")
        currency = info.get("currency", "USD")
        company_name = info.get("shortName", symbol)

        return jsonify({
            "stock": symbol,
            "company_name": company_name,
            "currency": currency,
            "current_price": current_price,
            "predicted_price": predicted_price,
            "stock_prices": stock_prices,
            "market_cap": market_cap,
            "volume": volume,
            "pe_ratio": pe_ratio,
            "prediction_date": prediction_date
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

        
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))  # Use the PORT Render provides or default to 5000
    app.run(host='0.0.0.0', port=port, debug=True)
