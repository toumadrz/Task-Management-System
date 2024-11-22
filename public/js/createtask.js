document.getElementById('taskForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const task = document.getElementById('floatingTask').value.trim();
    const detail = document.getElementById('floatingDetail').value.trim();
    const date = document.getElementById('floatingDate').value;
    const priority = document.getElementById('floatingPriority').value;

    const errorContainer = document.getElementById('error-container');
    errorContainer.innerHTML = '';

    //ไม่กรอกข้อมูลในช่อง
    if (!task || !detail || !date || !priority) {
        errorContainer.innerHTML = `
           <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Error:</strong> Please provide empty fields.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div>`;
        return;
    }

    //ไม่เลือก Priority
    if (priority == "Select Priority") {
        errorContainer.innerHTML = `
           <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Error:</strong> Please Select Priority.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div>`;
        return;
    }


    try {
        const response = await fetch('/task', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task, detail, date, priority }),
        });

        const result = await response.json();
        if (response.ok) {
            alert('Task created successfully');
            window.location.href = '/';
        } else {
            errorContainer.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    ${result.error}
                </div>`;
        }
    } catch (error) {
        console.error('Error:', error);
        errorContainer.innerHTML = `
            <div class="alert alert-danger" role="alert">
                An unexpected error occurred.
            </div>`;
    }
});