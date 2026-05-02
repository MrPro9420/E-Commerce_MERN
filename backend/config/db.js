import mongoose from "mongoose";

export default async function DbConnect() {
    try {
        mongoose.connect(process.env.MONGO_DB_URL).then((conn) => {
            console.log(`Connected to DB ${conn.connection.name}`)
        })
    }
    catch (err) {
        console.error(err.message)
    }

}

