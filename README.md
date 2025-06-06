# 🏆 Chess Rating Converter

A modern web application to convert chess ratings between Lichess and Chess.com platforms.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20Site-blue)](https://lucasbertola.github.io/chessEloManager/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## ✨ Features

- 🔄 Convert ratings between Lichess and Chess.com
- ⏱️ Support for Rapid time control (Bullet and Blitz coming soon)
- 🎨 Clean and intuitive interface
- ⚡ Real-time conversion
- 🌐 Automatic deployment with GitHub Actions

## 🚀 Live Demo

Check out the live version of the application:
[https://lucasbertola.github.io/chessEloManager/](https://lucasbertola.github.io/chessEloManager/)

## 🛠️ Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- GitHub Pages
- GitHub Actions

## 📦 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/lucasBertola/chessEloManager.git
cd chessEloManager
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Building for Production

To build the app for production, run:

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🔄 Automatic Deployment

The application is automatically deployed to GitHub Pages whenever changes are pushed to the `main` branch. This is handled by GitHub Actions.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📫 Contact

If you have any questions or suggestions, feel free to open an issue or contact the maintainer.

## 📚 Additional Resources

For more information about the conversion logic and the analysis behind these calculations, you can read my articles on Lichess:

1. [Converting Chess.com to Lichess Ratings: A New Data-Driven Method](https://lichess.org/@/lucb3/blog/converting-chesscom-to-lichess-ratings-a-new-data-driven-method/Ww3v70WB)
2. [Do Stronger Players Play More Accurately? I Analyzed 35,000 Games to Find Out](https://lichess.org/@/lucb3/blog/do-stronger-players-play-more-accurately-i-analyzed-35000-games-to-find-out/Ml0nRybj)

These articles provide detailed explanations:
- The methodology used for collecting and analyzing data
- The mathematical formulas behind the conversions
- Insights into the rating differences between platforms
- Analysis of accuracy in moves based on level 