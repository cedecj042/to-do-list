let menus = [
    { name: 'Tasks', icon: 'icons/list-check-solid.svg', total: 1 },
    { name: 'Upcoming', icon: 'icons/forward-solid.svg', total: 0 },
    { name: 'Sticky Wall', icon: 'icons/note-sticky-solid.svg' }
];
// menus[2].total = menus[0].total + menus[1].total;
let colors = [
    { name: 'Pastel Green', color: '#77dd77', used: false },
    { name: 'Baby Blue', color: '#89cff0', used: false },
    { name: 'Pastel Turquoise', color: '#99c5c4', used: false },
    { name: 'Light Green', color: '#b2fba5', used: false },
    { name: 'Pastel Purple', color: '#b39eb5', used: false },
    { name: 'Pastel Lilac', color: '#bdb0d0', used: false },
    { name: 'Light Periwinkle', color: '#c1c6fc', used: false },
    { name: 'Pastel Violet', color: '#cb99c9', used: false },
    { name: 'Pale Mauve', color: '#c6a4a4', used: false },
    { name: 'Pastel Mint', color: '#cef0cc', used: false },
    { name: 'Pastel Lavender', color: '#d8a1c4', used: false },
    { name: 'Pastel Pink', color: '#dea5a4', used: false },
    { name: 'Pastel Magenta', color: '#f49ac2', used: false },
    { name: 'Baby Pink', color: '#ffb7ce', used: false },
    { name: 'Baby Purple', color: '#ca9bf7', used: false },
    { name: 'Light Pink', color: '#ff9899', used: false }
]

let lists = [
    // { name: 'Personal', color: colors[0].color },
    // { name: 'School', color: colors[1].color },
    // { name: 'List', color: colors[2].color }
];

//task = title,description,list,due date,tags
const tasks = [
    { title: "Assignments", description: "Appsdev", date: "2023-09-18", list: "", subtask: ["Appsdev Code", "Review"],active:0}
];

//remove task
function removeTaskByTitle(title) {
    const index = tasks.findIndex(task => task.title === title);
    if (index !== -1) {
        tasks.splice(index, 1);
        // console.log(`Task "${title}" has been removed.`);
    } else {
        // console.log(`Task "${title}" not found.`);
    }
}



//functions
function getVariable(name) {
    return name + "-total";
}
function updateTotal(menu) {
    let totalvar = getVariable(menu.name);
    let total = document.getElementsByClassName(totalvar);
    for (let i = 0; i < total.length; i++) {
        total[i].innerText = menu.total;
    }

}

function shortenName(colorName) {
    const splitColorName = colorName.split(' ');
    const firstElement = splitColorName[1];
    const firstLetter = splitColorName[0].charAt(0);

    const uppercaseFirstLetter = firstLetter.toUpperCase();
    const pg = uppercaseFirstLetter + " " + firstElement;
    return pg;
}
const getColorName = (color) => {
    const colorObject = colors.find(colorObject => colorObject.color === color);
    return colorObject;
}
function isButton(event) {
    if (event.target.tagName != "BUTTON") {
        return event.target.parentNode;
    }
    return event.target;
}
function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}
function removeTaskAndUpdateMenu(task, menu,li) {
    li.parentElement.removeChild(li);
    removeTaskByTitle(task.title);
    menu.total--;
    updateTotal(menu);
}

function updateTaskAndAddButton(task, tasktitle, textarea, dateinput, select, menu, li) {
    task.title = tasktitle.value;
    task.description = textarea.value;
    task.date = dateinput.value;
    const checklist = select.value;
    task.list = checklist === "Select an option" ? "" : checklist;

    li.innerHTML = ""; // Clear existing content

    if (li.children.length === 0) {
        const button = addingTaskElement(task, menu);
        li.appendChild(button);
    }

    updateTotal(menu);
}


//main functions

// List
let createList = () => {
    let taskTag = document.getElementById("list");
    let taskFrag = document.createDocumentFragment();
    let taskul = document.createElement("ul");
    taskul.setAttribute("class", "dynamic-ul");

    lists.forEach(mylist => {
        let li = document.createElement("li");
        let btn = document.createElement("button");
        let i = document.createElement("i");
        let h5 = document.createElement("h5");
        i.setAttribute("style", `border-radius:10px;background-color:${mylist.color}`);
        h5.innerText = mylist.name;
        li.appendChild(btn);
        btn.appendChild(i);
        btn.appendChild(h5);
        taskul.appendChild(li);
        if (mylist.total != undefined) {
            let span = document.createElement("span");
            span.innerText = mylist.total;
            span.class = mylist.name + "-total";
            btn.appendChild(span);
        }
    });
    let li = document.createElement("li");
    let btn = document.createElement("button");
    btn.addEventListener("click", () => {
        let evenobj = event;
        addList(evenobj);
    });

    let i = document.createElement("i");
    i.setAttribute("style", `border-radius:10px;background-image: url(icons/plus-solid.svg);`);
    let h5 = document.createElement("h5");
    h5.innerText = "Add List";
    // btn.style.position = "fixed";
    // btn.style.bottom = "-20px";
    // btn.style.left = 0;
    li.appendChild(btn);
    btn.appendChild(i);
    btn.appendChild(h5);
    taskul.appendChild(li);

    taskFrag.appendChild(taskul);
    taskTag.appendChild(taskFrag);
}

