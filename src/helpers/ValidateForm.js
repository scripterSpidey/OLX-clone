function validateForm(){
    if(userName.trim()==''){
        setError([...error,'invalid username'])
    }
    if(!(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email))){
        setError([...error,'invalid email address'])
    }
    if(password.trim().length<4){
        setError([...error,'invaid password'])
    }
}