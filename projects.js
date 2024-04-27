let projectMasterList;
let programmingMaster = new Array();
let artMaster = new Array();

// loads all of the projects to the page when the window loads
window.onload = function loadAllProjects()
{
    const url='https://w3stu.cs.jmu.edu/johns5el/elizabeth-johnson8888.github.io/projectDescriptions.json'

    fetch(url).then((response) => response.text())
        .then((text) => {
            projectMasterList = JSON.parse(text); // array of themes and colors
            // console.log(data);

            // for each project, make a card and collapsible if applicable
            for (let i = 0; i < data.length; i++) {

                if (projectMasterList[i].type == "programming")
                {
                    let programmingCard = createProgrammingCard(projectMasterList[i]);
                    programmingMaster.push(programmingCard);

                    // add the first three cards to the first row
                    if (i < 3)
                    {
                        document.querySelector("#first-row").appendChild(programmingCard);
                    }
                    // add the second three cards to the second row
                    else if (i < 6)
                    {
                        document.querySelector("#second-row").appendChild(programmingCard);
                    }
                }
                else
                {
                    let artArray = createArtCardAndCollapsible(projectMasterList[i]);
                    artMaster.push(artArray);

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
        }).catch(error => console.error('Error fetching JSON:', error));
}

// creates programming card info based on the json information provided
function createProgrammingCard(cardinfo)
{
    let cardContainer = document.createElement("div");
    cardContainer.classList.add("col", "card", "m-5");
    cardContainer.setAttribute("style", "width: 18rem");
    let cardhtml =
        '<div class="card-body">' +
            '<h5 class="card-title">' + cardinfo['card-title'] + '</h5>' +
            '<h6 class="card-subtitle mb-2 text-body-secondary">' + cardinfo['card-subtitle'] + '</h6>' +
            '<p class="card-text">' + cardinfo['project-description'] + '</p>' +
            '<a href="#" class="card-link">' + cardinfo['project-link'] + '</a>' +
        '</div>';
    cardContainer.innerHTML = cardhtml;
    return cardContainer;
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
        '<img src="'+ cardinfo['card-image'] + '" class="card-img-top" alt="...">' +
        '<div class="card-body">' +
            '<p class="card-text">' + cardinfo['card-description'] + '</p>' +
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
        image.setAttribute("src", cardinfo["collapse-images"][i]);
        collapseBody.appendChild(image);
    }

    return [cardContainer, collapseContainer];
}
