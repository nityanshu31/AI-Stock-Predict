
import numpy as np

import yfinance as yf

def sliding_window(symbol):
    try:
        
        stock = yf.Ticker(symbol)
        hist = stock.history(period="7d")  

        if hist.empty:
            raise ValueError(f"No stock data found for {symbol}")

        stock_prices = hist['Close'].tolist()  
        print(f"🔍 {symbol} Stock Prices: {stock_prices}")  

        
        if len(stock_prices) < 3:
            predicted_price = stock_prices[-1] 
        else:
            predicted_price = sum(stock_prices[-3:]) / 3  

        confidence = 0.85  

        print(f"✅ {symbol} Predicted Price: {predicted_price}, Confidence: {confidence}")

        return predicted_price, confidence  

    except Exception as e:
        print(f"❌ Error fetching data for {symbol}: {str(e)}")
        return None, None  


def top_stocks(prices, top_n=3):
    sorted_prices = sorted(prices.items(), key=lambda x: x[1], reverse=True)
    return [crypto[0] for crypto in sorted_prices[:top_n]]

def stock_correlation(prices_dict):
    cryptos = list(prices_dict.keys())
    correlations = []
    for i in range(len(cryptos)):
        for j in range(i + 1, len(cryptos)):
            corr = np.corrcoef(prices_dict[cryptos[i]], prices_dict[cryptos[j]])[0, 1]
            correlations.append({"crypto1": cryptos[i], "crypto2": cryptos[j], "correlation": corr})
    return correlations

def optimize_portfolio(investment, prices):
    total_price = sum(prices.values())
    return {crypto: (investment * price / total_price) for crypto, price in prices.items()}
