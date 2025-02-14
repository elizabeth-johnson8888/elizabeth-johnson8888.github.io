let projectMaster = new Array(); // [card button, corresponding collapsible]
let numOfCards; // holds the max number of cards to show on a screen at once
let filter; // keeps track of current project filter
let currentIndex; // keepts track of the projectMaster index
let lastCard = new Array(); // keeps track of the filter index for pagination

// loads all projects to the page when the wondow loads
window.onload = function loadAllProjects()
{
    // const url = "projectDescriptions.json";
    const url='https://elizabeth-johnson8888.github.io/projectDescriptions.json'
    fetch(url).then((response) => response.text())
    .then((text) => {
        let projectMasterList = JSON.parse(text); // array of themes and colors

        // for each project, make a card and collapsible
        for (let i = 0; i < projectMasterList.length; i++)
            {
                let card = makeCard(projectMasterList[i]);
                projectMaster.push(card);
            }
        filter = "All";
        currentIndex = 0;
        resizeCards();
    }).catch(error => console.error('Error fetching JSON:', error));    
}


// function to create the basic card makeCard
// input card information from JSON file
// check if programming or art card to add necessary links and pictures
// add the card type as a class to the card
// return a collapsible bootstrap card
function makeCard(cardInfo)
{
    // projectID is used for collapsible
    let projectID = "#" + cardInfo["project-id"];

    // // create the button that holds the card
    let cardButton = document.createElement("button");
    cardButton.classList.add("col", "card", "btn", cardInfo["type"]); // add type of card as a class
    cardButton.setAttribute("type", "button");
    cardButton.setAttribute("data-bs-toggle", "collapse");
    cardButton.setAttribute("data-bs-target", projectID);
    cardButton.setAttribute("aria-expanded", "false");
    cardButton.setAttribute("aria-controls", projectID.slice(1));
    cardButton.setAttribute("style", "width: 18rem;");

    // create card
    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    let cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = cardInfo["card-title"];
    let cardSubtitle = document.createElement("h6");
    cardSubtitle.classList.add("card-subtitle");
    cardSubtitle.textContent = cardInfo["type"];
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardSubtitle);

    // add card to button
    cardButton.appendChild(cardBody);

    // make collapsible container
    let collapse = document.createElement("div");
    collapse.classList.add("collapse");
    collapse.id = projectID.slice(1);
    let collapseCard = document.createElement("div");
    collapseCard.classList.add("card", "card-body");
    let collapseDescription = document.createElement("p");
    collapseDescription.textContent = cardInfo["project-description"];
    collapseCard.appendChild(collapseDescription);
    collapse.appendChild(collapseCard);

    // add pictures or link depending on if the card is art or programming
    if (cardInfo["type"] === "Programming")
        {
            // add link to project collasible
            let link = document.createElement("a");
            link.classList.add("card-link");
            link.textContent = "Link to Github";
            link.setAttribute("href", cardInfo["project-link"]);
            collapseCard.appendChild(link);
        }
    else // art cards
        {
            // add picture to project collapsible
            let picture = document.createElement("img");
            picture.setAttribute("src", cardInfo["collapse-images"][0][0]);
            picture.setAttribute("width", cardInfo["collapse-images"][0][1]);
            picture.setAttribute("height", cardInfo["collapse-images"][0][2]);
            collapseCard.appendChild(picture);
        }
    
    return [cardButton, collapse];
}


// showCards function to show page of cards using the index and filter variables
// optional pagination input
function showCards()
{
    if (numOfCards === 1)
        {
            // set up page for accordion style cards
            // delete pagination button because you can just scroll
        }
    else // page is large enough to multiple cards and rows
        {
            // create divs to hole rows of cards
            let row1 = document.createElement("div");
            let row2 = document.createElement("div");
            row1.classList.add("row");
            row2.classList.add("row");

            // add divs to page
            let projectContainer = document.querySelector("#projectContainer");
            projectContainer.appendChild(row1);
            projectContainer.appendChild(row2);

            let i = currentIndex;
            let j = 0;

            while (i < projectMaster.length || j < numOfCards)
                {
                    if (j < (numOfCards / 2) && (projectMaster[i][0].classList.contains(filter) || filter === "All"))
                        {
                            // put cards in first div
                            row1.appendChild(projectMaster[i][0]);
                            row1.appendChild(projectMaster[i][1]);
                            i = i + 1;
                            j = j + 1;
                        }
                    else if (j >= (numOfCards / 2) && j < numOfCards && (projectMaster[i][0].classList.contains(filter) || filter === "All"))
                        {
                            if (j === (numOfCards - 1) && filter != "All") // saves for filter pagination
                                {
                                    lastCard.push(i);
                                }
                            // put cards in second div
                            row2.appendChild(projectMaster[i][0]);
                            row2.appendChild(projectMaster[i][1]);
                            i = i + 1;
                            j = j + 1;
                        }
                    else
                        {
                            i = i + 1;
                        }
                }
        }
}


// function to tell showCards which filter was pressed setFilter
// sets filter variable to filter
function setFilter(f)
{
    // remove the light buttom from previous filter
    document.querySelector(`#${filter}`).classList.remove("light-btn");
    // save the newly selected filter
    filter = f;
    // make the new filter button light
    document.querySelector(`#${filter}`).classList.add("light-btn");
    currentIndex = 0;
    emptyCards();
    showCards();
}


// function to recognize when the screen changes
// resets to first set of cards for page resize
// calls resizeCards
// window.addEventListener('resize', resizeCards(true));
// window.onresize = resizeCards(true);
window.addEventListener('resize', function() {
    resizeCards(true);
});

// function to recognize how many cards to show based on the screen size resizeCards
// calls showCards and sets numOfCards
// optional parameter for if the screen has been resized
function resizeCards(isResized = false) {
    // if the screen was resized, set currentIndex to 0
    if (isResized === true)
        {
            currentIndex = 0;
        }

    // check screen size
    if (window.innerWidth < 575.98)
        {
            // show one card at a time in carosel thingy
            numOfCards = 1;
        }
    else if (window.innerWidth < 767.98)
        {
            // show two columns and two rows of cards
            numOfCards = 4;
        }
    else
        {
            // show three columns and two rows of cards
            numOfCards = 6;
        }
    showCards();
}

// function for pagination buttons
// calls showCards with pagination parameter
// change the current index based on the numOfCards per page
// deletes current cards from page
function setPagination(button)
{
    emptyCards();

    if ((button === "backwards") && (currentIndex > 0) && filter === "All")
        {
            currentIndex = currentIndex - numOfCards;
        }
    else if ((button === "backwards") && (currentIndex > 0))
        {
            lastCard.pop();
            lastCard.pop();
            if (lastCard.length === 0)
                {
                    currentIndex = 0;
                }
            else
                {
                    currentIndex = lastCard[lastCard.length - 1] + 1;
                }
        }
    else if ((button === "forwards") && areThereCardsLeft() && filter === "All")
        {
            currentIndex = currentIndex + numOfCards;
        }
    else if ((button === "forwards") && areThereCardsLeft())
        {
            currentIndex = lastCard[lastCard.length - 1] + 1;
        }
    showCards();
}


// checks to see if there are cards left to show depending on the current index and filter
// returns true if there are cards to show
// returns false if there are no cards to show
function areThereCardsLeft()
{
    // first, if the filter is all and there are cards left to show return true
    if (filter === "All" && (currentIndex + numOfCards) < projectMaster.length)
        {
            return true;
        }
    else if (filter === "All" && (currentIndex + numOfCards) >= projectMaster.length)
        {
            return false;
        }

    // check if there are more cards based on the filter
    for (let i = lastCard[lastCard.length - 1] + 1; i < projectMaster.length; i++)
        {
            if (filter !== 'All' && projectMaster[i][0].classList.contains(filter))
                {
                    return true;
                }
        }
    return false;
}

// enpties the card containers so there is no cards in it
function emptyCards()
{
    let projectContainer = document.querySelector("#projectContainer");
    projectContainer.innerHTML = '';
}

