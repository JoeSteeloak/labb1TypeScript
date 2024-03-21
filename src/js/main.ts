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

/* Event listener */
saveBtnEl.addEventListener('click', saveCourse, false);

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
    courseListEl.innerHTML += `
    <ul>
    <li>Kurskod: ${newCourse.code}</li>
    <li>Kursnamn: ${newCourse.name}</li>
    <li>Progression: ${newCourse.progression}</li>
    <li><a href=${newCourse.syllabus}>Länk till kursplanen</a></li>
    </ul>
    `;

}

/* Rensa alla kurser */

