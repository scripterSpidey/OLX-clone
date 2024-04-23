import { collection, getDocs,addDoc  } from "firebase/firestore"; 
import { db } from "./config/firebase";

function App() {
    
    getDocs(collection(db,'products'))
    .then(querySnapshot =>{
        // console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
            // console.log(`${doc.id} => ${doc.data().name}`);
            const datas = doc.data();
            console.log(datas)
        });
    })
    .catch(error=>console.log(error));
    return(
        <div>
            firestore
        </div>
    )
}

export default App
