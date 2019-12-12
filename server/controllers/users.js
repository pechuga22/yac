const users = [];

exports.addUser = ({id,username}) => {
    username = username.trim().toLowerCase();

    const existingUser = users.find((user) => user.username === username);

    if(existingUser) {
        return {error: 'Username is taken'};
    }

    const user = {id, username};
    users.push(user);

    return { user}
}

 exports.removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if(index !== -1){
        return users.splice(index,1)[0];
    }

}

exports.getUser = (id) => users.find((user) => user.id ===id);


