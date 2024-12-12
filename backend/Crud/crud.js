const express = require('express');
const router = express.Router()
const db  = require('../Database/db')



router.get('/get-api', async(req,res) => {

    const sql = 'SELECT * FROM person';
    const result =  await db.executeQuery(sql);

    res.status(200).json({result})
})



router.post('/register-profile',  async (req, res) => {
    
    const { first_name, last_name, age, email} = req.body;
  
    try {

      const sql = `INSERT INTO person (first_name, last_name, age, email) VALUES (?, ?, ?, ?)`;
      const result = await db.insertQuery(sql, [first_name,last_name, age, email]);
  
      res.status(201).json({
        id: result.id,
        first_name,
        last_name,
        age,
        email,
 
      });
    } catch (error) {
      console.error('Error registering employee:', error);
      res.status(500).json({ error: 'Failed to register employee' });
    }
  });



  router.put('/update-profile/:id',async(req, res) => {
   
    const id = req.params.id;
    const { first_name, last_name, age, email} = req.body;

  
    if (!id) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    let sql = `UPDATE person SET`;
    const values = [];

    if (first_name) {
        sql += ' first_name = ?,';
        values.push(first_name);
    }


    if (last_name) {
        sql += ' last_name = ?,';
        values.push(last_name);
    }

    if (age) {
        sql += ' age = ?,';
        values.push(age);
    }

    if (email) {
        sql += ' email = ?,';
        values.push(email);
    }



    sql = sql.slice(0, -1); 
    sql += ' WHERE id = ?';
    values.push(id);

    try {
   
        const result = await db.executeQuery(sql, values);

    
        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'User profile updated successfully' });
        } else {
            return res.status(404).json({ message: 'User not found or no changes made' });
        }
    } catch (error) {
        console.error('Error updating user profile:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});



router.delete('/delete-profile/:id',async (req, res) => {
    const id = req.params.id;

    if (!id) {
       return res.status(400).json({ message: 'User ID is required' });
   }

   try {
      const sql = `DELETE FROM person WHERE id = ?`;
      const result = await db.executeQuery(sql, [id]);

   if (result.affectedRows > 0) {
         res.status(200).json({ message: 'User profile deleted successfully' });
   } 
   else {
         res.status(404).json({ message: 'User not found' });
   }
 } catch (error) {
     console.error('Error deleting user profile:', error);
     res.status(500).json({ message: 'Internal server error' });
 }
});




module.exports = router