'use strict'

document.addEventListener('DOMContentLoaded', () => {

    //Modal content class
    class ModalWindow {
        constructor(name, price, memoryQuantity, sitesQuantity, bg, number, parentElement) {
            this.name = name;
            this.price = price;
            this.gb = memoryQuantity;
            this.sitesQuantity = sitesQuantity;
            this.backgroundImage = bg;
            this.number = number;
            this.parent = parentElement
        }

        //Function to render modal content on page`
        render() {

            //Create a new div
            let modalWindow = document.createElement('div');
            modalWindow.classList.add('available-services_content');

            modalWindow.innerHTML = `
                <!-- First col (Bg and H) -->
                <div class="content-container_box content-container_box-bg">
                    <!-- Btn -->
                    <button data-available-back class="available-services_btn">
                        <img class="available-services_back-btn_img" src="images/modalImages/arrow-left.png" alt="#">
                    </button>

                    <!-- Text container -->
                    <div class="text-container">
                        <!-- H -->
                        <p class="text">
                            пакет
                        </p>

                        <!-- Shape -->
                        <div class="text-shape"></div>

                        <!-- Name of packet -->
                        <p class="name">
                            "${this.name}"
                        </p>
                    </div>
                </div>

                <!-- Second col (Text and btn) -->
                <div class="content-container_box">

                    <!-- Inner container -->
                    <div class="box_inner-container">

                        <!-- Price -->
                        <div class="price-container">
                            <p class="available-services_price">
                                <span class="span">${this.price}</span> / Месяц
                            </p>
                        </div>

                        <!-- Text container -->
                        <div class="main-text_container">
                            <div class="main-text_container-row">
                                <!-- Shape -->
                                <div class="shape"></div>

                                <!-- Text -->
                                <p class="text">
                                    ${this.gb}
                                </p>
                            </div>

                            <div class="main-text_container-row">
                                <!-- Shape -->
                                <div class="shape"></div>

                                <!-- Text -->
                                <p class="text">
                                    служба поддержки 24 / 7
                                </p>
                            </div>

                            <div class="main-text_container-row">
                                <!-- Shape -->
                                <div class="shape"></div>

                                <!-- Text -->
                                <p class="text">
                                    ${this.sitesQuantity}
                                </p>
                            </div>
                        </div>

                        <!-- Btn -->
                        <div class="btn-container">
                            <button class="available-services_confirm-button">
                                Приобрести
                            </button>
                        </div>

                        <!-- Paggination -->
                        <div class="paggination-container">
                            <button class="paggination-btn"></button>
                            <button class="paggination-btn"></button>
                            <button class="paggination-btn"></button>
                        </div>
                    </div>

                    <!-- Btn -->
                    <button data-available-forward class="available-services_btn">
                        <img class="available-services_back-btn_img" src="images/modalImages/arrow-right.png" alt="#">
                    </button>
                </div>`

            //Append modal window to parent element
            this.parent.append(modalWindow);

            //Set background image
            modalWindow.querySelector('.content-container_box-bg').style.backgroundImage = `${this.backgroundImage}`;

            //Add 'active' class to paggination button depends on number
            modalWindow.querySelectorAll('.paggination-btn')[this.number].classList.add('paggination-btn_active');

            return true;
        }

        setEvents() {
            //If modal window was rendered on page
            if (this.render()) {
                
                //Set event listeners
                pagginationEvent();
                modalForwardBtnEvent();
                modalBackwardBtnEvent();
            }
        }
    };

    //Database with content of modal window
    const modalDB = [
        //First modal
        {
            name: 'Старт',
            price: '5$',
            memory: 'до 5гб виртуального пространства',
            sites: 'возможность разместить 1 сайт',
            bgImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/../images/modalImages/modal-1.png)',
            number: 0,
            parent: document.querySelector('.available-services'),
        },
        //Second modal
        {
            name: 'Продвинутый',
            price: '10$',
            memory: 'до 10гб виртуального пространства',
            sites: 'возможность разместить 5 сайтов',
            bgImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/../images/modalImages/modal-2.png)',
            number: 1,
            parent: document.querySelector('.available-services'),
        },
        //Third modal
        {
            name: 'Про',
            price: '15$',
            memory: 'до 15гб виртуального пространства',
            sites: 'возможность разместить 10 сайтов',
            bgImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/../images/modalImages/modal-3.png)',
            number: 2,
            parent: document.querySelector('.available-services'),
        },
    ];

    //Modal window bg
    const modalWindowBg = document.querySelector('.available-services'),
        modalWindowOpenBtns = document.querySelectorAll('[data-modal-open]');

    //Open modal window function
    function openModalWindow() {
        //Disable page scrolling
        document.documentElement.style.overflow = 'hidden';

        //Set position 
        modalWindowBg.style.top = '0';

        //Remove 'hidden' class
        modalWindowBg.classList.remove('available-hidden');
    };

    //Apply function on btns
    modalWindowOpenBtns.forEach((item, i) => {
        item.addEventListener('click', () => {
            //Open modal window
            openModalWindow();

            //Render modal window
            renderModalWindow(0);
        });
    });


    //Close modal window function
    function closeModalWindow() {
        //Enable page scrolling
        document.documentElement.style.overflow = 'auto';

        //Add 'hidden' class
        modalWindowBg.classList.add('available-hidden');
    }

    //Apply function
    modalWindowBg.addEventListener('click', e => {
        if (e.target.classList.contains('available-services_bg')) {
            closeModalWindow();
        }
    });

    document.addEventListener('keydown', e => {
        if (e.code === 'Escape') {
            //Check if modal window is open
            if (!modalWindowBg.classList.contains('available-hidden')) {
                closeModalWindow();
            }
        }
    });


    //Paggination func
    function pagginationEvent() {

        //Get all paggination btns from parent element
        let paggination = document.querySelector('.paggination-container');

        let pagginationBtnsArr = [];
        
        paggination.childNodes.forEach( item => {
            if (item.nodeName !== '#text' && item.nodeName !== '#comment' && item.classList.contains('paggination-btn')) {
                pagginationBtnsArr.push(item);
            }
        });

        //Set event listeners on paggination btns
        pagginationBtnsArr.forEach( (item, i) => {
            item.addEventListener('click', () => {
                renderModalWindow(i);
            });
        });
    };

    //Modal window btns events
    function modalForwardBtnEvent() {
        
        //Get forward btn
        let forwardBtn = document.querySelector('[data-available-forward]');

        forwardBtn.addEventListener('click', () => {
            
            //Check which window is now active

            //Get all paggination btns from parent element
            let paggination = document.querySelector('.paggination-container');

            let pagginationBtnsArr = [];
            
            paggination.childNodes.forEach( item => {
                if (item.nodeName !== '#text' && item.nodeName !== '#comment' && item.classList.contains('paggination-btn')) {
                    pagginationBtnsArr.push(item);
                }
            });

            //Check which paggination btn has 'paggination-active' class
            let activeBtn;

            for (let i = 0; i < pagginationBtnsArr.length; i++) {
                if (pagginationBtnsArr[i].classList.contains('paggination-btn_active')) {
                    activeBtn = i;
                }
            };

            //If not last slide is active now
            if (activeBtn < pagginationBtnsArr.length - 1) {
                renderModalWindow(activeBtn + 1);
            }
        });
    };

    function modalBackwardBtnEvent(currentNumber) {
        
        //Get backward btn
        let backwardBtn = document.querySelector('[data-available-back]');

        backwardBtn.addEventListener('click', () => {
            //Check which window is now active

            //Get all paggination btns from parent element
            let paggination = document.querySelector('.paggination-container');

            let pagginationBtnsArr = [];
            
            paggination.childNodes.forEach( item => {
                if (item.nodeName !== '#text' && item.nodeName !== '#comment' && item.classList.contains('paggination-btn')) {
                    pagginationBtnsArr.push(item);
                }
            });

            //Check which paggination btn has 'paggination-active' class
            let activeBtn;

            for (let i = 0; i < pagginationBtnsArr.length; i++) {
                if (pagginationBtnsArr[i].classList.contains('paggination-btn_active')) {
                    activeBtn = i;
                }
            };

            //If not first slide is active right now
            if (activeBtn > 0) {
                renderModalWindow(activeBtn - 1);
            }
        });
    };

    //Render modal window func 
    function renderModalWindow(x) {
        //Render content
        if (document.querySelector('.available-services_content')) {
            document.querySelector('.available-services_content').remove();
        };

        let modal = new ModalWindow(modalDB[x].name, modalDB[x].price, modalDB[x].memory, modalDB[x].sites, modalDB[x].bgImage, modalDB[x].number, modalDB[x].parent);
        modal.setEvents();
    };
});