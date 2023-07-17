<!-- include the svg assets later used in the project -->
<style>
    @import url('https://fonts.googleapis.com/css?family=Open+Sans|Nova+Mono');

    :root {
        --font-header: 'Nova Mono', monospace;
        --font-text: 'Open Sans', sans-serif;
        --color-theme: #021678;
        --color-bg: #e5e8e1;

        --animation-sentence: 'You know you\'re supposed to leave, right?';
        --animation-duration: 40s;
    }

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        width: 100%;
        font-family: var(--font-text);
        color: var(--color-theme);
        background: var(--color-bg);
        overflow: hidden;
    }

    .container {
        text-align: center;
        margin: 1rem 0.5rem 0;
    }

    .container h1 {
        font-family: var(--font-header);
        font-size: calc(4rem + 2vw);
        text-transform: uppercase;
    }

    .container p {
        text-transform: uppercase;
        letter-spacing: 0.2rem;
        font-size: 2rem;
        margin: 1.5rem 0 3rem;
    }

    svg.keyhole {
        height: 82px;
        width: 82px;
        opacity: 0;
        visibility: hidden;
        /* define an animation for the keyhole, to introduce it
  paused by default, run with a timeout in JavaScript
  */
        animation: showKey 0.5s 0.5s paused ease-out forwards;
    }

    svg.key {
        height: 164px;
        width: 164px;
        position: absolute;
        opacity: 0;
        visibility: hidden;
        /* define an animation for the keyhole, to introduce it
  paused by default, run with a timeout in JavaScript
  */
        animation: showKey 0.5s 0.5s paused ease-out forwards;
    }
</style>
<div class="container">
    <h1>403</h1>
    <p>You are not authorized to access </p>
</div>


