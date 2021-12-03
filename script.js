
//Aca comienza el scrip!
const store_id = '512332125';
const storeChat = JSON.parse(sessionStorage.getItem(`chat${store_id}`));
if(!storeChat){
    fetch(`https://whatspro.herokuapp.com/api/fullchat/${store_id}`)
    .then(response => response.json())
    .then(response => {
        const store = response;
        store.answers = store.answers?.filter((answer)=> answer.state === true);
        store.employees = store.employees?.filter((employee)=> employee.state === true);
        sessionStorage.setItem(`chat${store_id}`, JSON.stringify(store));
        console.log(store);
        setTimeout(()=>{
            beginFunction(store);
        }, store.chat.delayButtonAppear ?? 0);
    })
    .catch(err =>{
        console.log(err);
});
}else{
    const store = storeChat;
        store.answers = store.answers?.filter((answer)=> answer.state === true);
        store.employees = store.employees?.filter((employee)=> employee.state === true);
        console.log(store);
        setTimeout(()=>{
            beginFunction(store);
        }, store.chat.delayButtonAppear ?? 0);
}

function beginFunction(store){//Chequeo si la tienda tiene el chat habilitado
    if(buttonCanBeShown(store)){
        //Detecto si es un primer ingreso a la tienda o no
        let userIdFlowy = JSON.parse(localStorage.getItem('userIdFlowy'));
        if(!userIdFlowy){
            localStorage.setItem('userIdFlowy', JSON.stringify(`userChat${store_id}`));
        }
        renderButton(store.chat, userIdFlowy);
        initializeChat(store);
        let buttonWPP = document.querySelector('a.whatsapp');
        buttonWPP.addEventListener('click', renderChat);
        let crossIcon = document.querySelector('.flowy-chat-header .fa-times');
        crossIcon.style.color = store.chat.fontColour;
        crossIcon.addEventListener('click', () =>{
            let chat = document.querySelector('.flowy-chat-whatsapp');
            chat.classList.add('flowy-no-visible');
            buttonWPP.style.display = '';
        })
    }
}

    /**********Funciones que utiliza el script ****************/
    //Chequeo si se puede mostrar el boton
function buttonCanBeShown(store){
    let flag = true;
    let arrEmployeesTrue = trueEmployees(store);
    if(!store.chat.visible) flag = false;
    if(!store.state) flag =  false;
    let arrAnswersTrue = [];
    store.answers.forEach((answer)=>{ if(answer.state) arrAnswersTrue.push(answer);});
    if(arrEmployeesTrue.length == 0 && arrAnswersTrue.length == 0) flag = false;
    return flag;
}
function trueEmployees(store){
    let arrEmployeeTrue = [];
    store.employees?.forEach((employee) => {
        if(employee.state){
            arrEmployeeTrue.push(employee)
        }
    })
    return arrEmployeeTrue;
}
    //Chequea si se ingreso de un celular o computadora
function useMobile() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
}
    //Renderiza el boton de WPP
function renderButton(chat, userIdFlowy){
    let button = `<a title="Escríbenos" class="whatsapp">
                    <i class="fab fa-whatsapp"></i>
                </a>`;
    document.querySelector('body').innerHTML += button;
    let buttonWpp = document.querySelector('a.whatsapp');
    buttonWpp.style.background = chat.botonColour;
    buttonWpp.style.bottom = `${chat.yPosition}px`;
    buttonWpp.style.right = `${chat.xPosition.right}px`;
    buttonWpp.style.left = `${chat.xPosition.left}px`;
    let iconWpp = document.querySelector('a.whatsapp i');
    iconWpp.style.color = chat.iconColour;
    //TODO: Cartel/Viñeta cuando es primera vez que ingresa, usando userIdFlowy
}

function initializeChat(store){
    let chat = document.querySelector('.flowy-chat-whatsapp');
    chat.style.background = store.chat.chatColour;
    chat.style.color = `#000000`;
    if(!useMobile()){
        chat.style.bottom = `${store.chat.yPosition + 80}px`;
        if(store.chat.xPosition.right){
        chat.style.right = `${store.chat.xPosition.right}px`;
        } else{
        chat.style.left = `${store.chat.xPosition.left}px`;
        }
    } else{
        chat.style.bottom = `0px`;
        chat.style.left = `0px`;
    }
    let timeNow = new Date();
    let chatHeader = chat.querySelector('.flowy-chat-header h1');
    chatHeader.innerHTML = store.chat.title;
    chatHeader.style.color = store.chat.fontColour;
    chat.querySelector('.flowy-chat-header').style.background = store.chat.headerColour;
    let chatContent = chat.querySelector('.flowy-chat-body');
    chatContent.innerHTML = `<div class='flowy-chat-banner-chat'>Chat desarrollado por <strong>WhatsPRO</strong></div>
                            <div class="flowy-chat-store">
                                <p class="flowy-chat-item-store">${store.chat.description}</p>
                                <p class="meta"><time datetime="${timeNow.getFullYear()}">${("0"+ timeNow.getHours()).slice(-2)}:${("0"+ timeNow.getMinutes()).slice(-2)}</time></p>
                            </div>`;
    renderOptions(store);
}

