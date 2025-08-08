document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("studentForm");
    const tableBody = document.querySelector("#studentsTable tbody");

    // استرجاع البيانات المحفوظة
    let students = JSON.parse(localStorage.getItem("students")) || [];

    function renderTable() {
        tableBody.innerHTML = "";
        students.forEach((student, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.guardian}</td>
                <td>${student.address}</td>
                <td>${student.birthPlace}</td>
                <td>${student.condition}</td>
                <td>${student.age}</td>
                <td>${student.photo ? `<img src="${student.photo}" width="50">` : ''}</td>
                <td>
                    <button onclick="deleteStudent(${index})">حذف</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("studentName").value;
        const guardian = document.getElementById("guardianName").value;
        const address = document.getElementById("address").value;
        const birthPlace = document.getElementById("birthPlace").value;
        const condition = document.getElementById("condition").value;
        const age = document.getElementById("age").value;
        const photoFile = document.getElementById("photo").files[0];

        let photoURL = "";
        if (photoFile) {
            const reader = new FileReader();
            reader.onload = function(event) {
                photoURL = event.target.result;
                saveStudent();
            };
            reader.readAsDataURL(photoFile);
        } else {
            saveStudent();
        }

        function saveStudent() {
            const student = { name, guardian, address, birthPlace, condition, age, photo: photoURL };
            students.push(student);
            localStorage.setItem("students", JSON.stringify(students));
            renderTable();
            form.reset();
        }
    });

    // حذف تلميذ
    window.deleteStudent = function(index) {
        students.splice(index, 1);
        localStorage.setItem("students", JSON.stringify(students));
        renderTable();
    };

    renderTable();
});
