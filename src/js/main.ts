/* Interface för en kurs */
interface courseInfo {
    code: string;
    name: string;
    progression: string;
    syllabus: string;
}

/* variabler */
const saveBtnEl = document.getElementById('saveBtn') as HTMLButtonElement;
const courseListEl = document.getElementById('courseList') as HTMLDivElement;
const clearAllBtnEl = document.getElementById('clearAllBtn') as HTMLButtonElement;

/* Event listener */
saveBtnEl.addEventListener('click', saveCourse, false);
clearAllBtnEl.addEventListener('click', clearAllCourses, false);

/* funktion för att spara en kurs */
function saveCourse(): void {

    /* Lagra kursvariablerna */
    const codeInput: string = (document.getElementById("code") as HTMLInputElement).value;
    const nameInput: string = (document.getElementById("name") as HTMLInputElement).value;
    const progressionInput: string = (document.querySelector('input[name="progression"]:checked') as HTMLInputElement).value;
    const syllabusInput: string = (document.getElementById("syllabus") as HTMLInputElement).value;

    /* testa lagringen */
    console.log(codeInput, nameInput, progressionInput, syllabusInput);

    /* lagra i min interface */
    const newCourse: courseInfo = {
        code: codeInput,
        name: nameInput,
        progression: progressionInput,
        syllabus: syllabusInput
    };

    /* skriv ut kursen till DOM */
    writeToDOM(newCourse);

    /* rensa formuläret */
    (document.getElementById("courseForm") as HTMLFormElement).reset();

    /* spara till local storage */
    saveToLocalStorage(newCourse);
}

/* Rensa alla kurser */
function clearAllCourses(): void {
    courseListEl.innerHTML = '';
}

/* funktion för att spara till local storage */
function saveToLocalStorage(item: courseInfo): void {
    // Hämta befintlig data från local storage
    const existingDataString = localStorage.getItem('items');

    // Om det finns befintlig data, parsa den från JSON till en array
    let existingData: courseInfo[] = [];
    if (existingDataString) {
        existingData = JSON.parse(existingDataString);
    }

    // Lägg till den nya posten till den befintliga datan
    existingData.push(item);

    // Spara den uppdaterade datan tillbaka till local storage
    localStorage.setItem('items', JSON.stringify(existingData));
}

/* funktion för att skriva ut till DOM */
function writeToDOM(newCourse): void {
    courseListEl.innerHTML += `
    <div class='course'>
    <ul>
    <li>Kurskod: ${newCourse.code}</li>
    <li>Kursnamn: ${newCourse.name}</li>
    <li>Progression: ${newCourse.progression}</li>
    <li><a href=${newCourse.syllabus}>Länk till kursplanen</a></li>
    </ul>
    </div>
    `;
}

/* ladda in kurser från local storage */
window.onload = () => {
    const coursesJson = localStorage.getItem('items');
    console.log(coursesJson);

    if (coursesJson) { // Kontrollerar att coursesJson inte är null
        const courses: courseInfo[] = JSON.parse(coursesJson);
        courses.forEach(e => {
            writeToDOM(e);
        });
    } else {
        console.log("Inga kurser hittades i local storage.");
    }
}