function renderOptions(store){
    setTimeout(() =>{
        let chat = document.querySelector('.flowy-chat-whatsapp');
        let chatContent = chat.querySelector('.flowy-chat-body');
        chatContent.scrollTop = chatContent.scrollHeight;
        let timeNow = new Date();
        let answersHTML = '';
        store.answers?.forEach((answer, idx)=>{
                answersHTML += `<p class="flowy-chat-item-client flowy-answer-reply" id="answer${idx}">${answer.question}</p>`;
        });
        let arrTrueEmployees = trueEmployees(store);
        if(arrTrueEmployees.length > 0){
            employeesClient = `<p class="flowy-chat-item-client" id="showEmployees">Hablar con un asesor</p>`;
        } else{
            employeesClient = '';
        }
        if(answersHTML.length > 0 || employeesClient.length > 0){
        chatContent.innerHTML += `<div class="flowy-chat-client">
                                <p class="flowy-choice-option" style="text-align: right">Seleccione una opcion...</p>
                                <div>`
                                + answersHTML 
                                + employeesClient
                                + `</div>
                                <p class="meta-client"><time datetime="${timeNow.getFullYear()}">${("0"+ timeNow.getHours()).slice(-2)}:${("0"+ timeNow.getMinutes()).slice(-2)}</time></p>
                            </div>`;
        addEventToClientOptions(store);
        }
        chatContent.scrollTop = chatContent.scrollHeight;
    } , 4000)
}

function renderChat(){
    let chat = document.querySelector('.flowy-chat-whatsapp');
    let buttonWPP = document.querySelector('a.whatsapp');
    let iconWPP = buttonWPP.querySelector('i');
    if(!useMobile()){
        if(chat.classList.contains('flowy-no-visible')){ //Se despliega el chat
            chat.classList.remove('flowy-no-visible');
            iconWPP.classList.remove('fa-whatsapp');
            iconWPP.classList.remove('fab');
            iconWPP.classList.add('fa-chevron-down');
            iconWPP.classList.add('fas');
        } else{ //Se cierra el chat
            chat.classList.add('flowy-no-visible');
            iconWPP.classList.remove('fa-chevron-down');
            iconWPP.classList.remove('fas');
            iconWPP.classList.add('fa-whatsapp');
            iconWPP.classList.add('fab');
        }
    } else{
        if(chat.classList.contains('flowy-no-visible')){ //Se despliega el chat
            chat.classList.remove('flowy-no-visible');
            buttonWPP.style.display = 'none';
        }
    }
}

