console.log("taskManager is running");

$(document).ready(function () {

    const defaultTasks = [

        {
            id: 1,
            title: "Redesign onboarding flow for mobile",
            tags: ["Product", "Design", "Mobile"],
            priority: "Urgent",
            dueDate: "Jul 19",
            completed: false,
            avatar: "SR",
            avatarColor: "purple"
        },

        {
            id: 2,
            title: "Fix checkout payment gateway timeout",
            tags: ["Engineering", "Bug", "Payments"],
            priority: "High",
            dueDate: "Jul 20",
            completed: false,
            avatar: "KL",
            avatarColor: "green"
        }

    ];


    let tasks = JSON.parse(localStorage.getItem("tasks")) || defaultTasks;

    const $progressBar = $(".progress-bar");
    const $progressText = $("#progressText");
    const $taskContainer = $("#taskContainer");

    const $addTaskBtn = $("#addTaskBtn");
    const $createTaskBtn = $("#createTask");

    const $taskModal = $("#taskModal");
    const $closeModal = $("#closeModal");
    const $cancelModal = $("#cancelModal");

    const $searchInput = $("#searchInput");

    const $totalTasks = $("#totalTasks");
    const $doneTasks = $("#doneTasks");
    const $progressTasks = $("#progressTasks");
    const $urgentTasks = $("#urgentTasks");

    function saveTasks(){

        localStorage.setItem(
            "tasks",
            JSON.stringify(tasks)
        );

    }

    function updateDashboard(){

        $totalTasks.text(tasks.length);

        const completed = tasks.filter(task =>
            task.completed === true
        ).length;

        $doneTasks.text(completed);

        const inProgress = tasks.filter(task =>
            task.completed === false
        ).length;

        $progressTasks.text(inProgress);

        const urgent = tasks.filter(task =>
            task.priority === "Urgent"
        ).length;

        $urgentTasks.text(urgent);

    }

    function updateProgress(){

        const total = tasks.length;

        const completed = tasks.filter(task =>
            task.completed === true
        ).length;

        let percentage = 0;

        if(total > 0){

            percentage = (completed / total) * 100;

        }

        $progressBar.css(
            "width",
            percentage + "%"
        );

        $progressText.text(
            `${completed}/${total} tasks`
        );

    }

    function renderTasks(){

        $taskContainer.html("");

        const searchValue =
        $searchInput.val().toLowerCase();

        const filteredTasks = tasks.filter(task => {

            return (

                task.title
                .toLowerCase()
                .includes(searchValue)

                ||

                task.priority
                .toLowerCase()
                .includes(searchValue)

                ||

                task.tags.some(tag =>

                    tag.toLowerCase()
                    .includes(searchValue)

                )

            );

        });

        filteredTasks.forEach(task => {

            const taskElement = $(

            `

            <div class="task">

                <div class="left">

                    <input type="checkbox"
                    ${task.completed ? "checked" : ""}>

                    <div class="info">

                        <h4>${task.title}</h4>

                        <div class="tags">

                            ${task.tags.map(tag =>

                                `<span>${tag}</span>`

                            ).join("")}

                        </div>

                    </div>

                </div>

                <div class="right">

                    <span class="priority ${task.priority.toLowerCase()}">

                        ${task.priority}

                    </span>

                    <span class="date">

                        ${task.dueDate}

                    </span>

                    <div class="avatar ${task.avatarColor}">

                        ${task.avatar}

                    </div>

                    <button class="deleteBtn">

                        🗑

                    </button>

                </div>

            </div>

            `);

            // Checkbox change

            taskElement.find("input").on("change", function(){

                task.completed = $(this).is(":checked");

                saveTasks();

                renderTasks();

            });

            // Delete task

            taskElement.find(".deleteBtn").on("click", function(){

                if(confirm("Delete this task?")){

                    tasks = tasks.filter(item =>

                        item.id !== task.id

                    );

                    saveTasks();

                    renderTasks();

                }

            });

            $taskContainer.append(taskElement);

        });

        updateDashboard();

        updateProgress();

    }

    // Open modal

    $addTaskBtn.on("click", function(){

        $taskModal.css(
            "display",
            "flex"
        );

    });

    // Create task

    $createTaskBtn.on("click", function(){

        const title = $("#taskTitle").val();

        const project = $("#taskProject").val();

        const priority = $("#taskPriority").val();

        const date = $("#taskDate").val();

        if(title === "" || date === ""){

            alert("Please enter title and due date");

            return;

        }

        const newTask = {

            id: Date.now(),

            title: title,

            tags: [project],

            priority: priority,

            dueDate: new Date(date)
            .toDateString(),

            completed:false,

            avatar:"ME",

            avatarColor:"purple"

        };

        tasks.push(newTask);

        saveTasks();

        renderTasks();

        $taskModal.css(
            "display",
            "none"
        );

        $("#taskTitle").val("");

        $("#taskDate").val("");

    });

    // Close modal

    $closeModal.on("click", function(){

        $taskModal.css(
            "display",
            "none"
        );

    });

    $cancelModal.on("click", function(){

        $taskModal.css(
            "display",
            "none"
        );

    });

    // Search

    $searchInput.on("input", function(){

        renderTasks();

    });

    renderTasks();

});
