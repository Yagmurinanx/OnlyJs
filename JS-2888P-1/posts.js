const userId = new URLSearchParams(window.location.search).get("userId");

if (!userId || isNaN(userId) || userId < 1 || userId > 10) {
  alert("Invalid user ID!");
  throw new Error("Incorrect userId");
}


const postsContainer = document.getElementById("posts-container");

const fetchPosts = async () => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  const posts = await response.json();
  return posts;
};

const renderPosts = (posts) => {
  postsContainer.innerHTML = ""; 

  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("post-card");

    
    postElement.innerHTML = 
    ` <div class="bg uwu"></div>
    <div class="bg"></div>
    <div class="content">
      <div class=card>
      <div class="p">
            <h2 >${post.title}</h2>
        <p>${post.body}</p>
            </div>
        </div>
        
      </div>
    `;

    postsContainer.appendChild(postElement);
  });
};

fetchPosts().then((posts) => renderPosts(posts));