function addEventToClientOptions(store){
    let answers = document.querySelectorAll('.flowy-answer-reply');
    if(answers.length > store.answers.length) answers = [].slice.call(answers, -store.answers.length);
    if(store.answers.length > 0){
    answers?.forEach((answer, idx) =>{
            answer.addEventListener('click', (e)=>{
                let timeNow = new Date();
                let chat = document.querySelector('.flowy-chat-whatsapp');
                let chatContent = chat.querySelector('.flowy-chat-body');
                let options = chatContent.querySelectorAll('.flowy-chat-client');
                options[options.length - 1].remove();
                chatContent.innerHTML += `<div class="flowy-chat-client">
                                            <div>
                                            <p class="flowy-chat-item-client flowy-answer-reply" id="answer${idx}">${store.answers[idx].question}</p>
                                            </div>
                                            <p class="meta-client"><time datetime="${timeNow.getFullYear()}">${("0"+ timeNow.getHours()).slice(-2)}:${("0"+ timeNow.getMinutes()).slice(-2)}</time></p>
                                        </div>`;
                chatContent.scrollTop = chatContent.scrollHeight;
                renderReplies(idx, store);
                e.preventDefault();
                e.stopPropagation();
            })
    })
    }
    let showEmployees = document.querySelector('#showEmployees');
    if(showEmployees){
        showEmployees.addEventListener('click', (e)=>{
            let timeNow = new Date();
            let chat = document.querySelector('.flowy-chat-whatsapp');
            let chatContent = chat.querySelector('.flowy-chat-body');
            let options = chatContent.querySelectorAll('.flowy-chat-client');
            options[options.length - 1].remove();
            if(store.employees.length > 1){
            chatContent.innerHTML += `<div class="flowy-chat-client">
                                            <div>
                                                <p class="flowy-chat-item-client" id="showEmployees">Hablar con un asesor</p>
                                            </div>
                                            <p class="meta-client"><time datetime="${timeNow.getFullYear()}">${("0"+ timeNow.getHours()).slice(-2)}:${("0"+ timeNow.getMinutes()).slice(-2)}</time></p>
                                        </div>`;
                }
                chatContent.scrollTop = chatContent.scrollHeight;
                renderEmployees(store);
                e.preventDefault();
                e.stopPropagation();
        })
    }
}
function renderReplies(idx, store){
    let chat = document.querySelector('.flowy-chat-whatsapp');
    let chatContent = chat.querySelector('.flowy-chat-body');
    let timeNow = new Date();
    chatContent.innerHTML += `<div class="flowy-chat-store">
                                <p class="flowy-chat-item-store">...</p>
                            </div>`; 
    chatContent.scrollTop = chatContent.scrollHeight;
    setTimeout(() =>{
        chatContent.scrollTop = chatContent.scrollHeight;
        let points = chatContent.querySelectorAll('.flowy-chat-store');
        points[points.length - 1].remove();
        chatContent.innerHTML += `<div class="flowy-chat-store">
                                <p class="flowy-chat-item-store">${store.answers[idx].reply}</p>
                                <p class="meta"><time datetime="${timeNow.getFullYear()}">${("0"+ timeNow.getHours()).slice(-2)}:${("0"+ timeNow.getMinutes()).slice(-2)}</time></p>
                            </div>`;
        store.answers.splice(idx, 1);
        renderOptions(store);
        chatContent.scrollTop = chatContent.scrollHeight;
    }, 3000)
}
function renderEmployees(store){
    if(store.employees.length == 1){
        renderOneEmployee(store.employees[0], store);
    } else{
        let chat = document.querySelector('.flowy-chat-whatsapp');
        let chatContent = chat.querySelector('.flowy-chat-body');
        let timeNow = new Date();
        chatContent.innerHTML += `<div class="flowy-chat-store">
                                <p class="flowy-chat-item-store">...</p>
                            </div>`; 
        chatContent.scrollTop = chatContent.scrollHeight;
        setTimeout(() =>{
            chatContent.scrollTop = chatContent.scrollHeight;
            let points = chatContent.querySelectorAll('.flowy-chat-store');
            points[points.length - 1].remove();
            let employeesHTML = '';
            store.employees.forEach((employee, idx) => {
                if(isWorking(employee)){//Estan en linea
                    employeesHTML += `<p class="flowy-chat-item-store flowy-chat-employee-item id="em${idx}">
                                                <img src="${employee.avatar}">
                                                ${employee.name} - ${employee.role} 
                                                <i>(conectado)</i>
                                    </p>`;
                }else if(employee.allowOutOfScheduleMessage){
                    employeesHTML += `<p class="flowy-chat-item-store flowy-chat-employee-item id="em${idx}">
                                        <img src="${employee.avatar}">
                                        ${employee.name} - ${employee.role} 
                                        <i>(desconectado)</i>
                                        </p>`;
                }
                else{
                    employeesHTML += `<p class="flowy-chat-item-store flowy-chat-employee-item flowy-employee-unavailable id="em${idx}">
                                        <img src="${employee.avatar}">
                                        ${employee.name} - ${employee.role} 
                                        <i>(desconectado)</i>
                                        </p>`;
                }
            });
            chatContent.innerHTML += `<div class="flowy-chat-store">`
                                        + employeesHTML
                                        + `<p class="meta"><time datetime="${timeNow.getFullYear()}">${("0"+ timeNow.getHours()).slice(-2)}:${("0"+ timeNow.getMinutes()).slice(-2)}</time></p>
                                    </div>`;
        addEventToWorkers(store);
        chatContent.scrollTop = chatContent.scrollHeight;
    }, 3000)
    }
}

function isWorking(employee){
    let today = new Date();
    let flag = false;
    let minutesFromToday = today.getHours()*60 + today.getMinutes();
    employee.schedule.forEach((schedule) =>{
        if((schedule.end>= minutesFromToday) && (schedule.start<= minutesFromToday) && (schedule.day == today.getDay())){
            flag = true;
        }
    })
    return flag;
} 

