const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');

const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

const loader = document.getElementById('loader');


let apiQuotes = [];  // value can be change

// show loading
function showLoadingSpinner() 
{
    loader.hidden = false;
    quoteContainer.hidden = true;
} 

// hide loading
function removeLoadingSpinner()
{
    loader.hidden = true;
    quoteContainer.hidden = false;
}


// Show me new Quote
function newQuote() {
    showLoadingSpinner(); 
    //Pick a Random Quote form an api quotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Change the quote

    // authorText.textContent = quote.author;
    //check author place blank or not if yes then replace with unknown
    if(!quote.author)
    {
        authorText.textContent = 'Unknown';
    }
    else
    {
        authorText.textContent = quote.author;
    }

    // If Quote length is too large than add longquote css
    if(quote.text.length > 120)
    {
        quoteText.classList.add('long-quote');
    }
    else
    {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    
    // set quote and hide loader
    removeLoadingSpinner();
}

// Get Quotes from an api
async function getQuote() {
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error)
    {
        // error handling
        alert(error);
    }
}

//twitter (tweet quote) button Function

function tweetQuote() 
{
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click',tweetQuote);

// On Load
getQuote() ; 
