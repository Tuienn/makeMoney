//Handle API
async function GET(type) {
    try {
        const response = await fetch(`http://localhost:3000/${type}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching info:", error);
        return [];
    }
}

async function POST(type, info) {
    try {
        const response = await fetch(`http://localhost:3000/${type}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(info),
        });
    } catch (error) {
        console.error("Error adding info:", error);
    }
}
async function PUT(type, id, info) {
    try {
        const response = await fetch(`http://localhost:3000/${type}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(info),
        });
    } catch (error) {
        console.error("Error editing info:", error);
    }
}
async function DELETE(type, id) {
    try {
        await fetch(`http://localhost:3000/${type}/${id}`, {
            method: "DELETE",
        });
    } catch (error) {
        console.error("Error deleting info:", error);
    }
}

async function findVaccine(id) {
    const vaccineInfo = await GET("vaccineInfo");
    const vaccineExists = vaccineInfo.find((vaccine) => vaccine.id === id);
    return vaccineExists;
}
async function findVaccineByName(name) {
    const vaccineInfo = await GET("vaccineInfo");
    const vaccineExists = vaccineInfo.find((vaccine) => vaccine.name === name);
    return vaccineExists;
}

async function findScreeningRecord(id) {
    const screeningInfo = await GET("screeningInfo");
    const screeningRecordExists = screeningInfo.find(
        (record) => record.id === id
    );
    return screeningRecordExists;
}

async function findVaccinationCard(id) {
    const vaccinationCardInfo = await GET("vaccinationCard");
    const vaccinationCardExists = vaccinationCardInfo.find(
        (record) => record.id === id
    );
    return vaccinationCardExists;
}
async function findBill(id) {
    const billInfo = await GET("bill");
    const billExists = billInfo.find((record) => record.id === id);
    return billExists;
}

//Render UI
async function renderVaccineServices() {
    const mainContent = document.querySelector(".main-content");
    const vaccineInfo = await GET("vaccineInfo");

    const htmls = vaccineInfo.map((vaccine) => {
        return `
            <div class="service-item">
                <img src="${vaccine.imgSrc}" alt="${vaccine.name}" />
                <div class="service-info">
                    <h3>${vaccine.name}</h3>
                    <p>Giá: ${vaccine.price.toLocaleString("vi-VN")} VNĐ</p>
                </div>
            </div>
        `;
    });
    const html = htmls.join("");

    mainContent.innerHTML = `<h1>Dịch vụ tiêm chủng</h1>
    <div class="services-grid">${html}</div>`;
}

async function renderScreeningRecords() {
    const mainContent = document.querySelector(".main-content");
    const screeningInfo = await GET("screeningInfo");
    const htmls = screeningInfo.map(
        (record) => `
        <tr>
            <td>${record.id}</td>
            <td>${record.namePatient}</td>
            <td>${record.yearOfBirth}</td>
            <td>${record.gender}</td>
            <td>${record.address}</td>
            <td>${record.disease}</td>
        </tr>
    `
    );
    const html = htmls.join("");

    const content = `
        <h1>Quản lý Phiếu Khám Sàng Lọc</h1>
        <table class="records-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Tên bệnh nhân</th>
                    <th>Năm sinh</th>
                    <th>Giới tính</th>
                    <th>Địa chỉ</th>
                    <th>Bệnh</th>
                </tr>
            </thead>
            <tbody id="recordsBody">
                ${html}
            </tbody>
        </table>
        <div class="action-buttons">
            <button onclick="addScreeningRecord()">Thêm phiếu</button>
            <button onclick="editScreeningRecord()">Sửa phiếu</button>
            <button onclick="deleteScreeningRecord()">Xóa phiếu</button>
        </div>
    `;

    mainContent.innerHTML = content;
}

async function renderVaccinationCards() {
    const mainContent = document.querySelector(".main-content");
    const vaccinationCardInfo = await GET("vaccinationCard");
    const htmls = vaccinationCardInfo.map(
        (record) => `
        <tr>
            <td>${record.id}</td>
            <td>${record.namePatient}</td>
            <td>${record.idScreeningRecord}</td>
            <td>${record.gender}</td>
            <td>${record.address}</td>
            <td>${record.vaccineName}</td>
        </tr>
    `
    );
    const html = htmls.join("");

    mainContent.innerHTML = `<h1>Quản lý Phiếu Tiêm Chủng</h1>
    
    <table class="records-table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Tên bệnh nhân</th>
                <th>ID PSL</th>
                <th>Giới tính</th>
                <th>Địa chỉ</th>
                <th>Tên vaccine</th>
            </tr>
        </thead>
        <tbody id="vaccinationRecordsBody">
            ${html}
        </tbody>
    </table>

    <div class="action-buttons">
        <button onclick="addVaccinationRecord()">Thêm phiếu</button>
        <button onclick="editVaccinationRecord()">Sửa phiếu</button>
        <button onclick="deleteVaccinationRecord()">Xóa phiếu</button>
    </div>`;
}

