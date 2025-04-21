import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import './App.css'
import './i18n/config'

type Platform = 'lichess' | 'chesscom'

const App: React.FC = () => {
  const { t, i18n } = useTranslation()
  const [sourcePlatform, setSourcePlatform] = useState<Platform>('lichess')
  const [elo, setElo] = useState<string>('')
  const [convertedElo, setConvertedElo] = useState<string>('')
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)

  const getFlagEmoji = (langCode: string) => {
    const flags: { [key: string]: string } = {
      'en': '🇬🇧',
      'fr': '🇫🇷',
      'es': '🇪🇸',
      'de': '🇩🇪'
    }
    return flags[langCode] || '🌐'
  }

  const getLanguageName = (langCode: string) => {
    const names: { [key: string]: string } = {
      'en': 'English',
      'fr': 'Français',
      'es': 'Español',
      'de': 'Deutsch'
    }
    return names[langCode] || langCode
  }

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

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    setIsLangMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Language Selector */}
      <div className="fixed top-4 right-4 z-50">
        <div className="relative">
          <button
            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            className="flex items-center space-x-2 px-3 py-2 rounded-md bg-white shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200"
          >
            <span className="text-gray-600 flex items-center space-x-2">
              <span>{getFlagEmoji(i18n.language)}</span>
              <span className="hidden sm:inline">{getLanguageName(i18n.language)}</span>
            </span>
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {isLangMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1">
              {[
                { code: 'en', flag: '🇬🇧' },
                { code: 'fr', flag: '🇫🇷' },
                { code: 'es', flag: '🇪🇸' },
                { code: 'de', flag: '🇩🇪' }
              ].map(({ code, flag }) => (
                <button
                  key={code}
                  onClick={() => changeLanguage(code)}
                  className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-3 ${
                    i18n.language === code
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-xl">{flag}</span>
                  <span>{getLanguageName(code)}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center p-4 min-h-screen">
        <div className="bg-white rounded-xl shadow-xl p-4 sm:p-8 max-w-md w-full backdrop-blur-sm bg-opacity-90">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">{t('title')}</h1>
            <p className="text-sm sm:text-base text-gray-600">{t('subtitle')}</p>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            {/* Platform Selection */}
            <div>
              <label className="block text-gray-700 mb-2 sm:mb-3 font-medium">{t('sourcePlatform')}</label>
              <div className="flex space-x-2 sm:space-x-4">
                <button
                  onClick={() => handlePlatformChange('lichess')}
                  className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 rounded-lg border transition-all duration-200 ${
                    sourcePlatform === 'lichess'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500 hover:shadow-sm'
                  }`}
                >
                  {t('lichess')}
                </button>
                <button
                  onClick={() => handlePlatformChange('chesscom')}
                  className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 rounded-lg border transition-all duration-200 ${
                    sourcePlatform === 'chesscom'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500 hover:shadow-sm'
                  }`}
                >
                  {t('chesscom')}
                </button>
              </div>
            </div>

            {/* ELO Input */}
            <div>
              <label className="block text-gray-700 mb-2 sm:mb-3 font-medium">
                {t('yourRating', { platform: t(sourcePlatform) })}
              </label>
              <input
                type="number"
                value={elo}
                onChange={handleEloChange}
                className="w-full p-2 sm:p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 text-base"
                placeholder={t('yourRating', { platform: t(sourcePlatform) })}
              />
            </div>

            {/* Conversion Result */}
            {convertedElo && (
              <div className="mt-4 sm:mt-6 p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                <p className="text-sm sm:text-base text-gray-700 text-center">
                  {t('equivalentRating', { platform: t(sourcePlatform === 'lichess' ? 'chesscom' : 'lichess') })}
                </p>
                <p className="text-2xl sm:text-4xl font-bold text-center mt-2 sm:mt-3 text-blue-600">
                  {convertedElo}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App 