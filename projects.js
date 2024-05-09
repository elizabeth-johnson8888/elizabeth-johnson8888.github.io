let projectMaster = new Array();
let programmingMaster = new Array();
let artMaster = new Array();
let currentIndex;
let isProgramming = true;
let isArt = true;

// loads all of the projects to the page when the window loads
window.onload = function loadAllProjects()
{
    const url='https://elizabeth-johnson8888.github.io/projectDescriptions.json'

    fetch(url).then((response) => response.text())
        .then((text) => {
            let projectMasterList = JSON.parse(text); // array of themes and colors

            // for each project, make a card and collapsible if applicable
            for (let i = 0; i < projectMasterList.length; i++) {

                if (projectMasterList[i].type == "programming")
                {
                    let programmingArray = createProgrammingCard(projectMasterList[i]);
                    programmingMaster.push(programmingArray);
                    projectMaster.push(programmingArray);

                    // add the first three cards to the first row
                    if (i < 3)
                    {
                        document.querySelector("#first-row").appendChild(programmingArray[0]);
                        document.querySelector("#first-row").after(programmingArray[1]);
                    }
                    // add the second three cards to the second row
                    else if (i < 6)
                    {
                        document.querySelector("#second-row").appendChild(programmingArray[0]);
                        document.querySelector("#second-row").after(programmingArray[1]);
                    }
                }
                else
                {
                    let artArray = createArtCardAndCollapsible(projectMasterList[i]);
                    artMaster.push(artArray);
                    projectMaster.push(artArray);

                    // add the first three cards to the first row
                    if (i < 3)
                    {
                        document.querySelector("#first-row").appendChild(artArray[0]);
                        document.querySelector("#first-row").after(artArray[1]);
                    }
                    // add the second three cards to the second row
                    else if (i < 6)
                    {
                        document.querySelector("#second-row").appendChild(artArray[0]);
                        document.querySelector("#second-row").after(artArray[1]);
                    }
                }
              }
            //   save the current index for if the person clicks next
            currentIndex = 6;
        }).catch(error => console.error('Error fetching JSON:', error));
}

// creates programming card info based on the json information provided
function createProgrammingCard(cardinfo)
{
    let projectID = "#" + cardinfo["project-id"];
    let cardContainer = document.createElement("div");
    cardContainer.classList.add("col", "card", "m-5", "btn");
    cardContainer.setAttribute("style", "width: 18rem");
    cardContainer.setAttribute("data-bs-toggle", "collapse");
    cardContainer.setAttribute("data-bs-target", projectID);
    cardContainer.setAttribute("aria-expanded", "false");
    cardContainer.setAttribute("aria-controls", cardinfo["project-id"]);
    let cardhtml =
        '<div class="card-body">' + '<h3 class="card-title">' + cardinfo["card-title"] + '</h3>'
        + '<h5 class="card-subtitle mb-2 text-body-secondary">' + cardinfo["card-subtitle"] + '</h5>'
        + '</div>';
    cardContainer.innerHTML = cardhtml;

    let collapseContainer = document.createElement("div");
    collapseContainer.classList.add("row", "collapse");
    collapseContainer.id = cardinfo["project-id"];

    let collapseBody = document.createElement("div");
    collapseBody.classList.add("col", "card", "card-body");
    let collapsehtml =
        '<p>' + cardinfo['project-description'] + '</p>'
        + '<a href="' + cardinfo['project-link'] + '" class="card-link">Link to Github</a>'
    collapseBody.innerHTML = collapsehtml;
    collapseContainer.appendChild(collapseBody);
    return [cardContainer, collapseContainer];
}

// creates the art card info based on the json information provided
function createArtCardAndCollapsible(cardinfo)
{
    let projectID = "#" + cardinfo["project-id"];
    let cardContainer = document.createElement("div")
    cardContainer.classList.add("col", "card", "m-5", "btn");
    cardContainer.setAttribute("style", "width: 18rem");
    cardContainer.setAttribute("data-bs-toggle", "collapse");
    cardContainer.setAttribute("data-bs-target", projectID);
    cardContainer.setAttribute("aria-expanded", "false");
    cardContainer.setAttribute("aria-controls", cardinfo["project-id"]);
    let cardhtml =
        // '<img src="'+ cardinfo['card-image'] + '" class="card-img-top" alt="...">' +
        '<div class="card-body">' +
        '<h3 class="card-title">' + cardinfo["card-title"] + '</h5>' +
        '<h5 class="card-subtitle mb-2 text-body-secondary">' + cardinfo["card-subtitle"] + '</h5>'
        '</div>';
    cardContainer.innerHTML = cardhtml;

    let collapseContainer = document.createElement("div");
    collapseContainer.classList.add("row", "collapse");
    collapseContainer.id = cardinfo["project-id"];

    let collapseBody = document.createElement("div");
    collapseBody.classList.add("col", "card", "card-body");
    collapseBody.innerText = cardinfo["collapse-description"];
    collapseContainer.appendChild(collapseBody);

    for (let i = 0; i < cardinfo["collapse-images"].length; i++)
    {
        let image = document.createElement('img');
        image.setAttribute("src", cardinfo["collapse-images"][i][0]);
        image.setAttribute("width", cardinfo["collapse-images"][i][1]);
        image.setAttribute("height", cardinfo["collapse-images"][i][2]);
        collapseBody.appendChild(image);
    }

    return [cardContainer, collapseContainer];
}