async function renderBill() {
    const mainContent = document.querySelector(".main-content");
    const billInfo = await GET("bill");
    const htmls = billInfo.map(
        (record) => `
        <tr>
            <td>${record.id}</td>
            <td>${record.namePatient}</td>
            <td>${record.idScreeningRecord}</td>
            <td>${record.idVaccinationCard}</td>
            <td>${record.vaccineName}</td>
            <td>${record.price.toLocaleString("vi-VN")} VND</td>
        </tr>
    `
    );
    const html = htmls.join("");

    mainContent.innerHTML = `<h1>Quản lý Hóa đơn</h1>
    <table class="records-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Tên bệnh nhân</th>
                    <th>ID PSL</th>
                    <th>ID PTC</th>
                    <th>Tên vaccine</th>
                    <th>Giá</th>
                </tr>
            </thead>
            <tbody>
                ${html}
            </tbody>
        </table>
        <div class="action-buttons">
        <button onclick="addBill()">Thêm hóa đơn</button>
        <button onclick="editBill()">Sửa hóa đơn</button>
        <button onclick="deleteBill()">Xóa hóa đơn</button>
    </div>
        `;
}
async function renderStatisticalBill() {
    const mainContent = document.querySelector(".main-content");
    const billInfo = await GET("bill");
    let totalPrice = 0;
    const htmls = billInfo.map((record) => {
        totalPrice += record.price;
        return `
        <tr>
            <td>${record.id}</td>
            <td>${record.namePatient}</td>
            <td>${record.idScreeningRecord}</td>
            <td>${record.idVaccinationCard}</td>
            <td>${record.vaccineName}</td>
            <td>${record.price.toLocaleString("vi-VN")} VND</td>
        </tr>
    `;
    });
    const html = htmls.join("");

    mainContent.innerHTML = `<h1>Thống kê doanh thu</h1>
    <table class="records-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Tên bệnh nhân</th>
                    <th>ID PSL</th>
                    <th>ID PTC</th>
                    <th>Tên vaccine</th>
                    <th>Giá</th>
                </tr>
            </thead>
            <tbody>
                ${html}
            </tbody>
        </table>
        
    </div>
    <h2>Tổng doanh thu: ${totalPrice.toLocaleString("vi-VN")} VND</h2>
        `;
}

// Hanlde "Quản lý phiếu sàng lọc"
function addScreeningRecord() {
    const namePatient = prompt("Nhập tên bệnh nhân:");
    const yearOfBirth = prompt("Nhập năm sinh:");
    const gender = prompt("Nhập giới tính:");
    const address = prompt("Nhập địa chỉ:");
    const disease = prompt("Nhập tên bệnh:");

    if (namePatient && yearOfBirth && gender && address && disease) {
        const newId = Math.random().toString(36).substring(2, 15);

        POST("screeningInfo", {
            id: newId,
            namePatient,
            yearOfBirth,
            gender,
            address,
            disease,
        });
        window.location.reload();
    } else {
        alert("Vui lòng nhập đầy đủ thông tin");
    }
}

// Hàm sửa phiếu
async function editScreeningRecord() {
    const recordId = prompt("Nhập ID của phiếu muốn sửa:");
    const recordRow = await findScreeningRecord(recordId);

    if (recordRow) {
        const namePatient = prompt("Nhập tên bệnh nhân mới:");
        const yearOfBirth = prompt("Nhập năm sinh mới:");
        const gender = prompt("Nhập giới tính mới:");
        const address = prompt("Nhập địa chỉ mới:");
        const disease = prompt("Nhập tên bệnh mới:");

        PUT("screeningInfo", recordId, {
            namePatient,
            yearOfBirth,
            gender,
            address,
            disease,
        });
        window.location.reload();
    } else {
        alert("Không tìm thấy phiếu với ID này.");
    }
}

// Hàm xóa phiếu
async function deleteScreeningRecord() {
    const recordId = prompt("Nhập ID của phiếu muốn xóa:");
    const recordRow = await findScreeningRecord(recordId);

    if (recordRow) {
        DELETE("screeningInfo", recordId);
        window.location.reload();
    } else {
        alert("Không tìm thấy phiếu với ID này.");
    }
}

// Handle "Quản lý phiếu tiêm chủng"
// ... existing code ...

// Handle "Quản lý phiếu tiêm chủng"
async function addVaccinationRecord() {
    const idScreeningRecord = prompt("Nhập ID phiếu sàng lọc:");
    const screeningRecordExists = await findScreeningRecord(idScreeningRecord);
    console.log(screeningRecordExists);

    if (!screeningRecordExists) {
        alert("Phiếu sàng lọc không tồn tại");
        return;
    }
    const namePatient = screeningRecordExists.namePatient;
    const gender = screeningRecordExists.gender;
    const address = screeningRecordExists.address;
    console.log(namePatient, gender, address);

    const vaccineId = prompt("Nhập id vaccine:");

    if (idScreeningRecord && vaccineId) {
        const newId = Math.random().toString(36).substring(2, 15);

        const vaccineExists = await findVaccine(vaccineId);
        if (!vaccineExists) {
            alert("Vaccine không tồn tại");
            return;
        }

        POST("vaccinationCard", {
            id: newId,
            namePatient,
            idScreeningRecord,
            gender,
            address,
            vaccineName: vaccineExists.name,
        });
        window.location.reload();
    } else {
        alert("Vui lòng nhập đầy đủ thông tin");
    }
}

