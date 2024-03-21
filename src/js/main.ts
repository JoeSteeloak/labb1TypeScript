/* Interface för en kurs */
interface CourseInfo {
    code: string;
    name: string;
    progression: string;
    syllabus: string;
}

/* variabler */
const saveBtnEl = document.getElementById('saveBtn') as HTMLButtonElement;

/* Event listener */
saveBtnEl.addEventListener('click', saveCourse, false);

/* funktion för att spara en kurs */
function saveCourse(): void {

    /* Lagra kursvariablerna */
    const codeInput: string = (document.getElementById("code") as HTMLInputElement).value;
    const nameInput: string = (document.getElementById("name") as HTMLInputElement).value;
    const progressionInput: string = (document.querySelector('input[name="progression"]:checked') as HTMLInputElement).value;
    const syllabusInput: string = (document.getElementById("syllabus") as HTMLInputElement).value;

    console.log(codeInput, nameInput, progressionInput, syllabusInput);


}

