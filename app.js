window.addEventListener("DOMContentLoaded", function () {
    const flagImage = document.querySelector("img");
    const optionButtons = document.querySelectorAll(".optionButton");
    const scoreElement = document.getElementById("scoreValue"); // Element for displaying the score
    const livesElement = document.getElementById("livesValue"); // Element for displaying the lives
    let country; // Variable to hold the current country data
    let countryList; // Variable to hold the list of countries
    let score = 0; // Initialize the score  
    let lives = 3; // Initialize lives
    
    async function loadCountryData() {
        try {
            const response = await fetch("FlagData.json");
            countryList = await response.json();
            country = countryList[Math.floor(Math.random() * countryList.length)];
            flagImage.src = country.img;

            optionButtons.forEach(button => {
                button.textContent = country.options[optionIndexFromDataOption(button.dataset.option)];
                button.addEventListener("click", handleOptionClick);
            });
        } catch (error) {
            console.log("An error occurred:", error);
        }
    }

    function optionIndexFromDataOption(dataOption) {
        // Map the data-option attribute to the index in the country options
        switch (dataOption) {
            case "firstOption":
                return 0;
            case "SecondOption":
                return 1;
            case "ThirdOption":
                return 2;
            case "FourthOption":
                return 3;
            default:
                return 0; // Default to the first option
        }
    }

    function handleOptionClick(event) {
        if (lives > 0) {
            const selectedOption = event.target.textContent;
            

            if (selectedOption === country.right_answer) {
                // Handle correct answer
                score++; // Increase the score
                scoreElement.textContent = score; // Update the displayed score
                
                loadNextFlag();
            } else {
                // Handle wrong answer
                lives--;
                livesElement.textContent = lives; // Update the displayed lives
                console.log(lives);
                loadNextFlag();
            }
        }
        else{
            endGame();
        }
    }

    function endGame() {
        const finalScore = score;
        alert("Game Over! Your final score is: " + finalScore);
        
        const restart = confirm("Do you want to restart the game?");
        
        if (restart) {
            // Reset the game state
            score = 0;
            lives = 3;
            scoreElement.textContent = score;
            livesElement.textContent = lives;
            loadCountryData(); // Start a new game
        } else {
            // Redirect to the score page with the final score
            window.location.href = "score.html?score=" + finalScore;
        }
    }

    function loadNextFlag() {
        country = countryList[Math.floor(Math.random() * countryList.length)]; // Load a new random country
        flagImage.src = country.img;

        // Update the button texts
        optionButtons.forEach(button => {
            button.textContent = country.options[optionIndexFromDataOption(button.dataset.option)];
        });
    }

    loadCountryData();
});
