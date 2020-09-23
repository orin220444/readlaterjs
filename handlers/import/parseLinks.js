import cheerio from 'cheerio'
export function parseLinks(Html){

  const $ = cheerio.load(html);
  const links = [];
  $('a').each(function(){
    const link = $(this).attr('href')
    links.push(link)
})
return links
}
