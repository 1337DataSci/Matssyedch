document.addEventListener('DOMContentLoaded', function() {
    var animation = lottie.loadAnimation({
        container: document.getElementById('lottie-animation'), // the DOM element to render the animation
        renderer: 'svg', // specify the renderer as 'svg'
        loop: true, // whether to loop the animation
        autoplay: true, // whether to start playing the animation
        path: 'https://lottie.host/317cea12-411a-47ed-88f8-b04f69e2a982/qg92k0B9IL.json' // the path to the animation JSON file
    });
});