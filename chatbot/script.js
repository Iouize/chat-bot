let input = document.querySelector('input[type=text]');
let buttonMessage = document.querySelector(".send-message");
let chatZone = document.querySelector('.chat-zone');

function sendMessage() {
  console.log(input.value);
}

input.addEventListener("keypress", function(event) {
  if (event.key == "Enter") {
    event.preventDefault();
    sendMessage();
    displayUserMessage(input.value);
  }
})

function displayUserMessage(message) {
  let userMessage = chatZone.appendChild(document.createElement('p'));
  userMessage.innerHTML = message;
  userMessage.className = "user-message";

  let url = "http://127.0.0.1:8000/?message=" + message;
  fetch(url)
  .then(
      function(response) {
          if (response.status !== 200) {
              console.warn('Looks like there was a problem. Status Code: ' +
              response.status);
              return;
          }

          //Examine the text in the response
          response.json().then(function(data) {
              console.log(data["answer"]);
              let text = /<s>(.*?)<\/s>/g.exec(data["answer"])[1];
              displayBotMessage(text);
          });
      }
  )
  .catch(function(err) {
      console.error('Fetch Error -', err);
  })

  input.value = "";
}

function displayBotMessage(message) {
  let botMessage = chatZone.appendChild(document.createElement('p'));
  botMessage.innerHTML = message;
  botMessage.className = "bot-message";
}
