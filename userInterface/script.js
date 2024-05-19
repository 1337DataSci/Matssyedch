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
        messageElement.innerHTML = `<p>${message}</p>`;
        chatBody.appendChild(messageElement);
        chatBody.scrollTop = chatBody.scrollHeight;
    }
});
