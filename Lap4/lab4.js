document.addEventListener('DOMContentLoaded', function() {
    // Khởi tạo danh sách sinh viên từ localStorage
    let danhSachSinhVien = JSON.parse(localStorage.getItem('danhSachSinhVien')) || [];
    const studentTableBody = document.querySelector('#studentTable tbody');
    const studentForm = document.getElementById('studentForm');

    function renderTable() {
        // Xóa bảng hiện tại
        studentTableBody.innerHTML = '';
        // Hiển thị dữ liệu mới
        danhSachSinhVien.forEach((sinhVien, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${sinhVien.hoTen}</td>
                <td>${sinhVien.maSV}</td>
                <td>${sinhVien.ngaySinh}</td>
                <td>${sinhVien.lop}</td>
                <td>
                    <button onclick="editStudent(${index})">Sửa</button>
                    <button onclick="deleteStudent(${index})">Xóa</button>
                </td>
            `;
            studentTableBody.appendChild(row);
        });
    }

    function saveToLocalStorage() {
        localStorage.setItem('danhSachSinhVien', JSON.stringify(danhSachSinhVien));
    }

    studentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const hoTen = document.getElementById('hoTen').value;
        const maSV = document.getElementById('maSV').value;
        const ngaySinh = document.getElementById('ngaySinh').value;
        const lop = document.getElementById('lop').value;

        if (hoTen && maSV && ngaySinh && lop) {
            const newStudent = { hoTen, maSV, ngaySinh, lop };
            danhSachSinhVien.push(newStudent);
            saveToLocalStorage();
            renderTable();
            studentForm.reset();
        }
    });

    window.editStudent = function(index) {
        const sinhVien = danhSachSinhVien[index];
        document.getElementById('hoTen').value = sinhVien.hoTen;
        document.getElementById('maSV').value = sinhVien.maSV;
        document.getElementById('ngaySinh').value = sinhVien.ngaySinh;
        document.getElementById('lop').value = sinhVien.lop;

        studentForm.onsubmit = function(event) {
            event.preventDefault();
            sinhVien.hoTen = document.getElementById('hoTen').value;
            sinhVien.maSV = document.getElementById('maSV').value;
            sinhVien.ngaySinh = document.getElementById('ngaySinh').value;
            sinhVien.lop = document.getElementById('lop').value;

            danhSachSinhVien[index] = sinhVien;
            saveToLocalStorage();
            renderTable();
            studentForm.reset();
            studentForm.onsubmit = addStudent; 
        };
    }

    window.deleteStudent = function(index) {
        if (confirm('Bạn có chắc chắn muốn xóa sinh viên này?')) {
            danhSachSinhVien.splice(index, 1);
            saveToLocalStorage();
            renderTable();
        }
    }

    
    function addStudent(event) {
        event.preventDefault();
        const hoTen = document.getElementById('hoTen').value;
        const maSV = document.getElementById('maSV').value;
        const ngaySinh = document.getElementById('ngaySinh').value;
        const lop = document.getElementById('lop').value;

        if (hoTen && maSV && ngaySinh && lop) {
            const newStudent = { hoTen, maSV, ngaySinh, lop };
            danhSachSinhVien.push(newStudent);
            saveToLocalStorage();
            renderTable();
            studentForm.reset();
        }
    }

    studentForm.onsubmit = addStudent;

  
    renderTable();
});
