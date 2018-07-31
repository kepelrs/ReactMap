export const fetchNews = (city)=>{
  return fetch(`https://newsapi.org/v2/everything?q=${city}&language=en&pageSize=100&sortBy=relevance&apiKey=ef7ff90d5a7f4729b4ee1ba38c112156`)
  .then(response=>response.json())
}