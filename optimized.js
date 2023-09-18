// Constants for class names and icons
const ADD_COMPONENT_CLASS = 'add-component';
const SHOW_CLASS = 'show';

// Arrays for menus, colors, and lists
const menus = [
  { name: 'Tasks', icon: 'icons/list-check-solid.svg', total: 1 },
  { name: 'Upcoming', icon: 'icons/forward-solid.svg', total: 0 },
  { name: 'Sticky Wall', icon: 'icons/note-sticky-solid.svg' }
];

const colors = [
  // ... (your color data here)
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
];

const lists = [
  // ... (your list data here)
];

// Task data
const tasks = [
  {
    title: 'Assignments',
    description: 'Appsdev',
    date: '2023-09-18',
    list: '',
    subtask: ['Appsdev Code', 'Review']
  }
];


// Helper function to shorten color names
function shortenName(colorName) {
  const splitColorName = colorName.split(' ');
  const firstElement = splitColorName[1];
  const firstLetter = splitColorName[0].charAt(0);

  const uppercaseFirstLetter = firstLetter.toUpperCase();
  const pg = uppercaseFirstLetter + " " + firstElement;
  return pg;
}

// Helper function to get color object by color code
function getColorName(color) {
    const colorObject = colors.find(colorObject => colorObject.color === color);
    return colorObject;
}

