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
            let distant = this.countDeadline(todo)
            i++
            return `
                    <li class="todo-item ${distant.status}">
                        <div onclick="app.statusChange(${i})" class="status-btn">
                            <i class="doing fa-regular fa-circle"></i>
                        </div>
                        <div class="info">
                            <h2 class="info-name contenteditable="false"">${todo.work}</h2>
                            <div class="info-deadline">
                                <i class="fa-solid fa-clock"></i>
                                <span class="time title="${(todo.deadline).replace("T"," / ")}"> ${distant.mgs}</span>
                            </div>
                        </div>
                        <div class="category">
                            <span class="category-item">${todo.category}</span>
                        </div>
                        <div class="action-btn">
                            <div onclick="app.changeEdit()" class="edit-btn">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </div>
                            <div onclick="app.deleteTodo(${i})" class="delete-btn">
                                <i class="fa-solid fa-trash"></i>
                            </div>
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
                                <span class="time">Hoàn thành rùi:))</span>
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
    addTodo: function () {
        this.list.push(
            {
                work: $$("input")[0].value,
                deadline: $$("input")[1].value,
                category: $$("input")[2].value,
            }
        )
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
    changeEdit: function() {
        $$(".edit-btn i").forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.target.parentElement.classList.toggle("active") 
                // Lay ".info-name"
                const nameEditable = e.target.parentElement.parentElement.parentElement.children[1].children[0].contentEditable
                if (nameEditable === "true") {
                    e.target.parentElement.parentElement.parentElement.children[1].children[0].contentEditable = false
                } else {
                    e.target.parentElement.parentElement.parentElement.children[1].children[0].contentEditable = true
                }
            })
        })
    },
    countDeadline: function (todo) {
        const now = new Date().getTime()
        const deadlineTodo = new Date(todo.deadline).getTime()
        const distant = deadlineTodo - now
        const days = Math.floor(distant / 86400000)
        const hours = Math.floor((distant%86400000) /  3600000)

        if (distant < 0) {
            return {
                status: "out-of-date",
                mgs: "Quá hạn mất rùi:(("

            }
        } else {
            if (days > 0) {
                return {
                    mgs: `Còn khoảng ${days} ngày`,
                    status: "low"
                }
            } else if (hours > 0) {
                return {
                    status: "medium",
                    mgs: `Còn khoảng ${hours} giờ`
                }
            } else {
                return {
                    status: "high",
                    mgs: `Làm đi ba, còn dưới 1 giờ thui đó`
                }
            }
        }
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
            _this.addTodo()
            // Clear cac o input
            for (i=0; i< 3; i++) {
                $$("input")[i].value = null
            }
            _this.loadTodo()
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