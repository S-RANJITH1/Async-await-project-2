// Get the necessary HTML elements using their IDs
const userInput = document.getElementById("userInput");
const search = document.getElementById("Fetch-Btn");
const profileInfom = document.getElementById("getProfile");
const repoInfom = document.getElementById("getRepos");

// Add an event listener to the search button
search.addEventListener("click", async () => {
  // Get the user input value
  const userName = userInput.value;

  // Fetch user data from the GitHub API using the entered username
  const data = await (await fetch(`https://api.github.com/users/${userName}`)).json();

  // Call the function to display user profile information
  getProfile(data);

  // Call the function to display user repositories
  getRepos(userName);
});

// Function to display user profile information
function getProfile(data) {
  
  // Set the inner HTML of the profileInfo element with user profile details
  profileInfom.innerHTML = `<div class="card" style="width: 18rem;">
    <img src="${data.avatar_url}" class="card-img-top img" alt="">
    <div class="card-body">
      <h5 class="card-title">${data.name || "No Name"}</h5>
      <h5 class="card-subHead">${data.login || "No Login"}</h5>
      <h6 class="card-text">${data.bio || "No Bio"}</h6>
      <p class="card-text"><i class="fa-solid fa-location-dot"></i> ${data.location || "No Location"}</p>
      <p class="card-text"><i class="fa-solid fa-user-group"></i> Followers ${data.followers || 0} Following ${data.following || 0}</p>
      <a href="${data.html_url}" target="_blank" class="btn btn-primary ">Visit Repo</a>
    </div>
  </div>`;
}

// Function to display user repositories
async function getRepos(userName) {
  // Fetch the user's repository details from the GitHub API
  const repoDetails = await (await fetch(`https://api.github.com/users/${userName}/repos`)).json();

  // Loop through each repository and display its information
  for (let i = 0; i < repoDetails.length; i++) {
    repoInfom.innerHTML += `
    <div class="col-sm-10 col-md-6 col-12 col-lg-4">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${repoDetails[i].name}</h5>
          <h5 class="card-subHead">${repoDetails[i].language}</h5>
          <div class="d-flex justify-content-center">
            <a href="${repoDetails[i].html_url}" target="_blank" class=" btn btn-primary">Visit Repo</a>
          </div>
        </div>
      </div>
    </div>`;
  }
}