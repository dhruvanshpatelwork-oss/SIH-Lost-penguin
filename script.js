    "use strict";

    const DEFAULT_LOCATION = {
      name: "Kottayam",
      admin1: "Kerala",
      country: "India",
      latitude: 9.5916,
      longitude: 76.5222
    };

    const state = {
      location: { ...DEFAULT_LOCATION },
      weather: null,
      air: null,
      language: "en",
      loading: false,
      cacheKey: ""
    };

    const $ = (selector) => document.querySelector(selector);

    const elements = {
      rain: $("#rain"),
      messages: $("#messages"),
      welcome: $("#welcome"),
      userInput: $("#userInput"),
      chatForm: $("#chatForm"),
      locationForm: $("#locationForm"),
      locationInput: $("#locationInput"),
      locationLabel: $("#locationLabel"),
      useLocationBtn: $("#useLocationBtn"),
      languageSelect: $("#languageSelect"),
      heroLocation: $("#heroLocation"),
      updatedLabel: $("#updatedLabel"),
      heroIcon: $("#heroIcon"),
      heroCondition: $("#heroCondition"),
      heroTemperature: $("#heroTemperature"),
      heroFeels: $("#heroFeels"),
      insightMain: $("#insightMain"),
      insightDetail: $("#insightDetail"),
      insightRisk: $("#insightRisk"),
      humidityValue: $("#humidityValue"),
      windValue: $("#windValue"),
      rainValue: $("#rainValue"),
      aqiValue: $("#aqiValue"),
      hourlyForecast: $("#hourlyForecast"),
      forecastSource: $("#forecastSource"),
      micBtn: $("#micBtn"),
      toast: $("#toast")
    };

    const icons = {
      sun: `
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
        </svg>
      `,

      partly: `
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round">
          <circle cx="16" cy="8" r="3"/>
          <path d="M16 3v1M16 12v1M11 8h1M20 8h1M12.5 4.5l.7.7M19.5 11.5l.7.7"/>
          <path d="M17.5 19H9a5 5 0 1 1 4.8-6.43A3.5 3.5 0 1 1 17.5 19Z"/>
        </svg>
      `,

      cloud: `
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round">
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
        </svg>
      `,

      rain: `
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round">
          <path d="M16 13v8M8 13v8M12 15v8M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/>
        </svg>
      `,

      storm: `
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round">
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
          <path d="m13 12-3 5h3l-1 5 4-7h-3l2-3Z"/>
        </svg>
      `,

      snow: `
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round">
          <path d="M17.5 13H9a5 5 0 1 1 4.8-6.43A3.5 3.5 0 1 1 17.5 13Z"/>
          <path d="M8 17v4M6 19h4M16 17v4M14 19h4"/>
        </svg>
      `,

      fog: `
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 10h16M3 14h18M6 18h12"/>
        </svg>
      `,

      droplet: `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2s6 7.2 6 11.5a6 6 0 0 1-12 0C6 9.2 12 2 12 2Z"/>
        </svg>
      `,

      wind: `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round">
          <path d="M9.6 4.6A2 2 0 1 1 11 8H2M12.6 19.4A2 2 0 1 0 14 16H2M17.6 7.6A2 2 0 1 1 19 11H2"/>
        </svg>
      `,

      rainSmall: `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round">
          <path d="M16 13v8M8 13v8M12 15v8M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/>
        </svg>
      `,

      check: `
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <path d="m22 4-10 10.01-3-3"/>
        </svg>
      `,

      alert: `
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round">
          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/>
          <path d="M12 9v4M12 17h.01"/>
        </svg>
      `
    };

    function escapeHtml(value) {
      return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    }

    function showToast(message) {
      elements.toast.textContent = message;
      elements.toast.classList.add("show");

      window.clearTimeout(showToast.timer);
      showToast.timer = window.setTimeout(() => {
        elements.toast.classList.remove("show");
      }, 3500);
    }

    function formatTime(isoTime) {
      if (!isoTime) return "--";

      const date = new Date(isoTime);

      return date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit"
      });
    }

    function formatDay(isoDate, index) {
      if (index === 0) return "Today";

      return new Date(isoDate).toLocaleDateString([], {
        weekday: "short"
      });
    }

    function weatherDescription(code) {
      const descriptions = {
        0: "Clear sky",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Foggy",
        48: "Depositing rime fog",
        51: "Light drizzle",
        53: "Moderate drizzle",
        55: "Dense drizzle",
        56: "Light freezing drizzle",
        57: "Dense freezing drizzle",
        61: "Light rain",
        63: "Moderate rain",
        65: "Heavy rain",
        66: "Light freezing rain",
        67: "Heavy freezing rain",
        71: "Light snow",
        73: "Moderate snow",
        75: "Heavy snow",
        77: "Snow grains",
        80: "Light rain showers",
        81: "Moderate rain showers",
        82: "Violent rain showers",
        85: "Light snow showers",
        86: "Heavy snow showers",
        95: "Thunderstorm",
        96: "Thunderstorm with hail",
        99: "Severe thunderstorm with hail"
      };

      return descriptions[code] || "Variable conditions";
    }

    function weatherIcon(code) {
      if ([95, 96, 99].includes(code)) return icons.storm;
      if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
        return icons.rain;
      }
      if ([71, 73, 75, 77, 85, 86].includes(code)) return icons.snow;
      if ([45, 48].includes(code)) return icons.fog;
      if (code === 0) return icons.sun;
      if ([1, 2].includes(code)) return icons.partly;
      return icons.cloud;
    }

    function isSevereCode(code) {
      return [65, 67, 82, 95, 96, 99].includes(code);
    }

    function getWeatherCacheKey(location) {
      return `weathergpt:${location.latitude.toFixed(3)}:${location.longitude.toFixed(3)}`;
    }

    function saveCache(payload) {
      try {
        localStorage.setItem(
          state.cacheKey,
          JSON.stringify({
            savedAt: Date.now(),
            payload
          })
        );
      } catch {
        // Storage may be disabled. The app still works without it.
      }
    }

    function readCache() {
      try {
        const raw = localStorage.getItem(state.cacheKey);

        if (!raw) return null;

        const cached = JSON.parse(raw);

        if (!cached.payload || !cached.savedAt) return null;

        return cached;
      } catch {
        return null;
      }
    }

    async function fetchJson(url, timeoutMs = 10000) {
      const controller = new AbortController();
      const timer = window.setTimeout(() => controller.abort(), timeoutMs);

      try {
        const response = await fetch(url, {
          signal: controller.signal,
          headers: {
            Accept: "application/json"
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        return await response.json();
      } finally {
        window.clearTimeout(timer);
      }
    }

    async function fetchWeather(location) {
      const params = new URLSearchParams({
        latitude: location.latitude,
        longitude: location.longitude,
        timezone: "auto",
        forecast_days: "7",
        current: [
          "temperature_2m",
          "relative_humidity_2m",
          "apparent_temperature",
          "precipitation",
          "rain",
          "weather_code",
          "wind_speed_10m",
          "wind_direction_10m",
          "is_day"
        ].join(","),
        hourly: [
          "temperature_2m",
          "precipitation_probability",
          "precipitation",
          "weather_code",
          "wind_speed_10m"
        ].join(","),
        daily: [
          "weather_code",
          "temperature_2m_max",
          "temperature_2m_min",
          "precipitation_probability_max",
          "precipitation_sum",
          "wind_speed_10m_max",
          "uv_index_max"
        ].join(",")
      });

      const airParams = new URLSearchParams({
        latitude: location.latitude,
        longitude: location.longitude,
        timezone: "auto",
        forecast_days: "1",
        current: [
          "european_aqi",
          "pm2_5",
          "pm10",
          "uv_index"
        ].join(",")
      });

      const [weatherResult, airResult] = await Promise.allSettled([
        fetchJson(`https://api.open-meteo.com/v1/forecast?${params}`),
        fetchJson(`https://air-quality-api.open-meteo.com/v1/air-quality?${airParams}`)
      ]);

      if (weatherResult.status !== "fulfilled") {
        throw weatherResult.reason || new Error("Weather request failed");
      }

      return {
        weather: weatherResult.value,
        air: airResult.status === "fulfilled" ? airResult.value : null
      };
    }

    function getCurrentHourIndex(weather) {
      const currentTime = weather.current?.time;
      const times = weather.hourly?.time || [];

      if (!currentTime || !times.length) return 0;

      let bestIndex = 0;
      let bestDifference = Infinity;
      const currentTimestamp = new Date(currentTime).getTime();

      times.forEach((time, index) => {
        const difference = Math.abs(new Date(time).getTime() - currentTimestamp);

        if (difference < bestDifference) {
          bestDifference = difference;
          bestIndex = index;
        }
      });

      return bestIndex;
    }

    function calculateAdvice(weather, air) {
      const current = weather.current || {};
      const index = getCurrentHourIndex(weather);
      const hourly = weather.hourly || {};
      const rainChance = Number(hourly.precipitation_probability?.[index] || 0);
      const code = Number(current.weather_code || 0);
      const temperature = Number(current.temperature_2m || 0);
      const apparent = Number(current.apparent_temperature || temperature);
      const wind = Number(current.wind_speed_10m || 0);
      const aqi = Number(air?.current?.european_aqi || 0);

      if (isSevereCode(code) || rainChance >= 80 || wind >= 45) {
        return {
          title: "Plan carefully before going out",
          detail: "Heavy rain, thunderstorms, or strong wind may affect outdoor plans. Check official local warnings.",
          level: "High",
          color: "var(--red)"
        };
      }

      if (apparent >= 38 || temperature >= 36) {
        return {
          title: "Take heat precautions",
          detail: "Hydrate, reduce strenuous outdoor work, and avoid prolonged midday exposure.",
          level: "Moderate",
          color: "var(--orange)"
        };
      }

      if (rainChance >= 60) {
        return {
          title: "Carry rain protection",
          detail: `Rain is likely around the current forecast window, with a ${rainChance}% probability.`,
          level: "Moderate",
          color: "var(--orange)"
        };
      }

      if (aqi >= 101) {
        return {
          title: "Limit prolonged outdoor exposure",
          detail: `Air quality is currently in a range where sensitive people should take extra care.`,
          level: "Moderate",
          color: "var(--orange)"
        };
      }

      if (wind >= 30) {
        return {
          title: "Expect noticeable wind",
          detail: "Secure loose objects and take care near exposed roads, rooftops, and open areas.",
          level: "Low",
          color: "var(--green)"
        };
      }

      return {
        title: "Good conditions for most plans",
        detail: "No major weather risk is detected in the current forecast signals.",
        level: "Low",
        color: "var(--green)"
      };
    }

    function setLoading(isLoading) {
      state.loading = isLoading;

      if (isLoading) {
        elements.updatedLabel.textContent = "Fetching live conditions…";
        elements.hourlyForecast.innerHTML = `<div class="loading">Loading hourly forecast…</div>`;
      }
    }

    function renderDashboard(payload, fromCache = false) {
      const weather = payload.weather;
      const air = payload.air;
      const current = weather.current || {};
      const advice = calculateAdvice(weather, air);

      state.weather = weather;
      state.air = air;

      const locationName = state.location.admin1
        ? `${state.location.name}, ${state.location.admin1}`
        : state.location.name;

      elements.locationLabel.textContent = state.location.name;
      elements.heroLocation.textContent = locationName;
      elements.updatedLabel.textContent = fromCache
        ? "Showing cached data while reconnecting"
        : `Updated ${formatTime(current.time)} · ${weather.timezone_abbreviation || ""}`;

      elements.heroIcon.innerHTML = weatherIcon(Number(current.weather_code));
      elements.heroCondition.textContent = weatherDescription(Number(current.weather_code));
      elements.heroTemperature.textContent = `${Math.round(Number(current.temperature_2m || 0))}°`;
      elements.heroFeels.textContent = `Feels like ${Math.round(Number(current.apparent_temperature || 0))}°`;

      elements.humidityValue.textContent = `${Math.round(Number(current.relative_humidity_2m || 0))}%`;
      elements.windValue.textContent = `${Math.round(Number(current.wind_speed_10m || 0))} km/h`;

      const hourIndex = getCurrentHourIndex(weather);
      const currentRainChance = Number(
        weather.hourly?.precipitation_probability?.[hourIndex] || 0
      );

      elements.rainValue.textContent = `${currentRainChance}%`;

      const aqi = air?.current?.european_aqi;
      elements.aqiValue.textContent = Number.isFinite(Number(aqi))
        ? Math.round(Number(aqi))
        : "N/A";

      elements.insightMain.textContent = advice.title;
      elements.insightDetail.textContent = advice.detail;
      elements.insightRisk.style.color = advice.color;
      elements.insightRisk.innerHTML = `
        <span class="risk-dot"></span>
        ${advice.level} risk signal
      `;

      renderHourly(weather);
    }

    function renderHourly(weather) {
      const hourly = weather.hourly || {};
      const startIndex = getCurrentHourIndex(weather);
      const endIndex = Math.min(startIndex + 10, hourly.time?.length || 0);

      if (!endIndex) {
        elements.hourlyForecast.innerHTML = `<div class="loading">Hourly data unavailable.</div>`;
        return;
      }

      const fragment = document.createDocumentFragment();

      for (let index = startIndex; index < endIndex; index += 1) {
        const hour = document.createElement("div");
        hour.className = `hour${index === startIndex ? " active" : ""}`;

        const code = Number(hourly.weather_code?.[index] || 0);
        const temperature = Math.round(Number(hourly.temperature_2m?.[index] || 0));
        const rainChance = Math.round(Number(hourly.precipitation_probability?.[index] || 0));

        hour.innerHTML = `
          <div class="hour-time">${index === startIndex ? "Now" : formatTime(hourly.time[index])}</div>
          <div class="hour-icon">${weatherIcon(code)}</div>
          <div class="hour-temp">${temperature}°</div>
          <div class="hour-rain">${rainChance}% rain</div>
        `;

        fragment.appendChild(hour);
      }

      elements.hourlyForecast.replaceChildren(fragment);
    }

    function resetChat() {
      elements.messages.innerHTML = `
        <div class="welcome" id="welcome">
          <div class="welcome-message">
            Ask me whether it is safe to travel, when rain is likely,
            whether you need an umbrella, or what the next seven days look like.
          </div>

          <div class="quick-actions">
            <button class="quick-action" type="button" data-question="Can I travel outside today?">
              Can I travel today?
            </button>
            <button class="quick-action" type="button" data-question="Will it rain tomorrow?">
              Rain tomorrow?
            </button>
            <button class="quick-action" type="button" data-question="Show the 7-day forecast">
              7-day forecast
            </button>
            <button class="quick-action" type="button" data-question="Any severe weather alerts?">
              Weather alerts
            </button>
          </div>
        </div>
      `;

      bindQuickActions();
    }

    function appendBubble(text, type = "bot") {
      const bubble = document.createElement("div");
      bubble.className = `bubble ${type === "user" ? "user-bubble" : "bot-bubble"}`;

      if (type === "user") {
        bubble.textContent = text;
      } else {
        bubble.innerHTML = text;
      }

      elements.messages.appendChild(bubble);
      scrollMessages();
      return bubble;
    }

    function appendTyping() {
      const typing = document.createElement("div");
      typing.className = "typing";
      typing.innerHTML = "<span></span><span></span><span></span>";
      elements.messages.appendChild(typing);
      scrollMessages();
      return typing;
    }

    function scrollMessages() {
      elements.messages.scrollTop = elements.messages.scrollHeight;
    }

    function buildSevenDayCard() {
      const daily = state.weather?.daily;

      if (!daily?.time?.length) {
        return `<div class="bubble bot-bubble error-bubble">The 7-day forecast is temporarily unavailable.</div>`;
      }

      const rows = daily.time.slice(0, 7).map((date, index) => {
        const code = Number(daily.weather_code?.[index] || 0);
        const max = Math.round(Number(daily.temperature_2m_max?.[index] || 0));
        const min = Math.round(Number(daily.temperature_2m_min?.[index] || 0));
        const rain = Math.round(Number(daily.precipitation_probability_max?.[index] || 0));

        return `
          <div class="day-row">
            <strong>${formatDay(date, index)}</strong>
            <span class="day-icon">${weatherIcon(code)}</span>
            <span>${max}° / ${min}°</span>
            <span class="day-rain">${rain}%</span>
          </div>
        `;
      }).join("");

      return `
        <div class="forecast-message-card">
          <h3>Seven-day outlook</h3>
          <p>High / low temperature and maximum precipitation probability.</p>
          <div class="seven-days">${rows}</div>
        </div>
      `;
    }

    function buildChatReply(question) {
      const weather = state.weather;
      const air = state.air;

      if (!weather) {
        return `<div class="bubble bot-bubble error-bubble">Weather data is still loading. Please try again in a moment.</div>`;
      }

      const lower = question.toLowerCase();
      const current = weather.current || {};
      const index = getCurrentHourIndex(weather);
      const hourly = weather.hourly || {};
      const rainChance = Math.round(Number(hourly.precipitation_probability?.[index] || 0));
      const code = Number(current.weather_code || 0);
      const wind = Math.round(Number(current.wind_speed_10m || 0));
      const apparent = Math.round(Number(current.apparent_temperature || 0));
      const advice = calculateAdvice(weather, air);

      if (
        lower.includes("7-day") ||
        lower.includes("7 day") ||
        lower.includes("week") ||
        lower.includes("forecast")
      ) {
        return buildSevenDayCard();
      }

      if (
        lower.includes("alert") ||
        lower.includes("severe") ||
        lower.includes("warning") ||
        lower.includes("danger")
      ) {
        const active = isSevereCode(code) || rainChance >= 80 || wind >= 45;

        return `
          <div class="alert-card${active ? " active" : ""}">
            ${active ? icons.alert : icons.check}
            <div>
              <div class="alert-title">
                ${active ? "Elevated weather risk detected" : "No severe signal detected"}
              </div>
              <div class="alert-sub">
                ${active
                  ? `${weatherDescription(code)} is currently reported with a ${rainChance}% rain probability and ${wind} km/h wind. Check official local warnings before travelling.`
                  : "The current forecast does not show a major severe-weather signal. Continue monitoring official alerts during changing conditions."
                }
              </div>
            </div>
          </div>
        `;
      }

      if (
        lower.includes("rain") ||
        lower.includes("umbrella") ||
        lower.includes("outside") ||
        lower.includes("travel") ||
        lower.includes("go out")
      ) {
        return `
          <div class="bubble bot-bubble">
            <strong>${escapeHtml(advice.title)}</strong><br>
            ${escapeHtml(advice.detail)}
            <br><br>
            Current conditions are <strong>${escapeHtml(weatherDescription(code).toLowerCase())}</strong>,
            with a ${rainChance}% rain probability and wind near ${wind} km/h.
          </div>
        `;
      }

      if (
        lower.includes("heat") ||
        lower.includes("hot") ||
        lower.includes("temperature")
      ) {
        return `
          <div class="bubble bot-bubble">
            It is currently <strong>${Math.round(Number(current.temperature_2m || 0))}°C</strong>,
            with a feels-like temperature of <strong>${apparent}°C</strong>.
            ${apparent >= 38
              ? "Hydrate well and avoid strenuous midday outdoor activity."
              : "Conditions do not currently indicate an extreme heat signal."
            }
          </div>
        `;
      }

      if (
        lower.includes("air") ||
        lower.includes("pollution") ||
        lower.includes("aqi")
      ) {
        const aqi = Number(air?.current?.european_aqi);

        return `
          <div class="bubble bot-bubble">
            The current European air-quality index is
            <strong>${Number.isFinite(aqi) ? Math.round(aqi) : "unavailable"}</strong>.
            ${Number.isFinite(aqi) && aqi > 100
              ? "Sensitive people should consider reducing prolonged outdoor exposure."
              : "No elevated air-quality signal is available in the current data."
            }
          </div>
        `;
      }

      return `
        <div class="bubble bot-bubble">
          It is currently <strong>${Math.round(Number(current.temperature_2m || 0))}°C</strong>
          and ${escapeHtml(weatherDescription(code).toLowerCase())}.
          ${escapeHtml(advice.title)}.
          Ask me about rain, alerts, air quality, travel, heat, or the 7-day forecast.
        </div>
      `;
    }

    async function sendMessage(presetText) {
      const text = (presetText ?? elements.userInput.value).trim();

      if (!text || state.loading) return;

      if (elements.welcome) {
        elements.welcome.remove();
      }

      appendBubble(escapeHtml(text), "user");
      elements.userInput.value = "";

      const typing = appendTyping();

      await new Promise((resolve) => window.setTimeout(resolve, 450));

      typing.remove();
      appendBubble(buildChatReply(text), "bot");
    }

    async function loadLocation(location, options = {}) {
      const { showCache = true } = options;

      state.location = {
        name: location.name || "Unknown location",
        admin1: location.admin1 || "",
        country: location.country || "",
        latitude: Number(location.latitude),
        longitude: Number(location.longitude)
      };

      state.cacheKey = getWeatherCacheKey(state.location);

      const cached = showCache ? readCache() : null;

      if (cached?.payload) {
        renderDashboard(cached.payload, true);
      }

      setLoading(true);

      try {
        const payload = await fetchWeather(state.location);

        saveCache(payload);
        renderDashboard(payload, false);
        state.loading = false;
      } catch (error) {
        state.loading = false;

        if (!cached?.payload) {
          elements.updatedLabel.textContent = "Live weather is unavailable";
          elements.insightMain.textContent = "Could not load current conditions";
          elements.insightDetail.textContent = "Check your connection and try again.";
          elements.hourlyForecast.innerHTML = `<div class="loading">Forecast unavailable.</div>`;
        }

        showToast("Could not refresh live weather. Showing available data.");
        console.error("WeatherGPT data error:", error);
      }
    }

    async function searchLocation(query) {
      const cleanQuery = query.trim();

      if (!cleanQuery) return;

      try {
        const params = new URLSearchParams({
          name: cleanQuery,
          count: "5",
          language: state.language === "ml" ? "ml" : "en",
          format: "json"
        });

        const data = await fetchJson(
          `https://geocoding-api.open-meteo.com/v1/search?${params}`
        );

        if (!data.results?.length) {
          showToast("No matching location was found.");
          return;
        }

        const result = data.results[0];

        await loadLocation({
          name: result.name,
          admin1: result.admin1 || "",
          country: result.country || "",
          latitude: result.latitude,
          longitude: result.longitude
        });

        elements.locationInput.value = "";
      } catch (error) {
        showToast("Location search failed. Please try again.");
        console.error("Location search error:", error);
      }
    }

    function useBrowserLocation() {
      if (!navigator.geolocation) {
        showToast("Geolocation is not supported by this browser.");
        return;
      }

      elements.locationLabel.textContent = "Detecting…";

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          await loadLocation({
            name: "Your location",
            admin1: "",
            country: "",
            latitude,
            longitude
          });
        },
        () => {
          elements.locationLabel.textContent = state.location.name;
          showToast("Location permission was unavailable. Showing the selected city.");
        },
        {
          enableHighAccuracy: true,
          timeout: 9000,
          maximumAge: 300000
        }
      );
    }

    function bindQuickActions() {
      document.querySelectorAll("[data-question]").forEach((button) => {
        button.addEventListener("click", () => {
          sendMessage(button.dataset.question);
        });
      });
    }

    function initRain() {
      const fragment = document.createDocumentFragment();

      for (let i = 0; i < 24; i += 1) {
        const drop = document.createElement("div");
        drop.className = "drop";
        drop.style.left = `${Math.random() * 58}%`;
        drop.style.animationDuration = `${.9 + Math.random() * 1.3}s`;
        drop.style.animationDelay = `${Math.random() * 4}s`;
        drop.style.opacity = `${.16 + Math.random() * .43}`;
        fragment.appendChild(drop);
      }

      elements.rain.appendChild(fragment);
    }

    function initSpeechRecognition() {
      const Recognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!Recognition) {
        elements.micBtn.addEventListener("click", () => {
          showToast("Voice input is not supported in this browser.");
        });
        return;
      }

      const recognition = new Recognition();

      recognition.lang = "en-IN";
      recognition.interimResults = false;
      recognition.continuous = false;

      elements.micBtn.addEventListener("click", () => {
        try {
          elements.micBtn.classList.add("listening");
          recognition.start();
        } catch {
          elements.micBtn.classList.remove("listening");
        }
      });

      recognition.onresult = (event) => {
        elements.userInput.value = event.results[0][0].transcript;
        elements.userInput.focus();
      };

      recognition.onend = () => {
        elements.micBtn.classList.remove("listening");
      };

      recognition.onerror = () => {
        elements.micBtn.classList.remove("listening");
        showToast("Voice input could not be completed.");
      };
    }

    elements.chatForm.addEventListener("submit", (event) => {
      event.preventDefault();
      sendMessage();
    });

    elements.locationForm.addEventListener("submit", (event) => {
      event.preventDefault();
      searchLocation(elements.locationInput.value);
    });

    elements.useLocationBtn.addEventListener("click", useBrowserLocation);

    elements.languageSelect.addEventListener("change", () => {
      state.language = elements.languageSelect.value;

      if (state.language === "ml") {
        showToast("Malayalam search is enabled. Voice recognition remains configured for Indian English.");
      } else {
        showToast("English mode enabled.");
      }
    });

    initRain();
    bindQuickActions();
    initSpeechRecognition();

    loadLocation(DEFAULT_LOCATION).catch((error) => {
      console.error("Initial load error:", error);
    });
