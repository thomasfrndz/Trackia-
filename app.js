
const exercisesSection = document.getElementById("exercises");
const newSessionSection = document.getElementById("new-session");
const historySection = document.getElementById("history");

function showSection(id) {
    exercisesSection.style.display = id === "exercises" ? "block" : "none";
    newSessionSection.style.display = id === "new-session" ? "block" : "none";
    historySection.style.display = id === "history" ? "block" : "none";
    if (id === "exercises") loadExercises();
    if (id === "history") loadHistory();
}

function loadExercises() {
    fetch("data/exercices.json")
        .then(res => res.json())
        .then(data => {
            exercisesSection.innerHTML = "<h2>Exercices</h2>";
            data.forEach(ex => {
                exercisesSection.innerHTML += `
                    <div>
                        <h3>${ex.nom}</h3>
                        <img src="${ex.image}" alt="${ex.nom}" width="100">
                        <p>${ex.description}</p>
                        <ul>${ex.conseils.map(c => `<li>${c}</li>`).join("")}</ul>
                    </div>
                `;
            });
        });
}

function saveSession() {
    const session = {
        date: new Date().toISOString().split("T")[0],
        exercices: document.getElementById("exs").value.split(","),
        duree: parseInt(document.getElementById("duree").value),
        sensations: {
            energie: parseInt(document.getElementById("energie").value),
            difficulte: parseInt(document.getElementById("difficulte").value),
            fatigue: parseInt(document.getElementById("fatigue").value)
        },
        notes: document.getElementById("notes").value
    };
    const history = JSON.parse(localStorage.getItem("trackia_history") || "[]");
    history.push(session);
    localStorage.setItem("trackia_history", JSON.stringify(history));
    alert("Séance enregistrée !");
}

function loadHistory() {
    const history = JSON.parse(localStorage.getItem("trackia_history") || "[]");
    historySection.innerHTML = "<h2>Historique</h2>";
    history.forEach(s => {
        historySection.innerHTML += `
            <div>
                <strong>${s.date}</strong> - ${s.duree} min<br>
                Exercices : ${s.exercices.join(", ")}<br>
                Énergie : ${s.sensations.energie}, Difficulté : ${s.sensations.difficulte}, Fatigue : ${s.sensations.fatigue}<br>
                Notes : ${s.notes}
            </div><hr>
        `;
    });
}

newSessionSection.innerHTML = `
    <h2>Nouvelle Séance</h2>
    <label>Exercices (séparés par des virgules) :<br><input id="exs"></label><br>
    <label>Durée (min) :<br><input id="duree" type="number"></label><br>
    <label>Énergie (0-10) :<br><input id="energie" type="number"></label><br>
    <label>Difficulté (0-10) :<br><input id="difficulte" type="number"></label><br>
    <label>Fatigue (0-10) :<br><input id="fatigue" type="number"></label><br>
    <label>Notes :<br><textarea id="notes"></textarea></label><br>
    <button onclick="saveSession()">Enregistrer</button>
`;
