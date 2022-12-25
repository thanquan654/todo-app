const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const todoList = $(".todo-list")
const completeTodoList = $(".complete-list")
const closeFormBtn = $(".modal-close")
const addWorkBtn = $(".add-work-btn")
const modal = $(".modal")
const formAddBtn = $(".awf-btn")
let deleteTodoBtns = $$(".delete-btn i")
let statusBtns = $$(".status-btn i")

const app = {
    list: [],
    completeList: [],

    loadTodo: function () { 
        let i =-1
        let html = 
        this.list.map((todo) => {
            i++
            return `
                    <li class="todo-item">
                        <div onclick="app.statusChange(${i})" class="status-btn">
                            <i class="doing fa-regular fa-circle"></i>
                        </div>
                        <div class="info">
                            <h2 class="info-name">${todo.work}</h2>
                            <div class="info-deadline">
                                <i class="fa-solid fa-clock"></i>
                                <span class="time">${(todo.deadline).replace("T"," / ")}</span>
                            </div>
                        </div>
                        <div class="category">
                            <span class="category-item">${todo.category}</span>
                        </div>
                        <div onclick="app.deleteTodo(${i})" class="delete-btn">
                            <i class="fa-solid fa-trash"></i>
                        </div>
                    </li>
                `      
        })
        todoList.innerHTML = html.join("")
        let j =-1
        let html2 = 
        this.completeList.map((todo) => {
            j++
            return `
                    <li class="todo-item complete">
                        <div onclick="app.statusChange(${j})" class="status-btn ">
                            <i class="done fa-solid fa-circle-check"></i>
                        </div>
                        <div class="info">
                            <h2 class="info-name">${todo.work}</h2>
                            <div class="info-deadline">
                                <i class="fa-solid fa-clock"></i>
                                <span class="time">Completed</span>
                            </div>
                        </div>
                        <div class="category">
                            <span class="category-item">${todo.category}</span>
                        </div>
                        <div onclick="app.deleteCompleteTodo(${j})" class="delete-btn">
                            <i class="fa-solid fa-trash"></i>
                        </div>
                    </li>
                ` 
        })
        completeTodoList.innerHTML = html2.join("")
    },
    deleteTodo: function (index) {
        this.list.splice(index, 1)
        this.loadTodo()
    },
    deleteCompleteTodo: function (index) {
        this.completeList.splice(index, 1)
        this.loadTodo()
    },
    statusChange: function(index) {
        $$(".status-btn i").forEach(btn => {
            btn.addEventListener("click",(e) => {
                if (e.target.classList.contains("doing")) {
                    let completeTodo = this.list.splice(index, 1)
                    this.completeList.push(...completeTodo)
                    this.loadTodo()
                } else {
                    this.list.push(...this.completeList.splice(index, 1))
                    this.loadTodo()
                }
            })
        });
    },

    eventHandle: function() {
        const _this = this
        // ? Tat/mo modal
        closeFormBtn.addEventListener("click", () => {
            modal.style.display = "none"
        })
        addWorkBtn.addEventListener("click", () => {
            modal.style.display = "flex"
        })

        // ? Khi nhap xong form
        formAddBtn.addEventListener("click", () => {
            _this.list.push(
                {
                    work: $$("input")[0].value,
                    deadline: $$("input")[1].value,
                    category: $$("input")[2].value,
                }
            )
        // Clear cac o input
        for (i=0; i< 3; i++) {
            $$("input")[i].value = null
        }
        this.loadTodo()
        deleteTodoBtns = $$(".delete-btn i")
        statusBtns = $$(".status-btn i")
      
        })
        
        
    },

    start: function () {
        this.eventHandle()
        this.loadTodo()
    }
}
app.start()