const addList = (event) => {
    let div = document.body.childNodes[3];
    // div
    div.setAttribute("class", "add-component show");
    let addcontainer = document.createElement("div");
    addcontainer.setAttribute("class", "add-container");
    div.appendChild(addcontainer);
    let addDiv = document.createElement("div");
    addDiv.setAttribute("class", "add-div");
    addcontainer.appendChild(addDiv);
    let h3 = document.createElement("h3");
    h3.innerText = "Add List";
    h3.style.marginTop = 0;
    addDiv.appendChild(h3);

    let content = document.createElement("div");
    let input = document.createElement("input");
    input.placeholder = "Enter List Name";
    let select = document.createElement("select");
    colors.forEach(color => {
        if (color.used === false) {
            let option = document.createElement("option");
            option.value = color.color;
            option.setAttribute("style", "color:#fff;");
            option.style.backgroundColor = color.color;
            let h5 = document.createElement("h5");
            h5.innerText = shortenName(color.name);
            option.appendChild(h5);
            select.appendChild(option);
        }
    });

    let color = select.value;
    select.setAttribute("style", "background-color:" + color + ";");
    select.style.color = 'white';

    select.addEventListener('click', (event) => {

        if (event.pointerId == 0) {
            const color = select.value;
            select.setAttribute("style", "background-color:" + color + ";");
            select.style.color = 'white';
        }
    })

    div.addEventListener('click', (event) => {
        const className = event.target.classList.item(0);
        if (className === "add-component") {
            div.setAttribute("class", "add-component");
            addcontainer.remove();
        }
    });

    let btn = document.createElement("button");
    btn.innerText = "Add";
    btn.addEventListener('click', (event) => {
        if (input.value != "") {
            let inputval = input.value;
            let parent = event.target.parentElement;
            let mycolor = getColorName(parent.childNodes[0].value);
            mycolor.used = true;
            let newlist = { name: inputval, color: mycolor.color, total: 0 };
            lists.push(newlist);
            let listTag = document.getElementById("list");
            listTag.childNodes[3].remove();
            createList();
        }
        div.setAttribute("class", "add-component");
        addcontainer.remove();

    });

    input.addEventListener('keydown', (event) => {
        if (event.keyCode === 13) {
            if (select.value != null) {
                btn.click();
            }
        }
    });

    addDiv.appendChild(content);
    content.appendChild(select);
    content.appendChild(input);
    content.appendChild(btn);
    input.focus()

}

//task
const createTasks = () => {
    let taskTag = document.getElementById("task");
    let taskFrag = document.createDocumentFragment();
    let taskul = document.createElement("ul");
    taskul.setAttribute("class", "dynamic-ul");

    menus.forEach(menu => {
        let li = document.createElement("li");
        let btn = document.createElement("button");
        let i = document.createElement("i");
        let h5 = document.createElement("h5");
        i.setAttribute("style", `background-image: url(${menu.icon});`);
        h5.innerText = menu.name;


        li.appendChild(btn);
        btn.appendChild(i);
        btn.appendChild(h5);
        taskul.appendChild(li);
        if (menu.total != undefined) {
            let span = document.createElement("span");
            span.innerText = menu.total;
            span.className = menu.name + "-total";

            btn.appendChild(span);
        }
        btn.addEventListener("click", (event) => {
            showTask(menu, event);
        })
    });


    taskFrag.appendChild(taskul);
    taskTag.appendChild(taskFrag);
}