// function that sets the next set of projects
function setPaginationForward()
{
    console.log(currentIndex);
    // check if all, programming, or art button is pressed and set the shown array to that project array
    let projectArray;
    if (isArt && isProgramming)
        {
            projectArray = projectMaster;
        }
    else if (isArt)
        {
            projectArray = artMaster;
        }
    else if (isProgramming)
        {
            projectArray = programmingMaster;
        }

    if (currentIndex < projectArray.length)
        {
            // remove children from first and second row
            let firstRow = document.querySelector("#first-row");
            let secondRow = document.querySelector("#second-row");
            while (firstRow.firstChild && secondRow.firstChild)
                {
                    firstRow.removeChild(firstRow.firstChild);
                    secondRow.removeChild(secondRow.firstChild);
                }


            let curr = currentIndex;
            // add next page of projects
            for (let i = curr; i < projectArray.length; i++)
                {
                    // add the first three cards to the first row
                    if (i < curr + 3)
                    {
                        document.querySelector("#first-row").appendChild(projectArray[i][0]);
                        document.querySelector("#first-row").after(projectArray[i][1]);
                        currentIndex = i;
                    }
                    // add the second three cards to the second row
                    else if (i < curr + 6)
                    {
                        document.querySelector("#second-row").appendChild(projectArray[i][0]);
                        document.querySelector("#second-row").after(projectArray[i][1]);
                        currentIndex = i;
                    }
                }
            currentIndex += 1;
        }
}

// function that sets the previous set of projects
function setPaginationBackward()
{
    console.log(currentIndex);
    // check if all, programming, or art button is pressed and set the shown array to that project array
    let projectArray;
    if (isArt && isProgramming)
        {
            projectArray = projectMaster;
        }
    else if (isArt)
        {
            projectArray = artMaster;
        }
    else if (isProgramming)
        {
            projectArray = programmingMaster;
        }

    // add previous page of projects
    if (currentIndex >= 12)
        {
            // remove children from first and second row
            let firstRow = document.querySelector("#first-row");
            let secondRow = document.querySelector("#second-row");
            while (firstRow.firstChild && secondRow.firstChild)
                {
                    firstRow.removeChild(firstRow.firstChild);
                    secondRow.removeChild(secondRow.firstChild);
                }


            let curr = currentIndex - 12;
            for (let i = curr; i < projectArray.length; i++)
                {
                    // add the first three cards to the first row
                    if (i < curr + 3)
                    {
                        document.querySelector("#first-row").appendChild(projectArray[i][0]);
                        document.querySelector("#first-row").after(projectArray[i][1]);
                    }
                    // add the second three cards to the second row
                    else if (i < curr + 6)
                    {
                        document.querySelector("#second-row").appendChild(projectArray[i][0]);
                        document.querySelector("#second-row").after(projectArray[i][1]);
                    }
                }
            currentIndex = currentIndex - 6;
        }
}

// function that changes the pagination to art projects
function setArtProjects()
{
    isArt = true;
    isProgramming = false;
    // reset current index for art array
    currentIndex = 0;
    curr = 0;

    // remove children from first and second row
    let firstRow = document.querySelector("#first-row");
    let secondRow = document.querySelector("#second-row");
    while (firstRow.firstChild && secondRow.firstChild)
        {
            firstRow.removeChild(firstRow.firstChild);
            secondRow.removeChild(secondRow.firstChild);
        }

    // set base art projects
    for (let i = curr; i < artMaster.length; i++)
        {
            // add the first three cards to the first row
            if (i < curr + 3)
            {
                document.querySelector("#first-row").appendChild(artMaster[i][0]);
                document.querySelector("#first-row").after(artMaster[i][1]);
            }
            // add the second three cards to the second row
            else if (i < curr + 6)
            {
                document.querySelector("#second-row").appendChild(artMaster[i][0]);
                document.querySelector("#second-row").after(artMaster[i][1]);
            }
        }
}

// function that changes pagination to cs projects
function setProgrammingProjects()
{
    isArt = false;
    isProgramming = true;
    // reset current index for programming array
    currentIndex = 0;

    // remove children from first and second row
    let firstRow = document.querySelector("#first-row");
    let secondRow = document.querySelector("#second-row");
    while (firstRow.firstChild && secondRow.firstChild)
        {
            firstRow.removeChild(firstRow.firstChild);
            secondRow.removeChild(secondRow.firstChild);
        }
    let curr = 0;
    // set base programming projects
    for (let i = curr; i < programmingMaster.length; i++)
        {
            // add the first three cards to the first row
            if (i < curr + 3)
            {
                document.querySelector("#first-row").appendChild(programmingMaster[i][0]);
                document.querySelector("#first-row").after(programmingMaster[i][1]);
            }
            // add the second three cards to the second row
            else if (i < curr + 6)
            {
                document.querySelector("#second-row").appendChild(programmingMaster[i][0]);
                document.querySelector("#second-row").after(programmingMaster[i][1]);
            }
        }
}

function setAllProjects()
{
    isArt = true;
    isProgramming = true;
    // remove children from first and second row
    let firstRow = document.querySelector("#first-row");
    let secondRow = document.querySelector("#second-row");
    while (firstRow.firstChild && secondRow.firstChild)
        {
            firstRow.removeChild(firstRow.firstChild);
            secondRow.removeChild(secondRow.firstChild);
        }

    let curr = 0;
    // set base programming projects
    for (let i = curr; i < programmingMaster.length; i++)
        {
            // add the first three cards to the first row
            if (i < curr + 3)
            {
                document.querySelector("#first-row").appendChild(programmingMaster[i][0]);
                document.querySelector("#first-row").after(programmingMaster[i][1]);
            }
            // add the second three cards to the second row
            else if (i < curr + 6)
            {
                document.querySelector("#second-row").appendChild(programmingMaster[i][0]);
                document.querySelector("#second-row").after(programmingMaster[i][1]);
            }
        }

    currentIndex = 6;
}
