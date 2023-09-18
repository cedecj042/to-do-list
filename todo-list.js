let menus = [
    { name: 'Tasks', icon: 'icons/list-check-solid.svg', total: 3 },
    { name: 'Upcoming', icon: 'icons/forward-solid.svg' },
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

let lists = [];

//task = title,description,list,due date,tags
const tasks = [
    { title: "Assignments", description: "Appsdev", date: "2023-09-19", list: "", subtask: ["Appsdev Code", "Review"], active: false },
    { title: "SPMP", description: "Continue with the Functional Requirements", date: "2023-09-21", list: "", subtask: ["Use Case", "Functional Requirements"], active: false },
    { title: "Business Model", description: "Create a Business Model validation board", date: "2023-09-20", list: "", subtask: ["Meeting", "Business Model Canvas"], active: false }
];

//remove task
function removeTaskByTitle(title) {
    const index = tasks.findIndex(task => task.title === title);
    if (index !== -1) {
        tasks.splice(index, 1);
    }
}



//functions
function getVariable(name) {
    return name + "-total";
}
function updateTotal(menu) {
    const isFoundInLists = lists.includes(menu);
    menus[0].total = tasks.length;
    if (isFoundInLists) {
        let totalvar = getVariable(menu.name);
        let total = document.getElementsByClassName(totalvar);
        for (let i = 0; i < total.length; i++) {
            total[i].innerText = menu.total;
        }
        menusvar = getVariable(menus[0].name);
        menustotal = document.getElementsByClassName(menusvar);
        for (let i = 0; i < menustotal.length; i++) {
            menustotal[i].innerText = menus[0].total;
        }
    } else {
        let totalvar = getVariable(menu.name);
        let total = document.getElementsByClassName(totalvar);
        for (let i = 0; i < total.length; i++) {
            total[i].innerText = menu.total;
        }
    }

}

function removeSelectedTask() {
    let div = document.getElementById("selectedTask");
    if (div !== null) {
        div.remove();
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
function removeTaskAndUpdateMenu(task, menu, li) {
    li.parentElement.removeChild(li);
    removeTaskByTitle(task.title);
    updateTotal(menu);
}
function updateListSelect() {
    const select = document.getElementById("select-list");
    let val = select.value;
    if (select === null) { return }

    select.innerHTML = "";

    let defaultopt = document.createElement("option");
    defaultopt.innerText = "Select an option";
    defaultopt.disabled = true;

    if (val !== defaultopt.innerText) {
        for (const list of lists) {
            if (list.name !== select.value) {
                const option = document.createElement("option");
                option.value = list.name;
                option.text = list.name;
                select.appendChild(option);
            }
        }
    } else {
        select.appendChild(defaultopt);
        for (const list of lists) {
            const option = document.createElement("option");
            option.value = list.name;
            option.text = list.name;
            select.appendChild(option);
        }
        select.value = val
    }
}


function removeSubtask(task, subtaskIndex, li) {
    if (subtaskIndex !== -1) {
        task.subtask.splice(subtaskIndex, 1);
        li.remove();
    }
}

function createSubtaskItem(subtaskText, task, index) {
    let li = document.createElement("li");
    li.className = "subtask-li";
    let btn = document.createElement("button");
    btn.className = "subtask-trash";
    btn.addEventListener("click", () => {
        removeSubtask(task, index, li);
    });
    let i = document.createElement("i");
    let h3 = document.createElement("h3");
    h3.innerText = subtaskText;
    li.appendChild(h3);
    li.appendChild(btn);
    btn.appendChild(i);
    return li;
}
function updateActive(btnevent) {


    if (btnevent !== undefined) {
        let btn = btnevent.target;
        while (btn.tagName !== "BUTTON") {
            btn = btn.parentElement;
        }
        currTask = btn.children[0].children[1].innerText;
        let btns = document.getElementsByClassName("task-button");
        for(let i =0 ;i<btns.length;i++){
            btns[i].style.backgroundColor = "#fff";
            btns[i].style.border = "1px solid rgba(0, 0, 0, .055)";
        }
        tasks.forEach(task => {
            if (currTask === task.title) {
                task.active = true;
                btn.style.backgroundColor = "#eceef3";
                btn.style.border = "1px solid rgba(0, 0, 0, .025)";
            } else {
                task.active = false;
            }
        });
    } else {
        tasks.forEach(task => {
            task.active = false;
        });
        let btns = document.getElementsByClassName("task-button");
        for(let i =0 ;i<btns.length;i++){
            // console.log(btns[i]);
            btns[i].style.backgroundColor = "#fff";
            btns[i].style.border = "1px solid rgba(0, 0, 0, .055)";
        }
    }
    
    // #eceef3

}

// List
let createList = () => {
    let taskTag = document.getElementById("list");
    let taskFrag = document.createDocumentFragment();
    let taskul = document.createElement("ul");
    taskul.setAttribute("class", "dynamic-ul");
    taskul.id = "ul-list";

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
        if (mylist.total !== undefined) {
            let span = document.createElement("span");
            span.innerText = mylist.total;
            span.className = mylist.name + "-total";
            btn.appendChild(span);
        }
        btn.addEventListener("click", (event) => {
            showList(event, mylist);
        })
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
        updateListSelect();
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
const showList = (event, list) => {

    if (document.getElementById("body-content") != null) {
        document.getElementById("body-content").remove();
    }
    let body = document.getElementById("selectedMenu");
    createTitle(body, list);

    let bodyContent = document.getElementById("body-content");
    createContentList(bodyContent, list, event);
    body.appendChild(bodyContent);

};

let createContentList = (bodyContent, list, event) => {

    let div = document.createElement("div");
    div.className = "content";

    let ul = document.createElement("ul");
    ul.className = "task";
    //displaying of previous task based on current day
    tasks.forEach(task => {
        if (task.list === list.name) {
            let li = document.createElement("li");
            let button = addingTaskElement(task, list, bodyContent);
            button.removeEventListener("click", () => { });
            button.addEventListener("click", (event) => {
                button.style.backgroundColor = "#eff0f3";
                button.style.border = "1px solid rgba(0, 0, 0, 0)";
                button.style.borderRadius = "10px";
                viewTask(task, event, list);
            });
            li.appendChild(button);
            ul.appendChild(li);
        }
    });
    div.appendChild(ul);
    bodyContent.appendChild(div);
    updateTotal(list, event);
};

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

    task.subtask.forEach((sTask, index) => {
        let li = createSubtaskItem(sTask, task, index);
        ul.appendChild(li);
    });

    div.appendChild(ul);
    frag.appendChild(div);
    return frag;
}

//create Active Task
const viewTask = (task, btnevent, menu) => {
    // const selectedTaskDiv = document.getElementById("selectedTask");
    let selectedTaskDiv = document.getElementById("selectedTask");
    if (selectedTaskDiv === null) {
        selectedTaskDiv = document.createElement("div");
    }
    selectedTaskDiv.innerHTML = "";
    selectedTaskDiv.id = "selectedTask";
    document.body.appendChild(selectedTaskDiv);

    selectedTaskDiv.className = "show";
    let contentdiv = document.createElement("div");
    contentdiv.className = "at-content";
    selectedTaskDiv.appendChild(contentdiv);
    let contentheader = document.createElement("div");
    contentheader.className = "at-header";
    contentdiv.appendChild(contentheader);
    let h2 = document.createElement("h2");
    h2.innerText = "Task:";
    let close = document.createElement("i");
    close.className = "icon-close";
    close.addEventListener("click", () => {
        updateActive();
        selectedTaskDiv.remove();
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
    select.id = "select-list";
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
    if (task.list !== "") {
        select.value = task.list;
    }
    let previousVal = select.value;
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
        lists.forEach(list => {
            if (previousVal !== task.list) {
                if (list.name === task.name) {
                    list.total--;
                    updateTotal(list);
                }
            }
        });
        removeTaskAndUpdateMenu(task, menu, li);
        removeSelectedTask();
    });
    sbtn.addEventListener("click", () => {
        updateActive();
        if (previousVal !== task.list && lists.length !== 0) {
            lists.forEach(list => {
                if (list.name === previousVal) {
                    list.total--;
                    updateTotal(list);
                }
                if (list.name === select.value) {
                    list.total++;
                    updateTotal(list);
                }
            });
        }
        removeSelectedTask();

        task.title = tasktitle.value;
        task.description = textarea.value;
        task.date = dateinput.value;
        const checklist = select.value;
        task.list = checklist === "Select an option" ? "" : checklist;
        let li = btnevent.target;
        while (li.tagName !== "LI") {
            li = li.parentElement;
        }
        li.children[0].remove();
        let button = addingTaskElement(task, menu);
        li.appendChild(button);

    });
    selectedTaskDiv.append(btns);

}

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
    button.appendChild(taskmain);
    button.addEventListener("click", (event) => {
        updateActive(event);
        viewTask(task, event, menu);
    });
    // let selectedTaskDiv = document.getElementById("")
    // if()
    // button.addEventListener('focusout', (event) => {
    //     button.style.backgroundColor = "#fff";
    //     button.style.border = "1px solid rgba(0, 0, 0, .055)";

    // });
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

let createTitle = (body, menu) => {
    let div = document.createElement("div");
    div.setAttribute("id", "body-content");
    let title = body.children[0];
    title.className = "title show";
    let name = title.children[0];
    name.innerText = menu.name;


    if (menu.total === undefined) {
        title.children[1].className = "hide";

    } else {
        title.children[1].className = "show";
        let span = title.children[1];
        span.textContent = menu.total;
        span.setAttribute("class", menu.name + "-total show");
    }
    let trash = document.getElementsByClassName("icon-trash");
    if (trash[0] !== undefined) {
        trash[0].addEventListener("click", (event) => {
            let id = document.getElementById("selectedTask");
            if (id.className === "show") {
                id.className = "hide";
                removeSelectedTask();
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

    }
    body.appendChild(div);

};
function toggleListVisibility(list, expanded, span) {
    // Toggle a class on the list to control its visibility
    if (expanded) {
        span.className = "icon-expand down";
        list.classList.remove("hidden");
    } else {
        span.className = "icon-expand up";
        list.classList.add("hidden");
    }
}
function appendSection(container, title, list, total) {
    if (list.children.length > 0) {
        let section = document.createElement("div");
        section.className = "section expanded";

        let sectionHead = document.createElement("div");
        sectionHead.className = "section-head";

        let span = document.createElement("span");
        span.className = "icon-expand down";
        span.addEventListener("click", () => {
            section.classList.toggle("expanded");
            toggleListVisibility(list, section.classList.contains("expanded"), span);
        });

        let icon = document.createElement("i");
        span.appendChild(icon);

        let sectionTitle = document.createElement("h3");
        sectionTitle.innerText = title;

        let sectionTotal = document.createElement("span");
        sectionTotal.className = "section-total";
        let h3 = document.createElement("h3");
        h3.innerText = `${total}`;
        sectionTotal.append(h3);

        sectionHead.appendChild(sectionTitle);
        sectionHead.appendChild(sectionTotal);
        sectionHead.appendChild(span);
        section.appendChild(sectionHead);
        section.appendChild(list);
        container.appendChild(section);
    }
}

function createContentUpcoming(bodyContent, menu, event) {
    let div = document.createElement("div");
    div.className = "content";

    let ulToday = document.createElement("ul");
    ulToday.className = "task";
    let ulTomorrow = document.createElement("ul");
    ulTomorrow.className = "task";
    let ulThisWeek = document.createElement("ul");
    ulThisWeek.className = "task";
    let ulGeneral = document.createElement("ul");
    ulGeneral.className = "task";

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the beginning of the day

    // Counters for each section
    let todayCount = 0;
    let tomorrowCount = 0;
    let thisWeekCount = 0;
    let generalCount = 0;

    tasks.forEach(task => {
        if (!task.date) {
            // Task has no date, add it to the "General" section
            let li = document.createElement("li");
            let button = addingTaskElement(task, menu);
            li.appendChild(button);
            ulGeneral.appendChild(li);
            generalCount++;
        } else {
            const dueDate = new Date(task.date);
            dueDate.setHours(0, 0, 0, 0); // Set time to the beginning of the day

            if (dueDate.getTime() === today.getTime()) {
                // Task is due today
                let li = document.createElement("li");
                let button = addingTaskElement(task, menu);
                li.appendChild(button);
                ulToday.appendChild(li);
                todayCount++;
            } else {
                // Calculate the time difference in days
                const timeDiff = Math.floor((dueDate - today) / (1000 * 60 * 60 * 24));

                if (timeDiff === 1) {
                    // Task is due tomorrow
                    let li = document.createElement("li");
                    let button = addingTaskElement(task, menu);
                    li.appendChild(button);
                    ulTomorrow.appendChild(li);
                    tomorrowCount++;
                } else if (timeDiff >= 2 && timeDiff <= 7) {
                    // Task is due this week (within 7 days)
                    let li = document.createElement("li");
                    let button = addingTaskElement(task, menu);
                    li.appendChild(button);
                    ulThisWeek.appendChild(li);
                    thisWeekCount++;
                }
            }
        }
    });

    // Add sections to the div
    appendSection(div, "Today", ulToday, todayCount);
    appendSection(div, "Tomorrow", ulTomorrow, tomorrowCount);
    appendSection(div, "This Week", ulThisWeek, thisWeekCount);
    appendSection(div, "General", ulGeneral, generalCount);

    bodyContent.appendChild(div);
    updateTotal(menu, event);
}

const showTask = (menu, event) => {

    if (document.getElementById("body-content") != null) {
        document.getElementById("body-content").remove();
    }
    let body = document.getElementById("selectedMenu");
    createTitle(body, menu);

    let bodyContent = document.getElementById("body-content");
    if (menu.name === "Upcoming") {
        createContentUpcoming(bodyContent, menu, event);
    } else if (menu.name === "Tasks") {
        console.log("Tasksss");
        createContentTasks(bodyContent, menu, event);
    } else {
        createContentSticky(bodyContent, menu);
    }
    body.appendChild(bodyContent);

};

createTasks();
createList();



