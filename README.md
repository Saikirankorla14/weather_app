 Weather App

 Production url: https://weather-app-rho-two-56.vercel.app/
A sleek and responsive weather application built using React. This app fetches real-time weather data from the OpenWeatherMap API and displays key information such as temperature, humidity, weather description, and forecast icons.
🔍 Features
•	🌡️ Current temperature
•	💧 Humidity levels
•	🌦️ Weather condition with icons
•	🧭 City-based search
•	📱 Responsive UI for desktop and mobile
####🚀 Demo
[![Demo Video](demo/screenshot.png)](demo/weather_app.mp4)

•	React (with Hooks)
•	Axios for HTTP requests
•	OpenWeatherMap API
•	CSS / Tailwind / Styled-components
⚙️ Setup Instructions
1. Clone the repo
```bash
git clone https://github.com/your-username/weather-app.git
cd weather-app
```
2. Install dependencies
```bash
npm install
```
3. Get your API key
- Sign up at https://openweathermap.org/api
- Copy your API key
4. Add API key to .env
Create a `.env` file in the root folder and add:
```
REACT_APP_WEATHER_API_KEY=your_api_key_here
```
> ⚠️ Don't forget to add `.env` to your `.gitignore`!
5. Run the app
```bash
npm start
```
The app will be available at http://localhost:3000.
📁 Project Structure

weather-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── WeatherCard.js
│   ├── App.js
│   ├── api.js
│   ├── utils.js
│   └── index.js
├── .env
├── package.json
└── README.md

📸 Screenshots
| Desktop View | Mobile View |
|--------------|-------------|
| ![desktop](./screenshots/desktop.png) | ![mobile](./screenshots/mobile.png) |
🧠 Future Improvements
•	Add hourly and 7-day forecast
•	Use geolocation for auto-detecting user location
•	Add dark mode toggle
•	Store recent searches
🤝 Contributing
Feel free to open issues or submit pull requests!
Make sure to follow best practices and keep code clean and modular.
