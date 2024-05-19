document.addEventListener('DOMContentLoaded', function() {
    var animation = lottie.loadAnimation({
        container: document.getElementById('lottie-animation'), // the DOM element to render the animation
        renderer: 'svg', // specify the renderer as 'svg'
        loop: true, // whether to loop the animation
        autoplay: true, // whether to start playing the animation
        path: 'https://lottie.host/b76c5fde-0651-46ff-82a5-514c0fa6d305/Cch9WMTNui.json'
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('navigateButton').addEventListener('click', function() {
        window.location.href = 'page.html';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('exitButton').addEventListener('click', function() {
        window.location.href = 'index.html';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.getElementById('dynamic-textarea');

    textarea.addEventListener('input', function() {
        adjustTextareaHeight(textarea);
    });

    function adjustTextareaHeight(element) {
        // Reset the height to auto to shrink the textarea if needed
        element.style.height = 'auto';
        // Set the height to match the scroll height plus a little padding
        element.style.height = (element.scrollHeight) + 'px';
    }

    // Adjust height on page load if there's pre-filled content
    adjustTextareaHeight(textarea);
});

document.addEventListener('DOMContentLoaded', function() {
    const chatBody = document.getElementById('chat-body');
    const chatInput = document.getElementById('dynamic-textarea');
    const sendButton = document.getElementById('send-button');

    sendButton.addEventListener('click', function() {
        const message = chatInput.value.trim();
        if (message !== '') {
            addMessage('user', message);
            chatInput.value = ''; // Clear the input field
            chatInput.blur(); // Remove focus from the input field

            // Simulate a bot response after a short delay
            setTimeout(function() {
                addMessage('bot', 'This is a simulated response.');
            }, 1000);
        }
    });

    chatInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            sendButton.click();
        }
    });

    function addMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', sender);
        if (sender === 'bot')
            messageElement.innerHTML += '<svg xmlns="http://www.w3.org/2000/svg" height="20" width="22.5" viewBox="0 0 640 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M320 0c17.7 0 32 14.3 32 32V96H472c39.8 0 72 32.2 72 72V440c0 39.8-32.2 72-72 72H168c-39.8 0-72-32.2-72-72V168c0-39.8 32.2-72 72-72H288V32c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H208zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H304zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H400zM264 256a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm152 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80zM48 224H64V416H48c-26.5 0-48-21.5-48-48V272c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H576V224h16z"/></svg>' 
        messageElement.innerHTML += `<p>&nbsp;&nbsp;${message}</p>`;
        chatBody.appendChild(messageElement);
        chatBody.scrollTop = chatBody.scrollHeight;
    }
});