function addEventToWorkers(store){
    let chat = document.querySelector('.flowy-chat-whatsapp');
    let employees = chat.querySelectorAll('.flowy-chat-employee-item');
    employees.forEach((employee, idx) => {
        employee.addEventListener('click', (e)=>{
            renderOneEmployee(store.employees[idx], store);
        })
    })
}
function renderOneEmployee(employee, store){
    let chat = document.querySelector('.flowy-chat-whatsapp');
    const previousChatBody = chat.querySelector('.flowy-chat-body').innerHTML;
    const chatHeader = chat.querySelector('.flowy-chat-header');
    const previousChatHeader = chatHeader.innerHTML;
    chatHeader.classList.add('flowy-employee-main-header');
    chatHeader.innerHTML = `<i class="fas fa-chevron-left"></i>
                            <div class="flowy-employee-main-chat">
                                <img class="flowy-employee-main-chat-avatar" src="${employee.avatar}">
                                <div class="flowy-employee-main-chat-data">
                                    <h2 class="flowy-employee-main-chat-name">${employee.name}</h2>
                                    <p class="flowy-employee-main-chat-role">${employee.role}</p>
                                </div>
                            </div>
                            <i class="fas fa-times"></i>`;
    let crossIcon = chat.querySelector('.flowy-chat-header .fa-times');
    crossIcon.style.color = store.chat.fontColour;
    let arrowIcon = chat.querySelector('.flowy-chat-header .fa-chevron-left');
    arrowIcon.style.color = store.chat.fontColour;
    arrowIcon.style.display = 'block';
    let buttonWPP = document.querySelector('a.whatsapp');
    crossIcon.addEventListener('click', () =>{
        let chat = document.querySelector('.flowy-chat-whatsapp');
        chat.classList.add('flowy-no-visible');
        buttonWPP.style.display = '';
    })
    let timeNow = new Date();
    let chatContent = chat.querySelector('.flowy-chat-body');
    if(isWorking(employee)){
        chatContent.innerHTML = `<div class='flowy-chat-banner-chat'>Chat desarrollado por <strong>WhatsPRO</strong></div>
                            <div class="flowy-chat-store">
                                <p class="flowy-chat-item-store">${employee.welcomeMessage}</p>
                                <p class="meta"><time datetime="${timeNow.getFullYear()}">${("0"+ timeNow.getHours()).slice(-2)}:${("0"+ timeNow.getMinutes()).slice(-2)}</time></p>
                            </div>`;
                        } else{
        chatContent.innerHTML = `<div class='flowy-chat-banner-chat'>Chat desarrollado por <strong>WhatsPRO</strong></div>
        <div class="flowy-chat-store">
        <p class="flowy-chat-item-store">${employee.outMessage}</p>
        <p class="meta"><time datetime="${timeNow.getFullYear()}">${("0"+ timeNow.getHours()).slice(-2)}:${("0"+ timeNow.getMinutes()).slice(-2)}</time></p>
        </div>`;
    }
    if(isWorking(employee) || employee.allowOutOfScheduleMessage){
        let chatToWpp = chat.querySelector('.flowy-send');
        chatToWpp.classList.remove('flowy-no-visible');
        const sendButton = chat.querySelector('.flowy-send a');
        sendButton.href = `https://wa.me/${employee.phoneNumber.prefix}${employee.phoneNumber.phoneNumber}`;
        const chatToWppInput = chat.querySelector('.flowy-send input');
        chatToWppInput.addEventListener('keyup', (e)=>{
            let text = encodeURI(chatToWppInput.value);
            sendButton.href=`https://wa.me/${employee.phoneNumber.prefix}${employee.phoneNumber.phoneNumber}?text=${text}`;
        })
    }
    addEventToArrowEmployee(previousChatBody, previousChatHeader, store);
}

function addEventToArrowEmployee(previousChatBody, previousChatHeader, store){
    let chat = document.querySelector('.flowy-chat-whatsapp');
    let arrowIcon = chat.querySelector('.flowy-chat-header .fa-chevron-left');
    arrowIcon.addEventListener('click', (e)=>{
        let chatToWpp = chat.querySelector('.flowy-send');
        chatToWpp.classList.add('flowy-no-visible');
        renderPreviousChat(previousChatBody,previousChatHeader,store);
        arrowIcon.style.display = 'none';
    })
}

function renderPreviousChat(previousChatBody, previousChatHeader, store){
    let chat = document.querySelector('.flowy-chat-whatsapp');
    const chatHeader = chat.querySelector('.flowy-chat-header');
    const newChatBody = chat.querySelector('.flowy-chat-body');
    chatHeader.classList.remove('flowy-employee-main-header');
    newChatBody.innerHTML = previousChatBody;
    chatHeader.innerHTML = previousChatHeader;
    newChatBody.scrollTop = newChatBody.scrollHeight;
    addEventToWorkers(store);
    let crossIcon = document.querySelector('.flowy-chat-header .fa-times');
    crossIcon.style.color = store.chat.fontColour;
    let buttonWPP = document.querySelector('a.whatsapp');
    crossIcon.addEventListener('click', () =>{
        let chat = document.querySelector('.flowy-chat-whatsapp');
        chat.classList.add('flowy-no-visible');
        buttonWPP.style.display = '';
    })
}