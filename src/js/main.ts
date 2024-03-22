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

    /* lagra i min interface */
    const newCourse: courseInfo = {
        code: codeInput,
        name: nameInput,
        progression: progressionInput,
        syllabus: syllabusInput
    };
    /* kontrollera om kurser redan finns */
    const existingCourse = document.getElementById(codeInput);

    if (existingCourse) {
        if (confirm('Kursen finns redan. Vill du skriva över med den nya informationen?')) {
            /* skriv över med ny information */
            existingCourse.innerHTML = `
            <div class='course' id='${newCourse.code}'>
            <ul>
            <li>Kurskod: ${newCourse.code}</li>
            <li>Kursnamn: ${newCourse.name}</li>
            <li>Progression: ${newCourse.progression}</li>
            <li><a href=${newCourse.syllabus}>Länk till kursplanen</a></li>
            </ul>
            </div>`;

            /* spara till local storage */
            updateCourse(newCourse);
        }

    } else {

        /* skriv ut kursen till DOM */
        writeToDOM(newCourse);

        /* rensa formuläret */
        (document.getElementById("courseForm") as HTMLFormElement).reset();

        /* spara till local storage */
        saveToLocalStorage(newCourse);
    }


}

/* Rensa alla kurser */
function clearAllCourses(): void {
    courseListEl.innerHTML = '';
    localStorage.removeItem('items');
}

/* funktion för att spara till local storage */
function saveToLocalStorage(item: courseInfo): void {
    // Hämta befintlig data från local storage
    const courses = localStorage.getItem('items');

    // Om det finns befintlig data, parsa den från JSON till en array
    let course: courseInfo[] = [];
    if (courses) {
        course = JSON.parse(courses);
    }

    // Lägg till den nya posten till den befintliga datan
    course.push(item);

    // Spara den uppdaterade datan tillbaka till local storage
    localStorage.setItem('items', JSON.stringify(course));
}

/* funktion för att skriva ut till DOM */
function writeToDOM(newCourse): void {
    courseListEl.innerHTML += `
    <div class='course' id='${newCourse.code}'>
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

    if (coursesJson) { // Kontrollerar att coursesJson inte är null
        const courses: courseInfo[] = JSON.parse(coursesJson);
        courses.forEach(e => {
            writeToDOM(e);
        });
    } else {
        console.log("Inga kurser hittades i local storage.");
    }
}

// Funktion för att uppdatera en kurs baserat på dess kod
function updateCourse(courseToUpdate: courseInfo): void {
    // Hämta arrayen från localStorage
    const coursesJson = localStorage.getItem('items');
    if (coursesJson) {
        // Konvertera strängen till en array
        let courses: courseInfo[] = JSON.parse(coursesJson);

        // Hitta objektet och uppdatera det
        courses = courses.map(course => {
            if (course.code === courseToUpdate.code) {
                return courseToUpdate; // Returnera det uppdaterade objektet
            }
            return course; // Returnera objektet som det är om det inte matchar
        });

        // Spara den uppdaterade arrayen tillbaka till localStorage
        localStorage.setItem('items', JSON.stringify(courses));
    }
}