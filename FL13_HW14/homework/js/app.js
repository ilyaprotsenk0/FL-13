let Student = function(name, email) {
    this.name = name;
    this.email = email;
    this.homeworkResults = [];
    return {
        getName: () => this.name,
        getEmail: () => this.email,
        addHomeworkResult: (topic, success) => {
            this.homeworkResults.push({topic, success})
        },
        getHomeworkResults: () => this.homeworkResults
    };
}

let FrontEndLab = function (studentsArr, failedHomeworksLimit) {
    let studentsList = studentsArr.map(student => new Student(student.name, student.email));
    return {
        printStudentsList: () => {
            for (let student of studentsList) {
                console.log(student.getName(), student.getEmail());
                console.log(student.getHomeworkResults());
            }
        },
        addHomeworkResults: homework => {
            for (let student of studentsList) {
                for (let result of homework.results) {
                    student.getEmail() === result.email ? 
                    student.addHomeworkResult(homework.topic, result.success) : '';
                }
            }
        },
        printStudentsEligibleForTest: () => {
            for (let student of studentsList) {
                let failedHomeworksCtr = 0;
                    for (let homework of student.getHomeworkResults()) {
                        !homework.success ? failedHomeworksCtr++ : '';
                    }
                failedHomeworksCtr <= failedHomeworksLimit ? 
                console.log(student.getName(), student.getEmail()) : '';
            }
        }
    };
}