const inputLogin = prompt(`Please enter login`);

const accessList = {
    'Admin' : {
        password : 'RootPassword'
    },
    'User' : {
        password : 'UserPass'
    }
}

if (inputLogin) {
    if (inputLogin.length >= 4) {
        if (accessList[inputLogin]) {
            const inputPassword = prompt('Please enter your password');
            if (inputPassword) {
                if (accessList[inputLogin].password === inputPassword) {
                    const hours = new Date().getHours();
                    hours >= 20 ? alert(`Good evening, dear ${inputLogin}`) : alert(`Good day, dear ${inputLogin}`);
                } else {
                    alert('Wrong password!');
                }
            } else {
                alert('Canceled')
            }
        } else {
            alert(`I don't know you`);
        }
    } else {
        alert(`I don't know any users having name length less than 4 symbols`);
    }
} else {
    alert(`Canceled`);
}