//create Subtask 
const addingSubtask = (ul, input, task) => {
    let li = document.createElement("li");
    li.className = "subtask-li";
    input.className = "subtask-input";
    input.placeholder = "Enter Subtask";
    input.type = "text";
    li.appendChild(input);
    input.addEventListener("focusin", () => { });
    input.addEventListener("focusout", () => {
        if (input.value === "") {
            li.remove();
            // console.log("me first");
        } else {
            let subtask = input.value;
            task.subtask.push(subtask);
            input.remove();
            let btn = document.createElement("button");
            btn.className = "subtask-trash";
            btn.addEventListener("click", (event) => {
                task.subtask.splice(task.subtask.indexOf(task), 1);
                event.target.parentElement.parentElement.remove();
                event.stopPropagation();
            });
            let i = document.createElement("i");
            let h3 = document.createElement("h3");
            h3.innerText = subtask;
            li.appendChild(h3);
            li.appendChild(btn);
            btn.appendChild(i);
        }
    });

    ul.appendChild(li);
}
const createSubtask = (task) => {
    let frag = document.createDocumentFragment();

    let div = document.createElement("div");
    div.className = "subtask";

    let h3 = document.createElement("h3");
    h3.innerText = "Subtask";
    div.appendChild(h3);

    let button = document.createElement('button');
    button.className = "icon-trash";
    let i = document.createElement("i");
    button.appendChild(i);

    let btn = document.createElement("button");
    btn.className = "btn";

    let icon = document.createElement("i");
    icon.className = "icon";
    let addh3 = document.createElement("h3");
    addh3.innerText = "Add Subtask";
    btn.appendChild(icon);
    btn.appendChild(addh3);
    div.appendChild(btn);

    let ul = document.createElement("ul");
    ul.className = "subtask-ul";
    btn.addEventListener("click", () => {
        let input = document.createElement("input");
        addingSubtask(ul, input, task);
        input.focus();
    });
    task.subtask.forEach(sTask => {
        let li = document.createElement("li");
        li.className = "subtask-li";
        let btn = document.createElement("button");
        btn.className = "subtask-trash";
        btn.addEventListener("click", (event) => {
            task.subtask.splice(task.subtask.indexOf(task), 1);
            event.target.parentElement.parentElement.remove();
        })
        let i = document.createElement("i");
        let h3 = document.createElement("h3");
        h3.innerText = sTask;
        li.appendChild(h3);
        li.appendChild(btn);
        btn.appendChild(i);
        ul.appendChild(li);
    });
    div.appendChild(ul);
    frag.appendChild(div);
    return frag;

}

//create Active Task
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
    const li = btnevent.target.parentElement.parentElement;
    dbtn.addEventListener("click", () => {
        removeTaskAndUpdateMenu(task, menu,li);
        document.getElementById("selectedTask").className = "hide";
    });
    sbtn.addEventListener("click", () => {
        updateTaskAndAddButton(task, tasktitle, textarea, dateinput, select, menu, li);
        document.getElementById("selectedTask").className = "hide";
    });
    div.append(btns);

}


let createTitle = (body, menu) => {
    let div = document.createElement("div");
    div.setAttribute("id", "body-content");

    let title = body.children[0];
    title.className = "title show";
    let name = title.children[0];
    name.innerText = menu.name;
    let span = title.children[1];
    span.textContent = menu.total;
    span.setAttribute("class", menu.name + "-total");

    let trash = document.getElementsByClassName("icon-trash");
    trash[0].addEventListener("click", (event) => {
        let id = document.getElementById("selectedTask");
        console.log(id);
        if (id.className === "show") {
            id.className = "hide";
            id.innerHTML = "";
        }
        let ul = document.getElementsByClassName("task");
        let li = ul[0].children;
        let inputArr = [];

        for (let i = 0; i < li.length; i++) {
            // Check if the input element exists before trying to access its children property.
            if (li[i].children[0].children[0].children[0]) {
                let input = li[i].children[0].children[0].children[0];
                if (input.checked === true) {
                    inputArr.push(input.parentElement.parentElement);
                    let value = input.parentElement.children[1].innerText;
                    for (let i = 0; i < tasks.length; i++) {
                        if (tasks[i].title === value) {
                            tasks.splice(i, 1);
                            break;
                        }
                    }
                }
            }
        }

        // Loop through the inputArr array and remove the elements from the DOM.
        for (let i = 0; i < inputArr.length; i++) {
            inputArr[i].parentElement.remove();
        }

        event.stopPropagation();
        // Update the menu.total variable.
        menu.total -= inputArr.length;
        updateTotal(menu);
    });
    trash[0].removeEventListener("click", () => { });
    body.appendChild(div);

};

let createContentTasks = (bodyContent, menu, menuevent) => {
    let div = document.createElement("div");
    div.className = "content";
    let addDiv = document.createElement("div");
    addDiv.className = "add-div";

    let input = document.createElement("input");
    input.placeholder = "Add Task";
    input.type = "text";
    input.className = "add-task";

    let button = document.createElement("button");
    button.className = "add-task-btn";
    button.innerText = "Add Task";

    addDiv.appendChild(input);
    addDiv.appendChild(button);
    div.appendChild(addDiv);

    let ul = document.createElement("ul");
    ul.className = "task";
    //displaying of previous task based on current day
    tasks.forEach(task => {
        let li = document.createElement("li");
        let button = addingTaskElement(task, menu);
        li.appendChild(button);
        ul.appendChild(li);

    });

    input.addEventListener("change", () => {
        const taskValue = input.value.trim(); // Remove leading and trailing whitespace
        if (taskValue !== "") {
            const addTaskClickHandler = (event) => {
                addTask(menu, ul, taskValue);
                input.value = "";
                button.removeEventListener("click", addTaskClickHandler);
            };

            button.removeEventListener("click", addTaskClickHandler);

            button.addEventListener("click", addTaskClickHandler);
        }
    });
    div.appendChild(ul);
    bodyContent.appendChild(div);
    updateTotal(menu);

}

