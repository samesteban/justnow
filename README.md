# JustNow Weather App

JustNow is a modern React Native application designed to provide real-time weather information with a sleek and intuitive interface. Built with Expo and stylized using NativeWind, it offers a seamless experience across different mobile platforms.

## Key Features

- **Current Weather Updates**: Get instantaneous information on current temperature, weather conditions, and more.
- **Daily Forecast**: Stay ahead of the weather with a detailed daily forecast.
- **Location-Based**: Automatically fetches weather data based on the user's current location.
- **Modern UI**: A clean, responsive design built with Tailwind CSS principles through NativeWind.
- **Robust Data Handling**: Powered by TanStack Query for efficient data fetching, caching, and state synchronization.

## Technology Stack

- **Framework**: [Expo](https://expo.dev/) (React Native)
- **Styling**: [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query/latest) v5
- **Icons**: [Lucide React Native](https://lucide.dev/guide/packages/lucide-react-native)
- **Network Client**: [Axios](https://axios-http.com/)
- **Package Manager**: [Bun](https://bun.sh/)

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Bun](https://bun.sh/)
- [Expo Go](https://expo.dev/client) on your mobile device (for development)

### Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:samesteban/justnow.git
   cd justnow
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

3. Create a `.env` file in the root directory and add your Weather API key (if required):
   ```env
   EXPO_PUBLIC_WEATHER_API_KEY=your_api_key_here
   ```

### Running the Project

Start the development server:

```bash
bun start
```

You can then open the app by scanning the QR code with the Expo Go app on Android or the Camera app on iOS.

## Available Scripts

- `bun start`: Starts the Expo development server.
- `bun android`: Runs the app on an Android emulator or connected device.
- `bun ios`: Runs the app on an iOS simulator.
- `bun web`: Runs the app in a web browser.

---

_Created by [samesteban](https://github.com/samesteban)_
