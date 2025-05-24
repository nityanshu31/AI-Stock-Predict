import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
  
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 py-16 md:py-24">
        <div className="container mx-auto px-6 flex flex-col items-center">
         
          <div className="text-center max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-200">
              Next-Gen AI Stock Predictions
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 mb-8 leading-relaxed">
              Harness the power of artificial intelligence to forecast market movements and optimize your investment strategy
            </p>
            
          
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Link to="/predict" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg transition transform hover:scale-105 hover:shadow-blue-500/20">
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"></path>
                  </svg>
                  Predict Stock Prices
                </span>
              </Link>
              <Link to="/portfolio" className="bg-purple-700 hover:bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg transition transform hover:scale-105 hover:shadow-purple-500/20">
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                  Optimize Portfolio
                </span>
              </Link>
            </div>
          </div>
          
          
          <div className="bg-gray-800/70 backdrop-blur-sm w-full max-w-4xl py-6 px-4 rounded-xl shadow-xl border border-gray-700 flex flex-wrap justify-around">
            <div className="text-center px-4 py-2">
              <p className="text-3xl md:text-4xl font-bold text-blue-400">98.2%</p>
              <p className="text-gray-400 text-sm">Prediction Accuracy</p>
            </div>
            <div className="text-center px-4 py-2">
              <p className="text-3xl md:text-4xl font-bold text-green-400">40+</p>
              <p className="text-gray-400 text-sm">Stock Symbols</p>
            </div>
            <div className="text-center px-4 py-2">
              <p className="text-3xl md:text-4xl font-bold text-purple-400">24/7</p>
              <p className="text-gray-400 text-sm">Market Analysis</p>
            </div>
            <div className="text-center px-4 py-2">
              <p className="text-3xl md:text-4xl font-bold text-yellow-400">10K+</p>
              <p className="text-gray-400 text-sm">Active Users</p>
            </div>
          </div>
        </div>
      </div>

     
      <div className="container mx-auto px-6 py-16">
     
        <div className="bg-gray-800 rounded-xl p-4 mb-16 overflow-hidden border border-gray-700">
          <div className="flex gap-8 animate-marquee">
            <div className="flex items-center">
              <span className="text-gray-400 mr-2">TSLA</span>
              <span className="text-green-500 font-semibold">$824.40</span>
              <span className="text-green-400 text-xs ml-1">+2.4%</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-400 mr-2">AAPL</span>
              <span className="text-green-500 font-semibold">$172.10</span>
              <span className="text-green-400 text-xs ml-1">+1.2%</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-400 mr-2">MSFT</span>
              <span className="text-red-500 font-semibold">$288.70</span>
              <span className="text-red-400 text-xs ml-1">-0.8%</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-400 mr-2">GOOGL</span>
              <span className="text-green-500 font-semibold">$2,402.30</span>
              <span className="text-green-400 text-xs ml-1">+1.7%</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-400 mr-2">AMZN</span>
              <span className="text-green-500 font-semibold">$3,055.70</span>
              <span className="text-green-400 text-xs ml-1">+3.1%</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-400 mr-2">NVDA</span>
              <span className="text-red-500 font-semibold">$196.80</span>
              <span className="text-red-400 text-xs ml-1">-2.3%</span>
            </div>
          </div>
        </div>

        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Powered by Advanced AI</h2>
          <p className="text-gray-400 text-lg mb-12 max-w-3xl mx-auto">
            Our platform combines cutting-edge machine learning algorithms with comprehensive market data
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl shadow-lg">
              <div className="bg-blue-900/50 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Real-Time Analysis</h3>
              <p className="text-gray-400">
                Our AI processes thousands of data points per second to deliver up-to-the-minute market insights and predictions.
              </p>
            </div>

            
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl shadow-lg">
              <div className="bg-purple-900/50 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Predictive Models</h3>
              <p className="text-gray-400">
                Leveraging neural networks and machine learning to forecast stock prices with unprecedented accuracy.
              </p>
            </div>

           
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-green-500 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl shadow-lg">
              <div className="bg-green-900/50 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Portfolio Optimization</h3>
              <p className="text-gray-400">
                Maximize returns and minimize risk with our AI-powered portfolio balancing and investment recommendations.
              </p>
            </div>

            
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-yellow-500 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl shadow-lg">
              <div className="bg-yellow-900/50 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Risk Analysis</h3>
              <p className="text-gray-400">
                Comprehensive risk assessment tools that help you understand potential market volatility and make safer investments.
              </p>
            </div>

       
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-red-500 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl shadow-lg">
              <div className="bg-red-900/50 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Detailed Reports</h3>
              <p className="text-gray-400">
                Generate comprehensive stock analysis reports with actionable insights and clear visualization of market trends.
              </p>
            </div>

           
            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 hover:border-indigo-500 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl shadow-lg">
              <div className="bg-indigo-900/50 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Custom Alerts</h3>
              <p className="text-gray-400">
                Set personalized price alerts and receive instant notifications when market conditions match your criteria.
              </p>
            </div>
          </div>
        </div>

       
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Trusted by Investors Worldwide</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 relative">
              <div className="text-yellow-400 text-2xl absolute -top-4 left-6">★★★★★</div>
              <p className="mt-4 text-gray-300 mb-4">
                "This platform's AI predictions have completely transformed my investment strategy. The accuracy is impressive!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center mr-3">
                  <span className="font-semibold text-blue-300">JD</span>
                </div>
                <div>
                  <p className="font-semibold">James Dalton</p>
                  <p className="text-gray-400 text-sm">Day Trader</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 relative">
              <div className="text-yellow-400 text-2xl absolute -top-4 left-6">★★★★★</div>
              <p className="mt-4 text-gray-300 mb-4">
                "The portfolio optimization tools helped me increase my returns by 32% in just three months. Incredible service!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-purple-900 flex items-center justify-center mr-3">
                  <span className="font-semibold text-purple-300">SM</span>
                </div>
                <div>
                  <p className="font-semibold">Sarah Mitchell</p>
                  <p className="text-gray-400 text-sm">Investment Analyst</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 relative">
              <div className="text-yellow-400 text-2xl absolute -top-4 left-6">★★★★★</div>
              <p className="mt-4 text-gray-300 mb-4">
                "As a financial advisor, I rely on this platform daily. The AI insights give me an edge that my clients appreciate."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-900 flex items-center justify-center mr-3">
                  <span className="font-semibold text-green-300">RL</span>
                </div>
                <div>
                  <p className="font-semibold">Robert Lee</p>
                  <p className="text-gray-400 text-sm">Financial Advisor</p>
                </div>
              </div>
            </div>
          </div>
        </div>

       
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-2xl p-8 md:p-12 text-center shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Investments?</h2>
          <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
            Join thousands of investors who are already leveraging our AI-powered platform to make smarter investment decisions.
          </p>
          <Link to="/predict" className="bg-white text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold shadow-lg inline-block hover:bg-gray-100 transition transform hover:scale-105">
            Get Started Now
          </Link>
          <p className="text-blue-300 mt-4 text-sm">No credit card required. Start your journey today.</p>
        </div>
      </div>

     
      <div className="bg-gray-900 py-8 mt-16">
        <div className="container mx-auto px-6 text-center text-gray-400">
          <p>© 2025 AI Stock Predictor. All rights reserved.</p>
          <p className="text-sm mt-2">Disclaimer: Market predictions are not financial advice. Invest at your own risk.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;