async function editVaccinationRecord() {
    const recordId = prompt("Nhập ID của phiếu tiêm chủng muốn sửa:");
    const recordRow = await findVaccinationCard(recordId);
    if (recordRow) {
        const idScreeningRecord = prompt("Nhập ID phiếu sàng lọc mới:");
        const screeningRecordExists = await findScreeningRecord(
            idScreeningRecord
        );
        if (!screeningRecordExists) {
            alert("Phiếu sàng lọc không tồn tại");
            return;
        }
        const vaccineId = prompt("Nhập id vaccine mới:");
        const vaccineExists = await findVaccine(vaccineId);

        if (!vaccineExists) {
            alert("Vaccine không tồn tại");
            return;
        }

        PUT("vaccinationCard", recordId, {
            namePatient: screeningRecordExists.namePatient,
            idScreeningRecord,
            gender: screeningRecordExists.gender,
            address: screeningRecordExists.address,
            vaccineName: vaccineExists.name,
        });
        window.location.reload();
    } else {
        alert("Không tìm thấy phiếu tiêm chủng với ID này.");
    }
}

async function deleteVaccinationRecord() {
    const recordId = prompt("Nhập ID của phiếu tiêm chủng muốn xóa:");
    const recordRow = await findVaccinationCard(recordId);

    if (recordRow) {
        DELETE("vaccinationCard", recordId);
        window.location.reload();
    } else {
        alert("Không tìm thấy phiếu tiêm chủng với ID này.");
    }
}

// ... existing code ...

async function addBill() {
    const idVaccinationCard = prompt("Nhập ID phiếu tiêm chủng:");
    const vaccinationCardExists = await findVaccinationCard(idVaccinationCard);

    if (!vaccinationCardExists) {
        alert("Phiếu tiêm chủng không tồn tại");
        return;
    }

    const namePatient = vaccinationCardExists.namePatient;
    const idScreeningRecord = vaccinationCardExists.idScreeningRecord;
    const vaccineName = vaccinationCardExists.vaccineName;

    const vaccineInfo = await findVaccineByName(vaccineName);
    if (!vaccineInfo) {
        alert("Không tìm thấy thông tin vaccine");
        return;
    }

    const price = vaccineInfo.price;

    if (idScreeningRecord && idVaccinationCard && price) {
        const newId = Math.random().toString(36).substring(2, 15);

        POST("bill", {
            id: newId,
            namePatient,
            idScreeningRecord,
            idVaccinationCard,
            vaccineName,
            price,
        });
        window.location.reload();
    } else {
        alert("Không thể tạo hóa đơn do thiếu thông tin");
    }
}

async function editBill() {
    const billId = prompt("Nhập ID của hóa đơn muốn sửa:");
    const billRow = await findBill(billId);
    if (billRow) {
        const idVaccinationCard = prompt("Nhập ID phiếu tiêm chủng mới:");
        const vaccinationCardExists = await findVaccinationCard(
            idVaccinationCard
        );

        if (!vaccinationCardExists) {
            alert("Phiếu tiêm chủng không tồn tại");
            return;
        }

        const vaccineInfo = await findVaccineByName(
            vaccinationCardExists.vaccineName
        );
        if (!vaccineInfo) {
            alert("Không tìm thấy thông tin vaccine");
            return;
        }

        PUT("bill", billId, {
            namePatient: vaccinationCardExists.namePatient,
            idScreeningRecord: vaccinationCardExists.idScreeningRecord,
            idVaccinationCard,
            vaccineName: vaccinationCardExists.vaccineName,
            price: vaccineInfo.price,
        });
        window.location.reload();
    } else {
        alert("Không tìm thấy hóa đơn với ID này.");
    }
}

async function deleteBill() {
    const billId = prompt("Nhập ID của hóa đơn muốn xóa:");
    const billRow = await findBill(billId);

    if (billRow) {
        DELETE("bill", billId);
        window.location.reload();
    } else {
        alert("Không tìm thấy hóa đơn với ID này.");
    }
}
async function setupNavigation() {
    const navItems = document.querySelectorAll(".navbar ul li");
    navItems.forEach((item, index) => {
        item.addEventListener("click", (e) => {
            if (index === 0) {
                renderVaccineServices();
            } else if (index === 1) {
                renderScreeningRecords();
            } else if (index === 2) {
                renderVaccinationCards();
            } else if (index === 3) {
                renderBill();
            } else if (index === 4) {
                renderStatisticalBill();
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderVaccineServices(); // Initial render
    setupNavigation();
});
