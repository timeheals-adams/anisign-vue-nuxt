// Proxy для API запросов
export default defineEventHandler(async (event) => {
  const path = event.context.params?.path || '';
  const query = getQuery(event);
  
  const API_BASE = process.env.API_BASE_URL || "http://45.153.71.157:8000";
  
  // Построить URL с query параметрами
  const queryString = new URLSearchParams(query as Record<string, string>).toString();
  const targetUrl = `${API_BASE}/${path}${queryString ? `?${queryString}` : ''}`;
  
  try {
    const response = await $fetch(targetUrl, {
      method: event.method,
      headers: {
        'accept': 'application/json',
      },
    });
    
    return response;
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to fetch from API',
    });
  }
});
