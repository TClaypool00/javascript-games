const divHangman = document.getElementById('hangmanDiv');
const imageElemnts = divHangman.getElementsByTagName('img');
const btnReset = document.getElementById('btnReset');
const successMessage = document.getElementById('successMessage');

//Strings in the array match the file names in the images/memory-game folder
//Without the "-card.png"
const images = ['duck', 'fence', 'h'];
//Blank array to shruffle array images into
const newImages = [];
const defaultCard = '../images/memory-game/memory-card.png'; //Image path for memory-card file
var cardsFlipped = 0; // Keeps track of how many times the user has click on a card
var totalMoves = 0; //Total moves the user made
var lastImage; //Holds the last element that the user clicked on
var lastImageSrc = ''; //Holds the last soruce that the user clicked on 

/* Generates the board when the document is first loaded or the game is resetd */
function generateBoard() {
    for (let i = 0; i < images.length * 2; i++) {
        const image = document.createElement('img');
        image.classList.add('card');
        image.src = defaultCard;

        divHangman.appendChild(image);
    }
}


function randomizedBoard() {
    //pushes elemtns from the image array into newImages array two times
    for (let b = 0; b < 2; b++) {
        for (let a = 0; a < images.length; a++) {
            newImages.push(images[a]);
        }
    }

    //Shuffles the newImage array using the Fisher-Yates Sorting Algorithm
    for (let i = newImages.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = newImages[i];
        newImages[i] = newImages[j];
        newImages[j] = temp;
    }

    //Loops through the all of the image tag elements inside hangmanDiv div
    //Adds a click event to each image elemnt
    for (let c = 0; c < imageElemnts.length; c++) {
        const element = imageElemnts[c];

        element.addEventListener('click', function(e) {
            e.preventDefault();

            //Checks to if the current element contains a class name "turnedOver"
            //i.e. The user has already turned over both instances of the that image
            if (!this.classList.contains('turnedOver')) {
                this.src = `../images/memory-game/${newImages[c]}-card.png`;

                cardsFlipped++;
                
                //If this the first card the user has turned over
                if (cardsFlipped === 1) {
                    //Sets last image and last image source to current element and image source
                    lastImage = this;
                    lastImageSrc = newImages[c];
                    //If this is the 2nd card the usr has turned over
                } else if (cardsFlipped === 2) {
                    cardsFlipped = 0; //Resets cardsFlipped to 0

                    //Checks if lastImageSrc is not equal to current index in newImages array
                    //i.e not a match
                    if (lastImageSrc !== newImages[c]) {
                        //Sets the current element and lastImage src to the memory-card.png 
                        this.src = defaultCard;
                        lastImage.src = defaultCard;
                    } else {
                        //i.e match
                        totalMoves+= 2;
                        //adds "turnedOver" to  current element and lastImage
                        lastImage.classList.add('turnedOver');
                        this.classList.add('turnedOver')
                    }

                    //Checks if totalMoves is equal to newImage length
                    //i.e. User won game!
                    if (totalMoves === newImages.length) {
                        if (successMessage) {
                            successMessage.innerHTML = 'You win!';
                        }
                        
                        btnReset.disabled = false;

                        //Resets game
                        btnReset.addEventListener('click', function(e) {
                            e.preventDefault();

                            divHangman.innerHTML = '';
                            generateBoard();
                            randomizedBoard();
                            successMessage.innerHTML = '';
                            this.disabled = true;
                        });
                    }
                }
            }
        });
    }
}