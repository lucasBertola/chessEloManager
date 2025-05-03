import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './App.css'
import './i18n/config'
import { convertLichessToChesscom, convertChesscomToLichess } from './utils/conversion'

type Platform = 'lichess' | 'chesscom'
type TimeControl = 'bullet' | 'blitz' | 'rapid'

const App: React.FC = () => {
  const { t, i18n } = useTranslation()
  const [sourcePlatform, setSourcePlatform] = useState<Platform>('lichess')
  const [timeControl, setTimeControl] = useState<TimeControl>('rapid')
  const [elo, setElo] = useState<string>('')
  const [convertedElo, setConvertedElo] = useState<string>('')
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
  const [error, setError] = useState<string>('')

  // Écouter les changements d'URL
  useEffect(() => {
    const handleUrlChange = () => {
      const urlParams = new URLSearchParams(window.location.search)
      const langParam = urlParams.get('lang')
      if (langParam && ['en', 'fr', 'es', 'pt'].includes(langParam)) {
        i18n.changeLanguage(langParam)
      }
    }

    // Écouter les changements d'URL
    window.addEventListener('popstate', handleUrlChange)
    return () => window.removeEventListener('popstate', handleUrlChange)
  }, [i18n])

  // Mettre à jour l'URL quand la langue change
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    setIsLangMenuOpen(false)
    
    // Mettre à jour l'URL sans recharger la page
    const url = new URL(window.location.href)
    url.searchParams.set('lang', lng)
    window.history.pushState({}, '', url.toString())
  }

  const getFlagEmoji = (langCode: string) => {
    const flags: { [key: string]: string } = {
      'en': '🇬🇧',
      'fr': '🇫🇷',
      'es': '🇪🇸',
      'pt': '🇧🇷'
    }
    return flags[langCode] || '🌐'
  }

  const getLanguageName = (langCode: string) => {
    const names: { [key: string]: string } = {
      'en': 'English',
      'fr': 'Français',
      'es': 'Español',
      'pt': 'Português'
    }
    return names[langCode] || langCode
  }

  const validateElo = (elo: number): boolean => {
    if (sourcePlatform === 'lichess') {
      return elo >= 400 && elo <= 2500;
    } else {
      return elo >= 150 && elo <= 2500;
    }
  };

  const convertElo = (elo: string) => {
    const numElo = parseInt(elo)
    if (isNaN(numElo)) {
      setError(t('invalidNumber'))
      return ''
    }

    if (!validateElo(numElo)) {
      setError(sourcePlatform === 'lichess' 
        ? t('lichessRangeError', { min: 400, max: 2500 })
        : t('chesscomRangeError', { min: 150, max: 2500 })
      )
      return ''
    }

    setError('')
    return sourcePlatform === 'lichess' 
      ? Math.round(convertLichessToChesscom(numElo)).toString()
      : Math.round(convertChesscomToLichess(numElo)).toString()
  }

  const handleEloChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setElo(value)
    setConvertedElo(convertElo(value))
  }

  const handlePlatformChange = (platform: Platform) => {
    setSourcePlatform(platform)
    setError('')
    setConvertedElo(convertElo(elo))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Language and GitHub Section */}
      <div className="fixed top-4 right-4 z-50 flex space-x-2">
        {/* Language Selector */}
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
                { code: 'pt', flag: '🇧🇷' }
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

        {/* GitHub Star Button */}
        <a
          href="https://github.com/lucasBertola/chessEloManager"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center px-3 py-2 rounded-md bg-white shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200"
          title={t('starOnGitHub')}
        >
          <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
        </a>
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

            {/* Time Control Selection */}
            <div>
              <label className="block text-gray-700 mb-2 sm:mb-3 font-medium">{t('timeControl')}</label>
              <div className="flex space-x-2 sm:space-x-4">
                <button
                  className="flex-1 py-2 sm:py-3 px-3 sm:px-4 rounded-lg border bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed text-sm sm:text-base"
                  disabled
                >
                  {t('bullet')}
                </button>
                <button
                  className="flex-1 py-2 sm:py-3 px-3 sm:px-4 rounded-lg border bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed text-sm sm:text-base"
                  disabled
                >
                  {t('blitz')}
                </button>
                <button
                  onClick={() => setTimeControl('rapid')}
                  className="flex-1 py-2 sm:py-3 px-3 sm:px-4 rounded-lg border bg-blue-600 text-white border-blue-600 shadow-md text-sm sm:text-base"
                >
                  {t('rapid')}
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
                className={`w-full p-2 sm:p-3 rounded-lg border ${
                  error ? 'border-red-500' : 'border-gray-300'
                } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 text-base`}
                placeholder={t('yourRating', { platform: t(sourcePlatform) })}
              />
              {error && (
                <p className="mt-2 text-sm text-red-500">
                  {error}
                </p>
              )}
            </div>

            {/* Conversion Result */}
            {convertedElo && !error && (
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