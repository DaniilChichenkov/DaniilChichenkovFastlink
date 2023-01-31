'use strict'

document.addEventListener('DOMContentLoaded', () => {
    //Header btn
    const headBtn = document.querySelector('.header-btn');

    const services = document.querySelector('.services');

    let servicesPosition = document.documentElement.getBoundingClientRect().top - services.getBoundingClientRect().top

    let position = -servicesPosition

    //Event
    headBtn.addEventListener('click', () => {
        document.documentElement.scrollTop = position;
    });
});