
document.addEventListener("DOMContentLoaded", function () {
    const searchBtn = document.querySelector(".search");
    const usernameInput = document.querySelector(".name");
    const easyProgressCircle = document.querySelector(".easy");
    const mediumProgressCircle = document.querySelector(".medium");
    const hardProgressCircle = document.querySelector(".hard");
    const cardStatsContainer = document.querySelector(".cards");
    const circleContainer = document.querySelector(".circle");

    // Validate username input
    function validateUsername(username) {
        if (username.trim() === "") {
            alert("Username should not be empty");
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regex.test(username);
        if (!isMatching) {
            alert("Invalid username");
        }
        return isMatching;
    }

    // Display user progress data
    function displayUserData(data) {
        const easySolved = (data.easySolved / data.totalEasy) * 100;
        const mediumSolved = (data.mediumSolved / data.totalMedium) * 100;
        const hardSolved = (data.hardSolved / data.totalHard) * 100;

        // Update progress circles
        easyProgressCircle.style.setProperty("--progress-degree", `${easySolved}%`);
        mediumProgressCircle.style.setProperty("--progress-degree", `${mediumSolved}%`);
        hardProgressCircle.style.setProperty("--progress-degree", `${hardSolved}%`);

        easyProgressCircle.textContent = `Easy: ${data.easySolved}/${data.totalEasy}`;
        mediumProgressCircle.textContent = `Medium: ${data.mediumSolved}/${data.totalMedium}`;
        hardProgressCircle.textContent = `Hard: ${data.hardSolved}/${data.totalHard}`;

        circleContainer.style.display = "flex"; // Show progress circles
    }

    // Display user stats in cards
    function displayCards(data) {
        const cardsHTML = `
            <div class="card">Total Problems Solved: ${data.totalSolved}</div>
            <div class="card">Ranking: ${data.ranking}</div>
            
           
         `;
        cardStatsContainer.innerHTML = cardsHTML;
        cardStatsContainer.style.display = "grid"; // Show cards
    }

    // Fetch user details from API
    async function fetchUserDetails(username) {
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
        try {
            searchBtn.textContent = "Searching...";
            searchBtn.disabled = true;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Unable to fetch user details...");
            }

            const data = await response.json();
            console.log("User data:", data);
            displayUserData(data);
            displayCards(data);
        } catch (error) {
            console.error("Error fetching user details:", error);
            alert("Error fetching user details. Please try again.");
        } finally {
            searchBtn.textContent = "Search";
            searchBtn.disabled = false;
            usernameInput.value = ""; // Clear input field
        }
    }

    // Event listener for search button
    searchBtn.addEventListener("click", () => {
        const username = usernameInput.value;
        if (validateUsername(username)) {
            fetchUserDetails(username);
        }
    });

    // Hide details when input is clicked
    usernameInput.addEventListener("click", () => {
        circleContainer.style.display = "none";
        cardStatsContainer.style.display = "none";
    });
});