let addTask = (menu, ul, taskname) => {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let newTask = { title: taskname, description: "", date: "", list: "", subtask: [] };
    tasks.push(newTask);
    menu.total++;
    let li = document.createElement("li");
    let button = addingTaskElement(newTask, menu);
    li.appendChild(button);
    ul.appendChild(li);

}

let addingTaskElement = (task, menu) => {

    let button = document.createElement("button");
    button.className = "task-button";
    let taskmain = document.createElement("div");
    taskmain.className = "task-main";
    let input = document.createElement("input");
    input.type = "checkbox";
    input.className = "task-input";
    //removing task

    taskmain.appendChild(input);
    let h3name = document.createElement("h3");
    h3name.innerText = task.title;
    taskmain.appendChild(h3name);
    let span = document.createElement("span");
    let icon = document.createElement("i");
    span.appendChild(icon);
    taskmain.appendChild(span);
    button.appendChild(taskmain);
    button.addEventListener("click", (event) => {
        button.style.backgroundColor = "#eff0f3";
        button.style.border = "1px solid rgba(0, 0, 0, 0)";
        button.style.borderRadius = "10px";
        viewTask(task, event, menu);

    });
    button.addEventListener('focusout', (event) => {
        button.style.backgroundColor = "#fff";
        button.style.border = "1px solid rgba(0, 0, 0, .055)";
        button.style.borderTop = "0";
        button.style.borderLeft = "0";
        button.style.borderRight = "0";
        button.style.borderRadius = "0";
        button.style.borderRadius = "0";

    });
    if (task.date !== "" || task.list !== "") {
        let extra = document.createElement("div");
        extra.className = "extra";
        if (task.date !== "") {
            let extracontainer = document.createElement("div");
            extracontainer.className = "extra-container";
            let i = document.createElement("i");
            i.className = "extra-icon";
            i.style.backgroundColor = task
            let h4 = document.createElement("h4");
            h4.innerText = task.date;
            extracontainer.appendChild(i);
            extracontainer.appendChild(h4);
            extra.appendChild(extracontainer);
            button.appendChild(extra);
        }
        if (task.list !== "") {
            let extracontainer = document.createElement("div");
            extracontainer.className = "extra-container";
            let i = document.createElement("i");
            i.className = "extra-circle";
            lists.forEach(list => {
                if (list.name === task.list) {
                    i.style.backgroundColor = list.color;
                    return;
                }
            });
            let h4 = document.createElement("h4");
            h4.innerText = task.list;
            extracontainer.appendChild(i);
            extracontainer.appendChild(h4);
            extra.appendChild(extracontainer);
            button.appendChild(extra);
        }
    }
    updateTotal(menu);
    return button;

}



//upcoming task
let createContentUpcoming = (bodyContent, menu, event) => {

    let div = document.createElement("div");
    div.className = "content";

    let ul = document.createElement("ul");
    ul.className = "task";
    //displaying of previous task based on current day
    tasks.forEach(task => {
        const date = new Date();
        const dateArray = task.date.split('-');
        let month = dateArray[0] | 0;
        let day = dateArray[1] | 0;
        let year = dateArray[2] | 0;

        if (date.getDate() > day || date.getMonth() + 1 > month || date.getFullYear() > year) {
            let li = document.createElement("li");
            let button = addingTaskElement(task, menu);
            li.appendChild(button);
            ul.appendChild(li);
        }
    });


    div.appendChild(ul);
    bodyContent.appendChild(div);
    updateTotal(menu, event);
};

const showTask = (menu, event) => {

    if (document.getElementById("body-content") != null) {
        document.getElementById("body-content").remove();
    }
    let body = document.getElementById("selectedMenu");
    createTitle(body, menu, event);

    let bodyContent = document.getElementById("body-content");
    if (menu.name === "Upcoming") {
        createContentUpcoming(bodyContent, menu, event);
    } else if (menu.name === "Tasks") {
        createContentTasks(bodyContent, menu, event);
    } else {
        createContentSticky(bodyContent, menu);
    }
    body.appendChild(bodyContent);


};

createTasks();
createList();



