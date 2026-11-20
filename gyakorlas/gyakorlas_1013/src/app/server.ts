import app from "./app.ts"

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`A szerver fut a ${PORT}-on`)
})