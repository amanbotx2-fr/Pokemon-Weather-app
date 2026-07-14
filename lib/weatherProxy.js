const WEATHER_API_BASE = "https://api.weatherapi.com/v1";

const ENDPOINTS = {
  search: {
    path: "/search.json",
    allowedParams: ["q"],
    requiredParams: ["q"],
    defaults: {}
  },
  current: {
    path: "/current.json",
    allowedParams: ["q", "aqi"],
    requiredParams: ["q"],
    defaults: { aqi: "yes" }
  },
  forecast: {
    path: "/forecast.json",
    allowedParams: ["q", "days", "aqi", "alerts"],
    requiredParams: ["q"],
    defaults: { days: "5", aqi: "yes", alerts: "no" }
  }
};

function getRequestUrl(req) {
  const host = req.headers.host || "localhost";
  return new URL(req.url, `https://${host}`);
}

function json(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload));
}

async function proxyWeatherRequest(req, res, endpointName) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    json(res, 405, { error: { code: "method-not-allowed", message: "Only GET requests are supported." } });
    return;
  }

  const endpoint = ENDPOINTS[endpointName];
  if (!endpoint) {
    json(res, 404, { error: { code: "unknown-endpoint", message: "Unknown weather endpoint." } });
    return;
  }

  const apiKey = process.env.WEATHER_API_KEY;
  if (!apiKey) {
    json(res, 500, { error: { code: "missing-env", message: "Weather service is not configured." } });
    return;
  }

  const requestUrl = getRequestUrl(req);
  const upstreamParams = new URLSearchParams({ key: apiKey, ...endpoint.defaults });

  endpoint.allowedParams.forEach((name) => {
    const value = requestUrl.searchParams.get(name);
    if (value !== null && value.trim() !== "") upstreamParams.set(name, value);
  });

  const missingParam = endpoint.requiredParams.find((name) => !upstreamParams.get(name));
  if (missingParam) {
    json(res, 400, { error: { code: "missing-param", message: `Missing required query parameter: ${missingParam}` } });
    return;
  }

  const upstreamUrl = `${WEATHER_API_BASE}${endpoint.path}?${upstreamParams.toString()}`;

  try {
    const upstreamResponse = await fetch(upstreamUrl);
    const body = await upstreamResponse.text();

    res.statusCode = upstreamResponse.status;
    res.setHeader("Content-Type", upstreamResponse.headers.get("content-type") || "application/json; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.end(body);
  } catch {
    json(res, 502, { error: { code: "weather-upstream-error", message: "Weather service is temporarily unavailable." } });
  }
}

module.exports = {
  proxyWeatherRequest
};
