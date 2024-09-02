const db = require("../config/db");

//read
const getStudents = async (req, res) => {
    try {
        const data = await db.query('SELECT * FROM loginuser')
        if (!data) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'no rec found',
                }
            )
        } res.status(200).send(
            {
                success: true,
                message: 'rec found',
                data: data[0]
            }
        );
    } catch (error) {
        console.log(error)
        res.status(500).send(
            {
                success: false,
                message: 'error to get api',
                error
            }
        )
    }
};

//create 
const createStudent = async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        const { user_name, user_pass } = req.body;
        console.log("user_name:", user_name);
        console.log("user_pass:", user_pass);

        if (!user_name || !user_pass) {
            return res.status(500).send({
                success: false,
                message: 'please provide all fields'
            });
        }

        const data = await db.query('INSERT INTO loginuser( user_name, user_pass) VALUES(?,?)', [user_name, user_pass]);

        if (!data) {
            return res.status(404).send({
                success: false,
                message: 'error in insert query'
            });
        }

        res.status(201).send({
            success: true,
            message: 'new student rec created'
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error in create student',
            error
        });
    }
};

//update
const updateStudent = async (req, res) => {
    try {
        const studentid = req.params.id;
        if (!studentid) {
            return res.status(404).send({
                success: false,
                message: 'Invalid ID',
            });
        }

        console.log("Request Body:", req.body);
        const { user_name, user_pass } = req.body;

        const data = await db.query(
            'UPDATE loginuser SET user_name = ?, user_pass = ? WHERE loginuser = ?',
            [user_name, user_pass, studentid] // Use 'loginuser' as the column name
        );

        if (!data) {
            return res.status(404).send({
                success: false,
                message: 'Error in update query',
            });
        }

        res.status(201).send({
            success: true,
            message: 'Record updated successfully',
        });

    } catch (error) {
        console.error("Error details:", error); // Log the full error details

        res.status(500).send({
            success: false,
            message: 'Error in update student API',
            error: error.message ? error.message : 'Unknown error', // Ensure some error message is provided
        });
    }
};

//delete
const deleteStudent = async (req, res) => {
    try {
        const studentid = req.params.id;
        if (!studentid) {
            return res.status(404).send({
                success: false,
                message: 'Invalid ID',
            });
        }

        const data = await db.query(
            'DELETE FROM loginuser WHERE loginuser = ?',
            [studentid] 
        );

        if (data.affectedRows === 0) {
            return res.status(404).send({
                success: false,
                message: 'Record not found',
            });
        }

        res.status(200).send({
            success: true,
            message: 'Record deleted successfully',
        });

    } catch (error) {
        console.error("Error details:", error); 

        res.status(500).send({
            success: false,
            message: 'Error in delete student API',
            error: error.message ? error.message : 'Unknown error', 
        });
    }
};



module.exports = { getStudents, createStudent, updateStudent,deleteStudent };