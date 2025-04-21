import React, { useState } from 'react'
import './App.css'

type Platform = 'lichess' | 'chesscom'
type TimeControl = 'bullet' | 'blitz' | 'rapid'

const App: React.FC = () => {
  const [sourcePlatform, setSourcePlatform] = useState<Platform>('lichess')
  const [timeControl, setTimeControl] = useState<TimeControl>('rapid')
  const [elo, setElo] = useState<string>('')
  const [convertedElo, setConvertedElo] = useState<string>('')

  const convertElo = (elo: string) => {
    const numElo = parseInt(elo)
    if (isNaN(numElo)) return ''
    return sourcePlatform === 'lichess' 
      ? (numElo + 300).toString() 
      : (numElo - 300).toString()
  }

  const handleEloChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setElo(value)
    setConvertedElo(convertElo(value))
  }

  const handlePlatformChange = (platform: Platform) => {
    setSourcePlatform(platform)
    setConvertedElo(convertElo(elo))
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">Chess Rating Converter</h1>
          <p className="text-gray-600">Convert your rating between Lichess and Chess.com</p>
        </div>
        
        <div className="space-y-6">
          {/* Platform Selection */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Source Platform</label>
            <div className="flex space-x-4">
              <button
                onClick={() => handlePlatformChange('lichess')}
                className={`flex-1 py-2 px-4 rounded-md border ${
                  sourcePlatform === 'lichess'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'
                }`}
              >
                Lichess
              </button>
              <button
                onClick={() => handlePlatformChange('chesscom')}
                className={`flex-1 py-2 px-4 rounded-md border ${
                  sourcePlatform === 'chesscom'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'
                }`}
              >
                Chess.com
              </button>
            </div>
          </div>

          {/* Time Control Selection */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Time Control</label>
            <div className="flex space-x-4">
              <button
                className="flex-1 py-2 px-4 rounded-md border bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                disabled
              >
                Bullet
              </button>
              <button
                className="flex-1 py-2 px-4 rounded-md border bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                disabled
              >
                Blitz
              </button>
              <button
                onClick={() => setTimeControl('rapid')}
                className={`flex-1 py-2 px-4 rounded-md border ${
                  timeControl === 'rapid'
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'
                }`}
              >
                Rapid
              </button>
            </div>
          </div>

          {/* ELO Input */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Your {sourcePlatform === 'lichess' ? 'Lichess' : 'Chess.com'} Rating
            </label>
            <input
              type="number"
              value={elo}
              onChange={handleEloChange}
              className="w-full p-3 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              placeholder={`Enter your ${sourcePlatform === 'lichess' ? 'Lichess' : 'Chess.com'} rating`}
            />
          </div>

          {/* Conversion Result */}
          {convertedElo && (
            <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-100">
              <p className="text-gray-700 text-center">
                Your equivalent rating on{' '}
                <span className="font-semibold text-blue-600">
                  {sourcePlatform === 'lichess' ? 'Chess.com' : 'Lichess'}
                </span>
              </p>
              <p className="text-3xl font-bold text-center mt-2 text-blue-600">
                {convertedElo}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App 