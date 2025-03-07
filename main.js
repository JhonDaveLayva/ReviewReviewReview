const subjectSelector = document.getElementById("subjectContainer")
let jsonFile = []
fetch("main contents.json").then(res => {
    return res.json()
}).then(load => {
    jsonFile = [...load]
    main()
})

main = () => {
    subjectSelector.innerHTML = jsonFile.map(element => {
        let subjectImage;
        if (element["image-path"] == "") {
            subjectImage = "images/image-not-found.jpg"
        } else {
            subjectImage = element["image-path"]
        }

        return `<div class="subject-div">
                    <div class="subject-elements">
                        <div class="subject-img">
                            <img src= ${subjectImage} alt="${element["course-code"]} picture">
                        </div>
                        <div class="subject-description">
                            <h1 class="subject-name">${element["course-name"]}</h1>
                            <div class="other-details">
                                <p class="course-code">Course Code: ${element["course-code"]}</p>
                                <p class="lesson-count">Lessons: ${element["lessons"].length}</p>
                            </div>
                            <h1 class="start-btn" data-index = ${element["course-index"]}>Review this Lesson</h1>
                        </div>
                     </div>
                </div>`
    }).join("")

    const subjects = Array.from(document.getElementsByClassName("start-btn"))
    subjects.forEach(subject => {
        subject.addEventListener("click", e => {
            const selectedSubject = e.target
            localStorage.setItem("subjectChosen", selectedSubject.dataset["index"])                
            return window.location.assign("/lesson.html")
        })
    })
}
