// const addList = (event) => {

//     let btnevent = isButton(event);
//     let li = document.createElement("li");
//     let btn = document.createElement("button");
//     let input = document.createElement("input");
//     input.placeholder = "Enter List Name";
//     let select = document.createElement("select");

//     colors.forEach(color => {
//         if (color.used === false) {
//             let option = document.createElement("option");
//             option.value = color.color;
//             option.setAttribute("style", "color:#fff;");
//             option.style.backgroundColor = color.color;
//             let h5 = document.createElement("h5");
//             h5.innerText = shortenName(color.name);
//             option.appendChild(h5);
//             select.appendChild(option);
//         }
//     });

//     let color = select.value;
//     select.setAttribute("style", "background-color:" + color + ";");
//     select.style.color = 'white';

//     select.addEventListener('click', (event) => {

//         if (event.pointerId == 0) {
//             const color = select.value;
//             select.setAttribute("style", "background-color:" + color + ";");
//             select.style.color = 'white';
//         }
//     })

//     btn.appendChild(select);
//     input.addEventListener('blur', (event) => {

//         if (input.value == "") {
//             // input.parentElement.remove();
//         } else {
//             let inputval = input.value;
//             let parent = event.target.parentElement;
//             let mycolor = getColorName(parent.childNodes[0].value);
//             mycolor.used = true;
//             let newlist = { name: inputval, color: mycolor.color };
//             lists.push(newlist);
//             input.parentElement.remove();
//             let listTag = document.getElementById("list");
//             console.log(listTag.childNodes);
//             listTag.childNodes[3].remove();
//             createList();
//         }
//     });
//     input.addEventListener('keydown', (event) => {
//         if (event.keyCode === 13) {
//             input.blur();
//         }
//     });
//     let currentul = btnevent.parentNode.parentNode;
//     currentul.insertBefore(li, currentul.lastChild);
//     btn.append(input);
//     li.appendChild(btn);
//     input.focus();

// };





//addting task

            // if (task.date === null || task.list === "") {
            //     let extra = document.createElement("div");
            //     extra.className = "extra";
            //     button.appendChild(extra);
            //     if (task.date !== null) {
            //         let extracontainer = document.createElement("div");
            //         extracontainer.className = "extra-container";
            //         let i = document.createElement("i");
            //         i.className = "extra-icon";
            //         let h4 = document.createElement("h4");
            //         h4.innerText = task.date;
            //         extracontainer.appendChild(i);
            //         extracontainer.appendChild(h4);
            //         extra.appendChild(extracontainer);
            //     }
            //     if (task.list !== "") {
            //         let extracontainer = document.createElement("div");
            //         extracontainer.className = "extra-container";
            //         let i = document.createElement("i");
            //         i.className = "extra-circle";
            //         let h4 = document.createElement("h4");
            //         h4.innerText = task.list;
            //         extracontainer.appendChild(i);
            //         extracontainer.appendChild(h4);
            //         extra.appendChild(extracontainer);
            //     }
            // }



            


//upcoming task
// let createContentUpcoming = (bodyContent, menu,event)=>{
//     let menuevent = event;

//     let div = document.createElement("div");
//     div.className = "content";
//     let btn = document.createElement("button");
//     btn.className = "btn";

//     let i = document.createElement("i");
//     i.className = "icon";
//     let h3 = document.createElement("h3");
//     h3.innerText = "Add Task";
//     btn.appendChild(i);
//     btn.appendChild(h3);
//     div.appendChild(btn);

//     let ul = document.createElement("ul");
//     ul.className = "task";
//     btn.addEventListener("click", (event) => {
//         addTask(event, menuevent, menu);

//     });
//     //displaying of previous task based on current day
//     tasks.forEach(task => {
//         const date = new Date();
//         const dateArray = task.date.split('-');
//         let month = dateArray[0] | 0;
//         let day = dateArray[1] | 0;
//         let year = dateArray[2] | 0;

//         if (date.getDate() > day || date.getMonth() + 1 > month || date.getFullYear() > year) {
//             addingTaskElement(ul, task, menu, event);
//         }
//     });


//     div.appendChild(ul);
//     bodyContent.appendChild(div);
//     updateTotal(menu, event);
// };