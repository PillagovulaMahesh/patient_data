const API_URL = "https://xd.adobe.com/view/121254c9-532f-4772-a1ba-dfe529a96b39-4741/"; 

async function fetchPatientData() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const patient = data.patients.find((p) => p.name === "Jessica Taylor");
        if (patient) {
            updatePatientInfo(patient);
            renderChart(patient.bloodPressureData);
        } else {
            console.error("Jessica Taylor not found in the data.");
        }
    } catch (error) {
        console.error("Error fetching patient data:", error);
    }
}

function updatePatientInfo(patient) {
    document.getElementById("name").textContent = patient.name;
    document.getElementById("age").textContent = patient.age;
    document.getElementById("gender").textContent = patient.gender;
}

function renderChart(data) {
    const ctx = document.getElementById("bpChart").getContext("2d");
    new Chart(ctx, {
        type: "line",
        data: {
            labels: data.map((entry) => entry.year),
            datasets: [
                {
                    label: "Systolic",
                    data: data.map((entry) => entry.systolic),
                    borderColor: "rgba(255, 99, 132, 1)",
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    fill: true,
                },
                {
                    label: "Diastolic",
                    data: data.map((entry) => entry.diastolic),
                    borderColor: "rgba(54, 162, 235, 1)",
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    fill: true,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: "top" },
                title: { display: true, text: "Blood Pressure Data" },
            },
        },
    });
}

fetchPatientData();
