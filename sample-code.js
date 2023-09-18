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




const viewTask = (task, btnevent, menu) => {

    const selectedTaskDiv = document.getElementById("selectedTask");
    selectedTaskDiv.innerHTML = "";

    let title = event.target.innerText;

    let div = document.getElementById("selectedTask");
    div.className = "show";
    let contentdiv = document.createElement("div");
    contentdiv.className = "at-content";
    div.appendChild(contentdiv);
    let contentheader = document.createElement("div");
    contentheader.className = "at-header";
    contentdiv.appendChild(contentheader);
    let h2 = document.createElement("h2");
    h2.innerText = "Task:";
    let close = document.createElement("i");
    close.className = "icon-close";
    close.addEventListener("click", () => {
        div.className = "hide";
    });
    contentheader.appendChild(h2);
    contentheader.appendChild(close);

    let tasktitle = document.createElement("input");
    tasktitle.placeholder = "Name of Task";
    tasktitle.value = task.title;
    tasktitle.className = "at-title";
    contentdiv.appendChild(tasktitle);

    let textarea = document.createElement("textarea");
    textarea.rows = 5;
    textarea.cols = 30;
    textarea.placeholder = "Description";
    textarea.value = task.description;
    contentdiv.appendChild(textarea);

    let ul = document.createElement("ul");
    ul.className = "at-ul";
    contentdiv.appendChild(ul);
    let list = document.createElement("li");
    list.className = "list";
    ul.appendChild(list);
    let h3 = document.createElement("h3");
    h3.innerText = "List";
    let select = document.createElement("select");
    let defaultopt = document.createElement("option");
    defaultopt.innerText = "Select an option";
    defaultopt.disabled = true;
    defaultopt.selected = true;
    if (task.list === "") {
        select.appendChild(defaultopt);
    }
    lists.forEach(list => {
        let option = document.createElement("option");
        option.value = list.name;
        option.innerText = list.name;
        select.appendChild(option);
    });
    list.appendChild(h3);
    list.appendChild(select);

    let duedate = document.createElement("li");
    duedate.className = "due-date";
    ul.appendChild(duedate);
    let h3date = document.createElement("h3");
    h3date.innerText = "Due Date";
    duedate.appendChild(h3date);

    let dateinput = document.createElement("input");
    dateinput.type = "date";
    if (task.date != "") {
        dateinput.value = task.date;
    }
    duedate.appendChild(dateinput);

    let frag = createSubtask(task);
    contentdiv.appendChild(frag);

    let btns = document.createElement("div");
    btns.className = "btns";
    let dbtn = document.createElement("button");
    dbtn.id = "delete";
    dbtn.innerText = "Delete";
    let sbtn = document.createElement("button");
    sbtn.id = "save";
    sbtn.innerText = "Save Changes";
    btns.appendChild(dbtn);
    btns.appendChild(sbtn);
    dbtn.addEventListener("click", () => {
        removeTaskAndUpdateMenu(task, menu);
    });
    sbtn.addEventListener("click", (event) => {
        const li = event.target.parentElement.parentElement; // Define li here
        updateTaskAndAddButton(task, tasktitle, textarea, dateinput, select, menu, li);
    });
    div.append(btns);

}