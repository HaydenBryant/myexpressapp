// function getUserInfo(){
//     const username = document.getElementById("username").value;
//     const userId = document.getElementById("userId").value;
//     const message = document.getElementById("message").value;

//     const url = ("/api/?username=" + username + "&userId=" + userId + "&message=" + message);

//     axios.get(url)
//         .then(response => {
//             console.log("axios", response.data);
//         })
        
    
// }

function handleSubmit () {
    const userName = document.getElementById("user-name").value;
    const message = document.getElementById("message").value;

    const payload = {
        username: userName,
        message
    } 

    axios.post("/api/", payload)
        .then(response => {
            console.log(response)
        })

}

function getAllUsers(){
    axios.get("/getallusers")
        .then(response => {
            document.getElementById("result").innerHTML = JSON.stringify(response.data)
        })
}
