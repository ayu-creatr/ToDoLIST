let tasks = [];

displayTask();

function addTask()
{
    let toadd = document.querySelector('#task');
    let tododate = document.querySelector('#date');
    
    if (isValid(toadd, tododate))
    {
        tasks.push({
            item : toadd.value,
            date : tododate.value,
        });
        toadd.value = '';
        tododate.value = ' ';
        localStorage.setItem("task",JSON.stringify(tasks));
        displayTask();
    }
}
function isValid(task, date)
{
    if (task.value === '' || date.value === '') {
        alert('Please enter both task and date.');
        return false;
    }
    let inputDate = new Date(date.value);
    let today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight to compare only the date part

    if (inputDate < today) {
        alert('The date cannot be in the past.');
        return false;
    }
    return true;
}

function displayTask()
{
    tasks = JSON.parse(localStorage.getItem("task"));
    let newtask = document.querySelector('.taskContainner');
    let newHTML = '';
    for (let i = 0; i < tasks.length; i++)
    {
       
        let {item, date} = tasks[i];
        newHTML+= `
            <span>${item}</span>
            <span>${date}</span>
            <button id="remove" onclick= "toremove(tasks, ${i});
            displayTask();">Delete</button>
        `;    
    }
    newtask.innerHTML = newHTML;  
}

function toremove(tasks, i)
{
    tasks.splice(i, 1);
    localStorage.setItem("task", JSON.stringify(tasks));
}