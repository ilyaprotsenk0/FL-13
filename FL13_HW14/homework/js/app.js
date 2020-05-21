let Student = function(name, email) {
    let studentName = name,
        studentEmail = email;
    let homeworkResults = [];
    return {
        getName: () => {
            return studentName;
        },
        getEmail: () => {
            return studentEmail;
        },
        addHomeworkResult: (topic, success) => {
            return homeworkResults.push({topic, success});
        },
        getHomeworkResults: () => {
            return homeworkResults;
        }
    };
}

let FrontEndLab = function (studentsArr, failedHomeworksLimit) {
    let studentsList = studentsArr.map(stud => new Student(stud.name, stud.email));
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
                    if (student.getEmail() === result.email) {
                        student.addHomeworkResult(homework.topic, result.success);
                    }
                }
            }
        },
        printStudentsEligibleForTest: () => {
            for (let student of studentsList) {
                let failedHomeworksCtr = 0;
                    for (let homework of student.getHomeworkResults()) {
                        if (!homework.success) {
                            failedHomeworksCtr++;
                        }
                    }
                if (failedHomeworksCtr < failedHomeworksLimit) {
                    console.log(student.getName(), student.getEmail());
                }
            }
        }
    };
}