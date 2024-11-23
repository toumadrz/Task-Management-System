let allData = []; 

//กดปุ่มลบ confirmDeleteButton
document.getElementById('confirmDeleteButton').addEventListener('click', function () {
    const taskId = this.getAttribute('data-task-id'); 
    deleteTask(taskId); 
});


document.getElementById("saveButton").addEventListener("click", saveTask);

taskTableBody.addEventListener("click", (event) => {
    const taskId = event.target.dataset.taskId;
    if (taskId) {
        openEditModal(taskId);
    }
});


async function loadAllData() {
    try {
        const response = await axios.get('http://localhost:5000/getalltask');
        allData = response.data;
        console.log('Fetched tasks:', allData);
        renderTaskTable(allData); 
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

// สร้างตารางด้วย Dom
function renderTaskTable(data = []) {
    const taskTableBody = document.querySelector('#taskall tbody');
    taskTableBody.innerHTML = ''; 

    data.forEach(task => {
        const priorityBadge =
            task.Priority === 'High' ? 'bg-danger' :
                task.Priority === 'Medium' ? 'bg-warning' :
                    'bg-success';

        const statusBadge =
            task.Status === 'Pending' ? 'bg-secondary' :
                task.Status === 'In Progress' ? 'bg-warning' :
                    'bg-success';

        const taskRow = `
        <tr>
            <td>${task.TaskName}</td>
            <td>${task.Detail}</td>
            <td>${new Date(task.Duedate).toLocaleDateString()}</td>
            <td><span class="badge ${priorityBadge}">${task.Priority}</span></td>
            <td><span class="badge ${statusBadge}">${task.Status}</span></td>
            <td>
                <div class="btn-group gap-2" role="group">
                    <button  class="btn btn-sm btn-outline-primary"  onclick="openEditModal('${task._id}')">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-sm btn-outline-danger"  onclick="openDeleteModal('${task._id}')">
                    <i class="fas fa-trash"> Delete</i>
                    </button>
                </div>
            </td>
        </tr>
    `;
        taskTableBody.innerHTML += taskRow;
    });
}

//เปิด Delete Modal
function openDeleteModal(taskId) {
    // เก็บ task._id ในปุ่ม Delete บน Modal
    const confirmDeleteButton = document.getElementById('confirmDeleteButton');
    confirmDeleteButton.setAttribute('data-task-id', taskId);

    // เปิด Modal
    const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    deleteModal.show();
}

async function openEditModal(taskId) {
    //ดึงข้อมูล task นั้นมา
    try {
        const response = await axios.get(`/gettask/${taskId}`);
    const task = response.data;

    const dueDate = new Date(task.Duedate).toISOString().split('T')[0];
    // ดึงข้อมูลtask ใส่ form ใน Modal เพื่ออัพเดตต่อไป
    document.getElementById("floatingTask").value = task.TaskName;
    document.getElementById("floatingDetail").value = task.Detail;
    document.getElementById("floatingDate").value = dueDate;
    document.getElementById("floatingPriority").value = task.Priority;
    document.getElementById("floatingStatus").value = task.Status;

    // เก็บ Task ID ไว้ในปุ่ม Save
    document.getElementById("saveButton").dataset.taskId = task._id;

    // เปิด Modal
    const editModal = new bootstrap.Modal(document.getElementById("editModal"));
            editModal.show();
    } catch (error) {
        console.error("Error fetching task:", error);
        alert("Failed to load task data.");
    }
}
async function deleteTask(id) {
    try {
        const response = await fetch(`/delete/${id}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        if (response.ok) {
            alert('Task deleted successfully');
            
            window.location.reload();
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert('Error deleting task');
        console.error(error);
    }
}

//save task
async function saveTask() {
    const taskId = document.getElementById("saveButton").dataset.taskId;

    const updatedTask = {
        taskName: document.getElementById("floatingTask").value,
        detail: document.getElementById("floatingDetail").value,
        dueDate: document.getElementById("floatingDate").value,
        priority: document.getElementById("floatingPriority").value,
        status: document.getElementById("floatingStatus").value,
    };

    try {
        // ส่งข้อมูลที่แก้ไขไปยัง API
        
        const response = await axios.put(`/updatetask/${taskId}`, updatedTask);

        
        if (response.status === 200) {
        alert("Task updated successfully!");
        window.location.reload();
        }else{
            console.error("Error response:", response.data);
            alert("Failed to save task.");
        }
    } catch (error) {
        console.error("Error saving task:", error);
        alert("Failed to save task.");
    }
}


// เรียกใช้งานเมื่อหน้าโหลด
window.onload = loadAllData;