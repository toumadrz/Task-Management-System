
const enterBtn = document.getElementById('enterBtn');
enterBtn.addEventListener("click", async function(){ 
    const searchtask = document.getElementById('searchTask').value;
    const statusFilter = document.getElementById('statusFilter').value;
    let filterData = [];

    if (searchtask == "") {
        //ดึงข้อมูลทั้งหมด
        try {
            const response = await axios.get('http://localhost:5000/getalltask');
            filterData = response.data;
            console.log('Fetched tasks:', filterData);
            renderTaskTable(filterData); // เรียกฟังก์ชันเพื่ออัปเดตตาราง
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }
    else{
       //ดึงข้อมูลที่search
       try {
        // ส่งคำค้นไปยัง API
        const response = await axios.get(`http://localhost:5000/searchtask/${searchtask}`);
        filterData = response.data;
        console.log('Fetched tasks:', filterData);
         
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
    }
    
    
    
    //เอาแต่ statusFilter ที่เลือก
    if (statusFilter !== "all") {
        console.log(statusFilter);
        filterData = filterData.filter(task => task.Status.toLowerCase() === statusFilter.toLowerCase());
    }
    

    renderTaskTable(filterData);
});
