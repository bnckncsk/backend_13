interface IUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  createAt: Date;
  updateAt: Date
}

const getUser = () : Promise<string> => {
    return new Promise((resolve, reject) => {
        const success = true;
        if (success) {
            setTimeout(() => {
                resolve("pisti");
            }, 5000);
        } else {
            reject("error");
        }
    })
}

const getAdmin = () : Promise<IUser> => {
    return new Promise((resolve, reject) => {
    const success = true;
    if (success) {
      setTimeout(() => {
        resolve({id:"10",name:"admin",email:"a@gmail.com", createAt: new Date(), updateAt: new Date()});
      }, 5000);
    } else {
        reject("Az admin adatok nem kerheto le")
    }
  });
};

getUser().then((name) => {
    console.log(`A felhasznalo neve: ${name}`);
}).catch((error) => {
    console.error(`Hiba tortent: ${error}`);
});

Promise.all([getUser,getAdmin]).then(([user,admin]) => {
    console.log("user", user)
    console.log("admin", admin)
})

const user = Promise.resolve({id:10, name:"Pisti", email:"vnd@gmail.com", createAt: new Date(), updateAt: new Date()}); 

Promise.race([user, getAdmin()]).then((leggyorsabb) => {
    console.log("A leggyorsabb:", leggyorsabb);
});

async function main(): Promise<void> {
    try{
        const name = await getUser();
    } catch(error) {
        console.error(`Hiba tortent: ${error}`);
    }
}

main();