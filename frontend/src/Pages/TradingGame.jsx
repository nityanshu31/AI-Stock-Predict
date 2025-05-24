import React, { useState, useEffect, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Target, Award, Brain, Zap, Star } from 'lucide-react';

const TradingGame = () => {
  const [gameData, setGameData] = useState({
    balance: 10000,
    portfolio: {},
    totalValue: 10000,
    transactions: [],
    level: 1,
    experience: 0,
    achievements: []
  });

  const [stocks] = useState([
    { symbol: 'AAPL', name: 'Apple Inc.', price: 185.20, basePrice: 185.20 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 142.80, basePrice: 142.80 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.50, basePrice: 378.50 },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 195.60, basePrice: 195.60 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 145.30, basePrice: 145.30 },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 720.90, basePrice: 720.90 }
  ]);

  const [priceHistory, setPriceHistory] = useState({});
  const [selectedStock, setSelectedStock] = useState(stocks[0]);
  const [tradeAmount, setTradeAmount] = useState(1);
  const [aiInsights, setAiInsights] = useState([]);
  const [marketTrend, setMarketTrend] = useState('bullish');
  const [showAchievement, setShowAchievement] = useState(null);

  const generateAIInsight = useCallback(() => {
    const insights = [
      "📈 Strong bullish momentum detected in tech sector",
      "⚡ High volatility expected in next 2 hours",
      "🎯 Support level identified at current price range",
      "🔥 Volume surge indicates potential breakout",
      "📊 Technical indicators suggest trend reversal",
      "💡 Market sentiment turning positive",
      "🚀 Breaking resistance levels detected",
      "⚠️ Profit-taking activity observed"
    ];
    return insights[Math.floor(Math.random() * insights.length)];
  }, []);

  const checkAchievements = useCallback((newGameData) => {
    const achievements = [];
    
    if (newGameData.totalValue >= 12000 && !gameData.achievements.includes('First Profit')) {
      achievements.push('First Profit');
    }
    if (newGameData.transactions.length >= 10 && !gameData.achievements.includes('Active Trader')) {
      achievements.push('Active Trader');
    }
    if (newGameData.totalValue >= 15000 && !gameData.achievements.includes('High Roller')) {
      achievements.push('High Roller');
    }
    
    if (achievements.length > 0) {
      setShowAchievement(achievements[0]);
      setTimeout(() => setShowAchievement(null), 3000);
    }
    
    return achievements;
  }, [gameData.achievements]);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedStocks = stocks.map(stock => {
        const volatility = 0.02;
        const trend = marketTrend === 'bullish' ? 0.001 : -0.001;
        const change = (Math.random() - 0.5) * volatility + trend;
        const newPrice = Math.max(stock.price * (1 + change), 1);
        
        return { ...stock, price: parseFloat(newPrice.toFixed(2)) };
      });

      const currentTime = Date.now();
      const newPriceHistory = { ...priceHistory };
      
      updatedStocks.forEach(stock => {
        if (!newPriceHistory[stock.symbol]) {
          newPriceHistory[stock.symbol] = [];
        }
        newPriceHistory[stock.symbol].push({
          time: currentTime,
          price: stock.price,
          timestamp: new Date().toLocaleTimeString()
        });
        
        if (newPriceHistory[stock.symbol].length > 20) {
          newPriceHistory[stock.symbol] = newPriceHistory[stock.symbol].slice(-20);
        }
      });

      setPriceHistory(newPriceHistory);
      
      if (selectedStock) {
        const updated = updatedStocks.find(s => s.symbol === selectedStock.symbol);
        setSelectedStock(updated);
      }

      // Update portfolio value
      const portfolioValue = Object.entries(gameData.portfolio).reduce((total, [symbol, shares]) => {
        const stock = updatedStocks.find(s => s.symbol === symbol);
        return total + (stock ? stock.price * shares : 0);
      }, 0);

      setGameData(prev => ({
        ...prev,
        totalValue: prev.balance + portfolioValue
      }));

      // Generate AI insights occasionally
      if (Math.random() < 0.1) {
        setAiInsights(prev => {
          const newInsights = [generateAIInsight(), ...prev.slice(0, 4)];
          return newInsights;
        });
      }

      // Change market trend occasionally
      if (Math.random() < 0.05) {
        setMarketTrend(prev => prev === 'bullish' ? 'bearish' : 'bullish');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedStock, gameData.portfolio, gameData.balance, marketTrend, priceHistory, generateAIInsight]);

  const executeTrade = (type) => {
    const cost = selectedStock.price * tradeAmount;
    
    if (type === 'buy' && gameData.balance >= cost) {
      const newGameData = {
        ...gameData,
        balance: gameData.balance - cost,
        portfolio: {
          ...gameData.portfolio,
          [selectedStock.symbol]: (gameData.portfolio[selectedStock.symbol] || 0) + tradeAmount
        },
        transactions: [{
          type: 'BUY',
          symbol: selectedStock.symbol,
          amount: tradeAmount,
          price: selectedStock.price,
          timestamp: new Date().toLocaleTimeString()
        }, ...gameData.transactions.slice(0, 9)],
        experience: gameData.experience + 10
      };
      
      const newAchievements = checkAchievements(newGameData);
      setGameData({
        ...newGameData,
        achievements: [...gameData.achievements, ...newAchievements]
      });
    } else if (type === 'sell' && gameData.portfolio[selectedStock.symbol] >= tradeAmount) {
      const newGameData = {
        ...gameData,
        balance: gameData.balance + cost,
        portfolio: {
          ...gameData.portfolio,
          [selectedStock.symbol]: gameData.portfolio[selectedStock.symbol] - tradeAmount
        },
        transactions: [{
          type: 'SELL',
          symbol: selectedStock.symbol,
          amount: tradeAmount,
          price: selectedStock.price,
          timestamp: new Date().toLocaleTimeString()
        }, ...gameData.transactions.slice(0, 9)],
        experience: gameData.experience + 15
      };
      
      const newAchievements = checkAchievements(newGameData);
      setGameData({
        ...newGameData,
        achievements: [...gameData.achievements, ...newAchievements]
      });
    }
  };

  const profitLoss = gameData.totalValue - 10000;
  const profitLossPercent = ((profitLoss / 10000) * 100).toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Achievement Notification */}
      {showAchievement && (
        <div className="fixed top-4 right-4 z-50 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-3 rounded-lg shadow-2xl animate-bounce">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5" />
            <span className="font-bold">Achievement Unlocked: {showAchievement}!</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-purple-500/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  TradeMaster Pro
                </h1>
                <p className="text-purple-300 text-sm">Level {Math.floor(gameData.experience / 100) + 1} Trader</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <p className="text-sm text-purple-300">Portfolio Value</p>
                <p className="text-2xl font-bold">${gameData.totalValue.toLocaleString()}</p>
                <p className={`text-sm ${profitLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {profitLoss >= 0 ? '+' : ''}${profitLoss.toFixed(2)} ({profitLossPercent}%)
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-purple-300">Cash Balance</p>
                <p className="text-xl font-bold text-green-400">${gameData.balance.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Stock List & AI Insights */}
          <div className="space-y-6">
            {/* Market Trend Indicator */}
            <div className={`p-4 rounded-xl border ${marketTrend === 'bullish' ? 'bg-green-900/20 border-green-500/30' : 'bg-red-900/20 border-red-500/30'}`}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Market Trend</span>
                {marketTrend === 'bullish' ? 
                  <TrendingUp className="w-5 h-5 text-green-400" /> : 
                  <TrendingDown className="w-5 h-5 text-red-400" />
                }
              </div>
              <p className={`text-lg font-bold capitalize ${marketTrend === 'bullish' ? 'text-green-400' : 'text-red-400'}`}>
                {marketTrend}
              </p>
            </div>

            {/* Stock List */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-purple-400" />
                Available Stocks
              </h3>
              <div className="space-y-2">
                {stocks.map((stock) => {
                  const change = ((stock.price - stock.basePrice) / stock.basePrice * 100).toFixed(2);
                  const isPositive = stock.price >= stock.basePrice;
                  
                  return (
                    <div
                      key={stock.symbol}
                      onClick={() => setSelectedStock(stock)}
                      className={`p-3 rounded-lg cursor-pointer transition-all hover:scale-105 ${
                        selectedStock.symbol === stock.symbol
                          ? 'bg-purple-600/30 border border-purple-400'
                          : 'bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-bold">{stock.symbol}</p>
                          <p className="text-xs text-gray-400">{stock.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">${stock.price}</p>
                          <p className={`text-xs ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                            {isPositive ? '+' : ''}{change}%
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm rounded-xl p-4 border border-blue-500/20">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <Brain className="w-5 h-5 mr-2 text-blue-400" />
                AI Market Insights
              </h3>
              <div className="space-y-2">
                {aiInsights.slice(0, 3).map((insight, index) => (
                  <div key={index} className="p-2 bg-white/5 rounded-lg text-sm">
                    {insight}
                  </div>
                ))}
                {aiInsights.length === 0 && (
                  <p className="text-gray-400 text-sm">Analyzing market patterns...</p>
                )}
              </div>
            </div>
          </div>

          {/* Center Column - Chart & Trading */}
          <div className="space-y-6">
            {/* Price Chart */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">{selectedStock.symbol} - ${selectedStock.price}</h3>
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-yellow-400">Live</span>
                </div>
              </div>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={priceHistory[selectedStock.symbol] || []}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="timestamp" 
                      stroke="#9CA3AF"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="#9CA3AF"
                      fontSize={12}
                      domain={['dataMin - 5', 'dataMax + 5']}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#8B5CF6" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Trading Panel */}
            <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-green-400" />
                Trade {selectedStock.symbol}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Shares</label>
                  <input
                    type="number"
                    min="1"
                    value={tradeAmount}
                    onChange={(e) => setTradeAmount(parseInt(e.target.value) || 1)}
                    className="w-full p-3 bg-white/10 rounded-lg border border-purple-500/30 focus:border-purple-400 focus:outline-none"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <p className="text-sm text-gray-400">Total Cost</p>
                    <p className="text-lg font-bold text-purple-400">
                      ${(selectedStock.price * tradeAmount).toFixed(2)}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <p className="text-sm text-gray-400">Owned Shares</p>
                    <p className="text-lg font-bold text-blue-400">
                      {gameData.portfolio[selectedStock.symbol] || 0}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => executeTrade('buy')}
                    disabled={gameData.balance < selectedStock.price * tradeAmount}
                    className="w-full py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 disabled:from-gray-600 disabled:to-gray-500 rounded-lg font-bold transition-all transform hover:scale-105 disabled:hover:scale-100"
                  >
                    BUY
                  </button>
                  <button
                    onClick={() => executeTrade('sell')}
                    disabled={(gameData.portfolio[selectedStock.symbol] || 0) < tradeAmount}
                    className="w-full py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 disabled:from-gray-600 disabled:to-gray-500 rounded-lg font-bold transition-all transform hover:scale-105 disabled:hover:scale-100"
                  >
                    SELL
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Portfolio & Transactions */}
          <div className="space-y-6">
            {/* Experience Bar */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Experience</span>
                <span className="text-sm text-purple-400">{gameData.experience} XP</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(gameData.experience % 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Portfolio */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20">
              <h3 className="text-lg font-bold mb-4">Portfolio</h3>
              <div className="space-y-2">
                {Object.entries(gameData.portfolio).map(([symbol, shares]) => {
                  const stock = stocks.find(s => s.symbol === symbol);
                  const value = stock ? stock.price * shares : 0;
                  
                  return shares > 0 ? (
                    <div key={symbol} className="flex justify-between items-center p-2 bg-white/5 rounded-lg">
                      <div>
                        <p className="font-medium">{symbol}</p>
                        <p className="text-sm text-gray-400">{shares} shares</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${value.toFixed(2)}</p>
                        <p className="text-sm text-gray-400">${stock?.price.toFixed(2)}/share</p>
                      </div>
                    </div>
                  ) : null;
                })}
                {Object.keys(gameData.portfolio).length === 0 && (
                  <p className="text-gray-400 text-center py-4">No holdings yet</p>
                )}
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20">
              <h3 className="text-lg font-bold mb-4">Recent Transactions</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {gameData.transactions.map((transaction, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-white/5 rounded-lg text-sm">
                    <div>
                      <span className={`font-bold ${transaction.type === 'BUY' ? 'text-green-400' : 'text-red-400'}`}>
                        {transaction.type}
                      </span>
                      <span className="ml-2">{transaction.symbol}</span>
                    </div>
                    <div className="text-right">
                      <p>{transaction.amount} @ ${transaction.price}</p>
                      <p className="text-xs text-gray-400">{transaction.timestamp}</p>
                    </div>
                  </div>
                ))}
                {gameData.transactions.length === 0 && (
                  <p className="text-gray-400 text-center py-4">No transactions yet</p>
                )}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 backdrop-blur-sm rounded-xl p-4 border border-yellow-500/20">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-400" />
                Achievements
              </h3>
              <div className="space-y-2">
                {gameData.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center p-2 bg-yellow-500/10 rounded-lg">
                    <Award className="w-4 h-4 text-yellow-400 mr-2" />
                    <span className="text-sm">{achievement}</span>
                  </div>
                ))}
                {gameData.achievements.length === 0 && (
                  <p className="text-gray-400 text-center py-2">Start trading to unlock achievements!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingGame;