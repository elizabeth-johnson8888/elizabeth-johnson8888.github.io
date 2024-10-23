let projectMaster = new Array();
let numOfCards; // holds the max number of cards to show on a screen at once
let filter; // 0 = all, 1 = programming, 2 = art
let currentIndex;

// loads all projects to the page when the wondow loads
window.onload = function loadAllProjects()
{
    const url = "projectDescriptions.json";
    // const url='https://elizabeth-johnson8888.github.io/projectDescriptions.json'
    fetch(url).then((response) => response.text())
    .then((text) => {
        let projectMasterList = JSON.parse(text); // array of themes and colors

        // for each project, make a card and collapsible if applicable
        for (let i = 0; i < projectMasterList.length; i++)
            {
                let card = makeCard(projectMasterList[i]);
                projectMaster.push(card);
            }
    }).catch(error => console.error('Error fetching JSON:', error));

    // call resizeCards
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

    // create the button that holds the card
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
    cardSubtitle.classList.add("card-subtitle", "mb-2", "text-body-secondary");
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
    if (cardInfo["type"] === "programming")
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
function showCards(pagination = "none")
{
    return 0;
}


// function to tell showCards which filter was pressed setFilter
// sets filter variable to filter
function setFilter(f)
{
    filter = f;
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
    console.log("resize");
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
            numOfCards = 2;
        }
    else
        {
            // show three columns and two rows of cards
            numOfCards = 4;
        }
    console.log(numOfCards);
    showCards();
}

// function for pagination buttons
// calls showCards with pagination parameter






