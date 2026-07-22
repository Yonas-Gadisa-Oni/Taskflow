console.log("taskManager is running");


document.addEventListener("DOMContentLoaded", function () {


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



    // HTML elements

    const progressBar = document.querySelector(".progress-bar");

    const progressText = document.getElementById("progressText");

    const taskContainer = document.getElementById("taskContainer");

    const addTaskBtn = document.getElementById("addTaskBtn");

    const createTaskBtn = document.getElementById("createTask");

    const taskModal = document.getElementById("taskModal");

    const closeModal = document.getElementById("closeModal");

    const cancelModal = document.getElementById("cancelModal");

    const searchInput = document.getElementById("searchInput");



    // Dashboard counters

    const totalTasks = document.getElementById("totalTasks");

    const doneTasks = document.getElementById("doneTasks");

    const progressTasks = document.getElementById("progressTasks");

    const urgentTasks = document.getElementById("urgentTasks");





    function saveTasks(){

        localStorage.setItem(
            "tasks",
            JSON.stringify(tasks)
        );

    }






    function updateDashboard(){


        totalTasks.textContent = tasks.length;



        const completed = tasks.filter(task => 
            task.completed === true
        ).length;


        doneTasks.textContent = completed;




        const inProgress = tasks.filter(task =>
            task.completed === false
        ).length;


        progressTasks.textContent = inProgress;




        const urgent = tasks.filter(task =>
            task.priority === "Urgent"
        ).length;


        urgentTasks.textContent = urgent;


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


    progressBar.style.width = percentage + "%";


    progressText.textContent =
    `${completed}/${total} tasks`;

}




    function renderTasks(){


        taskContainer.innerHTML = "";



        const searchValue =
        searchInput.value.toLowerCase();




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



            const taskElement =
            document.createElement("div");



            taskElement.classList.add("task");







            taskElement.innerHTML = `


            <div class="left">


                <input 
                    type="checkbox"
                    ${task.completed ? "checked" : ""}
                >



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



            `;








            // Complete checkbox


            const checkbox =
            taskElement.querySelector("input");



            checkbox.addEventListener("change", function(){


                task.completed = checkbox.checked;


                saveTasks();


                renderTasks();


            });







            // Delete button


            const deleteBtn =
            taskElement.querySelector(".deleteBtn");



            deleteBtn.addEventListener("click", function(){



                const confirmDelete =
                confirm("Delete this task?");



                if(confirmDelete){


                    tasks =
                    tasks.filter(item =>
                        item.id !== task.id
                    );



                    saveTasks();



                    renderTasks();


                }



            });








            taskContainer.appendChild(taskElement);



        });





        updateDashboard();
        updateProgress();



    }

    










    // Open modal


    addTaskBtn.addEventListener("click", function(){


        taskModal.style.display = "flex";


    });









    // Create new task


    createTaskBtn.addEventListener("click", function(){



        const title =
        document.getElementById("taskTitle").value;



        const project =
        document.getElementById("taskProject").value;



        const priority =
        document.getElementById("taskPriority").value;



        const date =
        document.getElementById("taskDate").value;







        if(title === "" || date === ""){


            alert("Please enter title and due date");


            return;


        }








        const newTask = {


            id: Date.now(),


            title:title,


            tags:[project],


            priority:priority,


            dueDate:new Date(date)
            .toDateString(),


            completed:false,


            avatar:"ME",


            avatarColor:"purple"


        };






        tasks.push(newTask);



        saveTasks();



        renderTasks();




        taskModal.style.display = "none";




        document.getElementById("taskTitle").value = "";


        document.getElementById("taskDate").value = "";



    });









    // Close modal


    closeModal.addEventListener("click", function(){


        taskModal.style.display = "none";


    });




    cancelModal.addEventListener("click", function(){


        taskModal.style.display = "none";


    });









    // Search


    searchInput.addEventListener("input", function(){


        renderTasks();


    });








    renderTasks();



});