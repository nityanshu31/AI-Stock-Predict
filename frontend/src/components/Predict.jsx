import React, { useState, useEffect } from "react";
import StockChart from "./StockChart";

const Predict = () => {
    const [stock, setStock] = useState("TSLA");
    const [prediction, setPrediction] = useState(null);
    const [predictionDate, setPredictionDate] = useState(null);
    const [currentPrice, setCurrentPrice] = useState(null);
    const [stockPrices, setStockPrices] = useState([]);
    const [predictedStockPrices, setPredictedStockPrices] = useState([]);
    const [priceChange, setPriceChange] = useState(0);
    const [percentChange, setPercentChange] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const handlePredict = async (selectedStock = stock) => {
        try {
            setIsLoading(true);
            const response = await fetch(`http://127.0.0.1:5000/predict/${selectedStock}`);
            const data = await response.json();

            if (data.error) {
                console.error("Prediction error:", data.error);
                return;
            }

            setStock(selectedStock);
            setPrediction(data.predicted_price);
            setPredictionDate(data.prediction_date);
            setCurrentPrice(data.current_price);
            setStockPrices(data.stock_prices || []);
            setPredictedStockPrices(data.stock_prices.map(price => price * 1.02));
            
           
            if (data.stock_prices && data.stock_prices.length >= 2) {
                const latest = data.stock_prices[data.stock_prices.length - 1];
                const previous = data.stock_prices[data.stock_prices.length - 2];
                const change = latest - previous;
                setPriceChange(change);
                setPercentChange((change / previous) * 100);
            }
            
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching prediction:", error);
            setIsLoading(false);
        }
    };

   
    useEffect(() => {
        handlePredict("TSLA");
    }, []);

   
    const isPriceUp = priceChange >= 0;
    const trendColor = isPriceUp ? "text-green-500" : "text-red-500";
    const predictionDiff = prediction && currentPrice ? prediction - currentPrice : 0;
    const predictionPercent = prediction && currentPrice ? (predictionDiff / currentPrice) * 100 : 0;
    const isPredictionUp = predictionDiff >= 0;

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
            
            <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">
                        AI-Powered Stock Predictions
                    </h1>
                    <p className="text-center text-lg md:text-xl text-blue-200 mb-8">
                        Harness machine learning to forecast market movements
                    </p>
                </div>
            </div>

            
            <div className="container mx-auto px-4 -mt-8">
                
                <div className="bg-gray-800 rounded-xl shadow-2xl p-6 mb-8 border border-gray-700">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <h2 className="text-xl font-semibold mb-2">Select Stock</h2>
                            <p className="text-gray-400 text-sm">Choose a company to analyze</p>
                        </div>
                        <select
                            className="bg-gray-900 text-white py-3 px-6 rounded-lg border border-gray-700 w-full md:w-auto cursor-pointer hover:bg-gray-700 transition duration-200"
                            value={stock}
                            onChange={(e) => handlePredict(e.target.value)}
                        >
                            <option value="TSLA">Tesla (TSLA)</option>
                            <option value="AAPL">Apple (AAPL)</option>
                            <option value="MSFT">Microsoft (MSFT)</option>
                            <option value="GOOGL">Google (GOOGL)</option>
                            <option value="AMZN">Amazon (AMZN)</option>
                            <option value="NVDA">NVIDIA (NVDA)</option>
                            <option value="NFLX">Netflix (NFLX)</option>
                            <option value="META">Meta (META)</option>
                        </select>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <>
                      
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                           
                            <div className="bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-700 hover:border-blue-500 transition duration-300">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-semibold mb-1">{stock}</h3>
                                        <p className="text-gray-400 text-sm">Current Market Price</p>
                                    </div>
                                    <div className="bg-gray-900 rounded-lg px-3 py-1">
                                        <span className="text-xs font-medium">LIVE</span>
                                    </div>
                                </div>
                                
                                <div className="flex items-baseline">
                                    <span className="text-3xl font-bold mr-2">${currentPrice?.toFixed(2) || "—"}</span>
                                    <span className={`${trendColor} text-lg font-semibold`}>
                                        {isPriceUp ? "+" : ""}{priceChange.toFixed(2)} ({isPriceUp ? "+" : ""}{percentChange.toFixed(2)}%)
                                    </span>
                                </div>
                            </div>

                          
                            <div className="bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-700 hover:border-purple-500 transition duration-300">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-semibold mb-1">AI Prediction</h3>
                                        <p className="text-gray-400 text-sm">Forecast for {predictionDate}</p>
                                    </div>
                                    <div className="bg-purple-900 rounded-lg px-3 py-1">
                                        <span className="text-xs font-medium">AI</span>
                                    </div>
                                </div>
                                
                                <div className="flex items-baseline">
                                    <span className="text-3xl font-bold mr-2">${prediction?.toFixed(2) || "—"}</span>
                                    <span className={`${isPredictionUp ? "text-green-500" : "text-red-500"} text-lg font-semibold`}>
                                        {isPredictionUp ? "+" : ""}{predictionDiff.toFixed(2)} ({isPredictionUp ? "+" : ""}{predictionPercent.toFixed(2)}%)
                                    </span>
                                </div>
                            </div>
                        </div>

                       
                        <div className="bg-gray-800 rounded-xl shadow-xl p-6 mb-8 border border-gray-700">
                            <h2 className="text-2xl font-bold mb-6 text-center">Price Analysis</h2>
                            <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-6">
                             
                                <div className="w-full md:w-1/2 bg-gray-900 rounded-lg p-4">
                                    <h3 className="text-lg font-semibold mb-4 text-blue-400">Historical Prices</h3>
                                    {stockPrices.length > 0 && (
                                        <div className="h-64">
                                            <StockChart 
                                                stockData={stockPrices} 
                                                stockName={stock} 
                                            />
                                        </div>
                                    )}
                                </div>

                                
                                <div className="w-full md:w-1/2 bg-gray-900 rounded-lg p-4">
                                    <h3 className="text-lg font-semibold mb-4 text-purple-400">
                                        Predicted Trend
                                    </h3>
                                    {predictedStockPrices.length > 0 && (
                                        <div className="h-64">
                                            <StockChart 
                                                stockData={predictedStockPrices} 
                                                stockName={stock} 
                                                isPredicted 
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                   
                        <div className="bg-gray-800 rounded-xl shadow-xl p-6 mb-8 border border-gray-700">
                            <h2 className="text-2xl font-bold mb-4">Market Insights</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                                    <p className="text-gray-400 text-sm mb-1">Sentiment</p>
                                    <p className={`text-lg font-bold ${isPredictionUp ? "text-green-400" : "text-red-400"}`}>
                                        {isPredictionUp ? "Bullish" : "Bearish"}
                                    </p>
                                </div>
                                <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                                    <p className="text-gray-400 text-sm mb-1">Volatility</p>
                                    <p className="text-lg font-bold text-yellow-400">Moderate</p>
                                </div>
                                <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                                    <p className="text-gray-400 text-sm mb-1">Risk Level</p>
                                    <p className="text-lg font-bold text-blue-400">Medium</p>
                                </div>
                                <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                                    <p className="text-gray-400 text-sm mb-1">AI Confidence</p>
                                    <p className="text-lg font-bold text-purple-400">High</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}

             
                <div className="bg-gray-800 rounded-xl p-4 text-center text-gray-400 text-sm mb-8">
                    <p>AI predictions are based on historical data and should not be considered financial advice.</p>
                    <p>Always consult with a financial advisor before making investment decisions.</p>
                </div>
            </div>
        </div>
    );
};

export default Predict;