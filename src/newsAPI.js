export const fetchNews = (cityObject)=>{
  return fetch(`https://newsapi.org/v2/everything?q=${cityObject.cityAndRegion}&language=en&pageSize=100&sortBy=relevance&apiKey=ef7ff90d5a7f4729b4ee1ba38c112156`)
  .then(response=>response.json()).then(result=>{
    const articles = result.articles.slice(0, 5)
    cityObject.news = articles
    return cityObject
  })
}