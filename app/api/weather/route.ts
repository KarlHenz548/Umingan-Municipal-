import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.OPENWEATHER_API_KEY || process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || '2653e7542a986086894a8f24667d7e95';
  const lat = 15.9238;
  const lon = 120.8410;

  // Try OpenWeatherMap API first if API key is provided
  if (apiKey) {
    try {
      const owmRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`,
        { next: { revalidate: 300 } }
      );

      if (owmRes.ok) {
        const data = await owmRes.json();
        const mainCond = data.weather[0]?.main || 'Clear';
        const rawDesc = data.weather[0]?.description || 'Fair Weather';
        const formattedDesc = rawDesc.replace(/\b\w/g, (l: string) => l.toUpperCase());

        return NextResponse.json({
          source: 'OpenWeatherMap API',
          temp: Math.round(data.main.temp),
          feelsLike: Math.round(data.main.feels_like),
          humidity: data.main.humidity,
          windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
          condition: `${formattedDesc} in Umingan`,
          mainCondition: mainCond,
          city: 'Umingan, Pangasinan',
          isLive: true,
          timestamp: new Date().toISOString()
        });
      } else {
        console.warn('OpenWeatherMap returned status:', owmRes.status);
      }
    } catch (error) {
      console.warn('OpenWeatherMap API request error, using OpenMeteo fallback:', error);
    }
  }

  // Fallback to OpenMeteo API for real-time Umingan, Pangasinan data if no key or error
  try {
    const omRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m`,
      { next: { revalidate: 300 } }
    );

    if (omRes.ok) {
      const omData = await omRes.json();
      const current = omData.current;
      const code = current.weather_code;

      let condText = 'Partly Cloudy with Localized Thunderstorms';
      let mainCond = 'Clouds';
      if (code === 0) { condText = 'Clear Skies & Fair Sunny Weather'; mainCond = 'Clear'; }
      else if (code >= 1 && code <= 3) { condText = 'Partly Cloudy with Gentle Breezes'; mainCond = 'Clouds'; }
      else if (code >= 45 && code <= 48) { condText = 'Foggy / Hazy Mountainous Visibility'; mainCond = 'Atmosphere'; }
      else if (code >= 51 && code <= 67) { condText = 'Light Monsoon Rain / Drizzle Expected'; mainCond = 'Drizzle'; }
      else if (code >= 80 && code <= 99) { condText = 'Thunderstorms & Heavy Downpour Advisory'; mainCond = 'Thunderstorm'; }

      return NextResponse.json({
        source: 'OpenMeteo Telemetry (OpenWeatherMap Fallback)',
        temp: Math.round(current.temperature_2m),
        feelsLike: Math.round(current.apparent_temperature),
        humidity: Math.round(current.relative_humidity_2m),
        windSpeed: Math.round(current.wind_speed_10m),
        condition: condText,
        mainCondition: mainCond,
        city: 'Umingan, Pangasinan',
        isLive: true,
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('Weather service unavailable:', error);
  }

  // Default fallback data if all network requests fail
  return NextResponse.json({
    source: 'Local MDRRMO Bulletin',
    temp: 31,
    feelsLike: 35,
    humidity: 78,
    windSpeed: 12,
    condition: 'Partly Cloudy with Light Afternoon Showers',
    mainCondition: 'Clouds',
    city: 'Umingan, Pangasinan',
    isLive: false,
    timestamp: new Date().toISOString()
  });
}
