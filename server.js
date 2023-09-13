const express = require('express')
const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const app = express()
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

app.use(express.json())

function validateName(name) {
  return typeof name === 'string';
}

// Fetch all users READ
app.get('/api', async(req, res) => {
    try{
      const { name } = req.body
        const{ data : users, error } = await supabase
            .from('users')
            .select()
        if (error) throw error
        res.json(users)
    } catch(error) {
        console.error(error)
        res.status(500).json({error: "An error occurred"})
    }
})


app.get('/api/:params', async (req, res) => {
    try {
      const param = req.params.params
      if (Number.isInteger(parseInt(param))) {
        const userId = parseInt(param)
        const { data: users, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
  
        if (error) {
          throw new Error(error.message);
        }
    
        if (users) {
          res.status(200).json(users);
        } else {
          res.status(404).json({ error: 'User not found' });
        }
      } else {
        const paramName = param
        const { data: users, error } = await supabase
        .from('users')
        .select('*')
        .eq('name', paramName)
        .single();
  
        if (error) {
          throw new Error(error.message);
        }
    
        if (users) {
          res.status(200).json(users);
        } else {
          res.status(404).json({ error: 'User not found' });
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
});

// Add users
app.post('/api', async(req, res) => {
    try{
      const { name } = req.body
      if (!validateName(name)) {
        return res.status(400).json({ error : "Invalid name format"})
      }
        const{ data : users, error } = await supabase
            .from('users')
            .insert(req.body)
        if (error) throw error
        res.status(201).json(users)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "An error occured"})
    }
})

app.post('/api/:params', async(req, res) => {
  try{
      const name = req.params.params
      const{ data : users, error } = await supabase
          .from('users')
          .insert({name})
      if (error) throw error
      res.status(201).json(users)
  } catch (error) {
      console.error(error)
      res.status(500).json({error: "An error occured"})
  }
})


// Update a user
/*
app.put('/api/:id', async (req, res) => {
    try {
      const { data: user, error } = await supabase
        .from('users')
        .update(req.body)
        .match({ id: req.params.id });
      if (error) throw error;
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
});
*/

app.put('/api/:identifier', async (req, res) => {
  try {
    const identifier = req.params.identifier
    const { name } = req.body
    if (!validateName(name)) {
      return res.status(400).json({ error : "Invalid name format"})
    }

    const isNumber = !isNaN(identifier)
    const filterKey = isNumber ? 'id' : 'name'
    if (filterKey === 'name'){
      const { data: user, error } = await supabase
      .from('users')
      .update({ name })
      .eq(filterKey, identifier);
      if (error) throw error;
      res.json(user);
    } else {
      const { data: user, error } = await supabase
        .from('users')
        .update({ name })
        .eq(filterKey, identifier);
      if (error) throw error;
      res.json(user);
    }     
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Delete a user
app.delete('/api/:identifier', async (req, res) => {
  try {
    const identifier = req.params.identifier;

    if (isNaN(identifier)) {
      // Identifier is a name
      const filterKey = 'name';

      const { error } = await supabase
        .from('users')
        .delete()
        .eq(filterKey, identifier);

      if (error) {
        throw error;
      }
    } else {
      // Identifier is an ID
      const filterKey = 'id';

      const { error } = await supabase
        .from('users')
        .delete()
        .eq(filterKey, identifier);

      if (error) {
        throw error;
      }
    }

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

const port = process.env.PORT || 7000; // Use the provided port or 7000 as a default
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