const createList = () => {
    const taskTag = document.getElementById("list");
    const taskul = document.createElement("ul");
    taskul.setAttribute("class", "dynamic-ul");
  
    lists.forEach(mylist => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      const i = document.createElement("i");
      const h5 = document.createElement("h5");
      i.style.borderRadius = "10px";
      i.style.backgroundColor = mylist.color;
      h5.innerText = mylist.name;
      li.appendChild(btn);
      btn.appendChild(i);
      btn.appendChild(h5);
      taskul.appendChild(li);
  
      if (mylist.total !== undefined) {
        const span = document.createElement("span");
        span.innerText = mylist.total;
        span.className = `${mylist.name}-total`;
        btn.appendChild(span);
      }
    });
  
    const li = document.createElement("li");
    const btn = document.createElement("button");
    const i = document.createElement("i");
    const h5 = document.createElement("h5");
    i.style.borderRadius = "10px";
    i.style.backgroundImage = "url(icons/plus-solid.svg)";
    h5.innerText = "Add List";
    li.appendChild(btn);
    btn.appendChild(i);
    btn.appendChild(h5);
    taskul.appendChild(li);
  
    taskTag.innerHTML = "";
    taskTag.appendChild(taskul);
  
    li.addEventListener("click", addList);
  };
  
  const addList = (event) => {
    const div = document.body.children[3];
    div.classList.add("add-component", "show");
    
    const addcontainer = document.createElement("div");
    addcontainer.classList.add("add-container");
    div.appendChild(addcontainer);
    
    const addDiv = document.createElement("div");
    addDiv.classList.add("add-div");
    addcontainer.appendChild(addDiv);
    
    const h3 = document.createElement("h3");
    h3.innerText = "Add List";
    addDiv.appendChild(h3);
  
    const content = document.createElement("div");
    const input = document.createElement("input");
    input.placeholder = "Enter List Name";
    const select = document.createElement("select");
  
    colors.forEach(color => {
      if (!color.used) {
        const option = document.createElement("option");
        option.value = color.color;
        option.style.color = "#fff";
        option.style.backgroundColor = color.color;
        const h5 = document.createElement("h5");
        h5.innerText = shortenName(color.name);
        option.appendChild(h5);
        select.appendChild(option);
      }
    });
  
    select.style.backgroundColor = select.value;
    select.style.color = 'white';
  
    select.addEventListener('click', () => {
      if (event.pointerId == 0) {
        select.style.backgroundColor = select.value;
        select.style.color = 'white';
      }
    });
  
    div.addEventListener('click', (event) => {
      if (event.target.classList.contains("add-component")) {
        div.classList.remove("show");
        addcontainer.remove();
      }
    });
  
    const btn = document.createElement("button");
    btn.innerText = "Add";
    btn.addEventListener('click', () => {
      if (input.value != "") {
        const inputval = input.value;
        const parent = event.target.parentElement;
        const mycolor = getColorName(parent.querySelector("select").value);
        mycolor.used = true;
        const newlist = { name: inputval, color: mycolor.color, total: 0 };
        lists.push(newlist);
        createList();
      }
      div.classList.remove("show");
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
    input.focus();
  };
  



const createTasks = () => {
    const taskTag = document.getElementById("task");
    const taskFrag = document.createDocumentFragment();
    const taskul = document.createElement("ul");
    taskul.classList.add("dynamic-ul");

    menus.forEach(menu => {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        const i = document.createElement("i");
        const h5 = document.createElement("h5");
        i.style.backgroundImage = `url(${menu.icon})`;
        h5.innerText = menu.name;

        li.appendChild(btn);
        btn.appendChild(i);
        btn.appendChild(h5);
        taskul.appendChild(li);

        if (menu.total !== undefined) {
            const span = document.createElement("span");
            span.innerText = menu.total;
            span.className = `${menu.name}-total`;
            btn.appendChild(span);
        }

        btn.addEventListener("click", () => {
            showTask(menu);
        });
    });

    taskFrag.appendChild(taskul);
    taskTag.appendChild(taskFrag);
}

const addingSubtask = (ul, task) => {
    const li = document.createElement("li");
    li.className = "subtask-li";
    const input = document.createElement("input");
    input.className = "subtask-input";
    input.placeholder = "Enter Subtask";
    input.type = "text";
    li.appendChild(input);

    input.addEventListener("focusout", () => {
        if (input.value === "") {
            li.remove();
        } else {
            const subtask = input.value;
            task.subtask.push(subtask);
            input.remove();
            const btn = document.createElement("button");
            btn.className = "subtask-trash";
            btn.addEventListener("click", () => {
                const index = task.subtask.indexOf(subtask);
                if (index !== -1) {
                    task.subtask.splice(index, 1);
                }
                li.remove();
            });
            const i = document.createElement("i");
            const h3 = document.createElement("h3");
            h3.innerText = subtask;
            li.appendChild(h3);
            li.appendChild(btn);
            btn.appendChild(i);
        }
    });

    ul.appendChild(li);
}

const createSubtask = (task) => {
    const frag = document.createDocumentFragment();
    const div = document.createElement("div");
    div.className = "subtask";
    const h3 = document.createElement("h3");
    h3.innerText = "Subtask";
    div.appendChild(h3);

    const button = document.createElement('button');
    button.className = "icon-trash";
    const i = document.createElement("i");
    button.appendChild(i);

    const btn = document.createElement("button");
    btn.className = "btn";
    const icon = document.createElement("i");
    icon.className = "icon";
    const addh3 = document.createElement("h3");
    addh3.innerText = "Add Subtask";
    btn.appendChild(icon);
    btn.appendChild(addh3);
    div.appendChild(btn);

    const ul = document.createElement("ul");
    ul.className = "subtask-ul";
    btn.addEventListener("click", () => {
        const input = document.createElement("input");
        addingSubtask(ul, task);
        input.focus();
    });

    task.subtask.forEach(sTask => {
        const li = document.createElement("li");
        li.className = "subtask-li";
        const btn = document.createElement("button");
        btn.className = "subtask-trash";
        btn.addEventListener("click", () => {
            const index = task.subtask.indexOf(sTask);
            if (index !== -1) {
                task.subtask.splice(index, 1);
            }
            li.remove();
        });
        const i = document.createElement("i");
        const h3 = document.createElement("h3");
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

const viewTask = (task, menu) => {
    const selectedTaskDiv = document.getElementById("selectedTask");
    selectedTaskDiv.innerHTML = "";

    const div = document.getElementById("selectedTask");
    div.className = "show";
    const contentdiv = document.createElement("div");
    contentdiv.className = "at-content";
    div.appendChild(contentdiv);
    const contentheader = document.createElement("div");
    contentheader.className = "at-header";
    contentdiv.appendChild(contentheader);
    const h2 = document.createElement("h2");
    h2.innerText = "Task:";
    const close = document.createElement("i");
    close.className = "icon-close";
    close.addEventListener("click", () => {
        div.className = "hide";
    });
    contentheader.appendChild(h2);
    contentheader.appendChild(close);

    const tasktitle = document.createElement("input");
    tasktitle.placeholder = "Name of Task";
    tasktitle.value = task.title;
    tasktitle.className = "at-title";
    contentdiv.appendChild(tasktitle);

    const textarea = document.createElement("textarea");
    textarea.rows = 5;
    textarea.cols = 30;
    textarea.placeholder = "Description";
    textarea.value = task.description;
    contentdiv.appendChild(textarea);

    const ul = document.createElement("ul");
    ul.className = "at-ul";
    contentdiv.appendChild(ul);

    const list = document.createElement("li");
    list.className = "list";
    ul.appendChild(list);
    const h3list = document.createElement("h3");
    h3list.innerText = "List";
    const select = document.createElement("select");
    const defaultopt = document.createElement("option");
    defaultopt.innerText = "Select an option";
    defaultopt.disabled = true;
    defaultopt.selected = true;
    if (task.list === "") {
        select.appendChild(defaultopt);
    }
    lists.forEach(list => {
        const option = document.createElement("option");
        option.value = list.name;
        option.innerText = list.name;
        select.appendChild(option);
    });
    list.appendChild(h3list);
    list.appendChild(select);

    const duedate = document.createElement("li");
    duedate.className = "due-date";
    ul.appendChild(duedate);
    const h3date = document.createElement("h3");
    h3date.innerText = "Due Date";
    duedate.appendChild(h3date);

    const dateinput = document.createElement("input");
    dateinput.type = "date";
    if (task.date !== "") {
        dateinput.value = task.date;
    }
    duedate.appendChild(dateinput);

    const frag = createSubtask(task);
    contentdiv.appendChild(frag);

    const btns = document.createElement("div");
    btns.className = "btns";
    const dbtn = document.createElement("button");
    dbtn.id = "delete";
    dbtn.innerText = "Delete";
    const sbtn = document.createElement("button");
    sbtn.id = "save";
    sbtn.innerText = "Save Changes";
    btns.appendChild(dbtn);
    btns.appendChild(sbtn);
    dbtn.addEventListener("click", () => {
        div.className = "hide";
        div.innerHTML = "";
        removeTaskByTitle(task.title);
        menu.total--;
        updateTotal(menu);
    });
    sbtn.addEventListener("click", () => {
        div.className = "hide";
        div.innerHTML = "";
        task.title = tasktitle.value;
        task.description = textarea.value;
        task.date = dateinput.value;
        const checklist = select[select.selectedIndex].value;
        if (checklist === "Select an option") {
            task.list = "";
        } else {
            task.list = checklist;
        }
        const li = menu.element;
        for (let i = 0; i < li.children.length; i++) {
            li.children[i].remove();
        }
        if (li.children.length === 0) {
            const button = addingTaskElement(task, menu);
            li.appendChild(button);
        }
    });
    div.appendChild(btns);
}

const showTask = (menu) => {
    if (document.getElementById("body-content") != null) {
        document.getElementById("body-content").remove();
    }
    const body = document.getElementById("selectedMenu");
    createTitle(body, menu);

    const bodyContent = document.getElementById("body-content");
    if (menu.name === "Upcoming") {
        createContentUpcoming(bodyContent, menu);
    } else if (menu.name === "Tasks") {
        createContentTasks(bodyContent, menu);
    } else {
        createContentSticky(bodyContent, menu);
    }
    body.appendChild(bodyContent);
};

const createTitle = (body, menu) => {
    const div = document.createElement("div");
    div.id = "body-content";

    const title = body.children[0];
    title.className = "title show";
    const name = title.children[0];
    name.innerText = menu.name;
    const span = title.children[1];
    span.textContent = menu.total;
    span.className = `${menu.name}-total`;

    const trash = document.getElementsByClassName("icon-trash");
    trash[0].addEventListener("click", () => {
        const id = document.getElementById("selectedTask");
        if (id.className === "show") {
            id.className = "hide";
            id.innerHTML = "";
        }
        const ul = document.getElementsByClassName("task");
        const li = ul[0].children;
        const inputArr = [];

        for (let i = 0; i < li.length; i++) {
            if (li[i].children[0].children[0].children[0]) {
                const input = li[i].children[0].children[0].children[0];
                if (input.checked === true) {
                    inputArr.push(input.parentElement.parentElement);
                    const value = input.parentElement.children[1].innerText;
                    for (let i = 0; i < tasks.length; i++) {
                        if (tasks[i].title === value) {
                            tasks.splice(i, 1);
                            break;
                        }
                    }
                }
            }
        }

        for (let i = 0; i < inputArr.length; i++) {
            inputArr[i].parentElement.remove();
        }

        menu.total -= inputArr.length;
        updateTotal(menu);
    });
    trash[0].removeEventListener("click", () => {});
    body.appendChild(div);
};

const createContentTasks = (bodyContent, menu) => {
    const div = document.createElement("div");
    div.className = "content";
    const btn = document.createElement("button");
    btn.className = "btn";

    const i = document.createElement("i");
    i.className = "icon";
    const h3 = document.createElement("h3");
    h3.innerText = "Add Task";
    btn.appendChild(i);
    btn.appendChild(h3);
    div.appendChild(btn);

    const ul = document.createElement("ul");
    ul.className = "task";
    btn.addEventListener("click", () => {
        addTask(menu);
    });

    tasks.forEach(task => {
        const li = document.createElement("li");
        const button = addingTaskElement(task, menu);
        li.appendChild(button);
        ul.appendChild(li);
    });

    div.appendChild(ul);
    bodyContent.appendChild(div);
    updateTotal(menu);
};

const addTask = (menu) => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const ul = document.querySelector(".task");
    const newTask = { title: "New Task " + tasks.length, description: "", date: "", list: "", subtask: [] };
    tasks.push(newTask);
    menu.total++;
    const li = document.createElement("li");
    const button = addingTaskElement(newTask, menu);
    li.appendChild(button);
    ul.appendChild(li);
};

const addingTaskElement = (task, menu) => {
    const button = document.createElement("button");
    button.className = "task-button";
    const taskmain = document.createElement("div");
    taskmain.className = "task-main";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.className = "task-input";
    taskmain.appendChild(input);

    const h3name = document.createElement("h3");
    h3name.innerText = task.title;
    taskmain.appendChild(h3name);

    const span = document.createElement("span");
    const icon = document.createElement("i");
    span.appendChild(icon);
    taskmain.appendChild(span);

    button.appendChild(taskmain);
    button.addEventListener("click", () => {
        button.style.backgroundColor = "#eff0f3";
        button.style.border = "1px solid rgba(0, 0, 0, 0)";
        button.style.borderRadius = "10px";
        viewTask(task, menu);
    });

    button.addEventListener('focusout', () => {
        button.style.backgroundColor = "#fff";
        button.style.border = "1px solid rgba(0, 0, 0, .055)";
        button.style.borderTop = "0";
        button.style.borderLeft = "0";
        button.style.borderRight = "0";
        button.style.borderRadius = "0";
    });

    if (task.date !== "" || task.list !== "") {
        const extra = document.createElement("div");
        extra.className = "extra";

        if (task.date !== "") {
            const extracontainer = document.createElement("div");
            extracontainer.className = "extra-container";
            const i = document.createElement("i");
            i.className = "extra-icon";
            i.style.backgroundColor = task.date;
            const h4 = document.createElement("h4");
            h4.innerText = task.date;
            extracontainer.appendChild(i);
            extracontainer.appendChild(h4);
            extra.appendChild(extracontainer);
            button.appendChild(extra);
        }

        if (task.list !== "") {
            const extracontainer = document.createElement("div");
            extracontainer.className = "extra-container";
            const i = document.createElement("i");
            i.className = "extra-circle";
            lists.forEach(list => {
                if (list.name === task.list) {
                    i.style.backgroundColor = list.color;
                    return;
                }
            });
            const h4 = document.createElement("h4");
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

const removeTaskByTitle = (title) => {
    const index = tasks.findIndex(task => task.title === title);
    if (index !== -1) {
        tasks.splice(index, 1);
    }
};

const updateTotal = (menu) => {
    const totalElement = document.querySelector(`.${menu.name}-total`);
    if (totalElement) {
        totalElement.textContent = menu.total;
    }
}

createTasks();
createList();
