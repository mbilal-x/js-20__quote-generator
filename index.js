// quote Elements
const quoteTextEl = document.querySelector('.quote-text');
const quoteAuthorEl = document.querySelector('.quote-author');
// button Elements
const btnTwitterEl = document.querySelector('.btn-twitter');
const btnQuoteEl = document.querySelector('.btn-newQuote');
// loader stuff
const quoteGeneratorEl = document.querySelector('.quote-generator');
const loaderEl = document.querySelector('.loader');

// Get Quote From API
async function getQuote() {
  quoteGeneratorEl.hidden = true;
  loaderEl.hidden = false;

  setTimeout(loader, 300);
  const url =
    'https://corsproxy.io/?' +
    encodeURIComponent(
      'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
    );
  try {
    const response = await fetch(url);
    const data = await response.json();
    // If Author is blank, add 'Unknown'
    if (data.quoteAuthor === '') {
      quoteAuthorEl.innerText = 'Unknown';
    } else {
      quoteAuthorEl.innerText = data.quoteAuthor;
    }

    quoteTextEl.innerText = data.quoteText;
  } catch (error) {
    console.log(error);
  }
}

// show loading
function loader() {
  if (!loaderEl.hidden) {
    loaderEl.hidden = true;
    quoteGeneratorEl.hidden = false;
  }
}

// tweet quote
function tweetQuote() {
  const quote = quoteTextEl.innerText;
  const author = quoteAuthorEl.innerText;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quote}   - ${author}`;
  window.open(tweetUrl, '_blank');
}

btnQuoteEl.addEventListener('click', getQuote);
btnTwitterEl.addEventListener('click', tweetQuote);

// on reload
getQuote();
