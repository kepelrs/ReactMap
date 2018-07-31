export const fetchNews = (cityObject)=>{
  // TODO: add some line to prevent empty cityObject.cityAndRegion value
  return fetch(`https://newsapi.org/v2/everything?q=${cityObject.cityAndRegion}&language=en&pageSize=100&sortBy=relevance&apiKey=ef7ff90d5a7f4729b4ee1ba38c112156`)
  .then(response=>response.json()).then(result=>{
    const articles = result.articles.slice(0, 5)
    cityObject.news = articles
    return cityObject
  })
  // TODO: add some catch and set cityObject.news to false
}