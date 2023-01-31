'use strict'

document.addEventListener('DOMContentLoaded', () => {
    //Navigation bar
    const navBar = document.querySelector('.nav');

    //Navigation bar appear/disappear script

        //Height of bar
        let navBarHeight = navBar.scrollHeight;

        //Point when animation was applied
        let lastScrollCounter = 0;

        document.addEventListener('scroll', () => {
            let counter = document.documentElement.scrollTop;

            //If page is being scrolled down
            if (counter > lastScrollCounter) {
                //Update counter
                lastScrollCounter = counter;

                //Hide nav bar
                hideNav();
            } 
            else {
                //Update counter
                lastScrollCounter = counter;

                //Show nav bar
                showNav();
            }
        });

        //Function which shows nav bar
        function showNav() {
                navBar.style.top = 0 + 'px';
                navBar.classList.remove('hidden');
        };

        //Function which hides nav bar
        function hideNav() {
                navBar.style.top = '-100%';
                navBar.classList.add('hidden');
        };

    //Links 'scroll to' script
    const navLinks = document.querySelectorAll('.link');

    //Content elements
    const about = document.querySelector('.reasons'),
          services = document.querySelector('.services');

    navLinks.forEach( (item, i) => {
        item.addEventListener('click', e => {
            scrollToFunc(i);
        });
    });

    //Function which will scroll page to content user need depends on which link was pressed
    function scrollToFunc(linkIndex) {
        
        //Check which link was pressed
        switch(linkIndex) {
            //About us
            case(0):
                calcPathToContent(about);
            break;

            //Contact
            case(1):
            break;

            //Services
            case(2):
                calcPathToContent(services);
            break;

            default:
                console.log('a');
                break;
        };

        //Function which get position of content element and scroll to it
        function calcPathToContent(contentElement) {
            
            //Position of the element on page
            const contentElementPosition = Math.floor(document.documentElement.scrollTop + contentElement.getBoundingClientRect().top);

            document.documentElement.scrollTop = contentElementPosition;
        };
    };

    //Scroll element to start
    let logo = document.querySelector('.logo-container');

    logo.addEventListener('click', () => {
        document.documentElement.scrollTop = 0;
    });
});