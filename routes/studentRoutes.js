const express = require('express')
const { getStudents, 
    createStudent,    
    updateStudent,
    deleteStudent
} = require('../controllers/studentController')

const router = express.Router()
router.get('/getall', getStudents)//list or get
router.put("/update/:id",updateStudent)//put
router.post('/create',createStudent)//post
router.delete('/delete/:id',deleteStudent)
module.exports = router