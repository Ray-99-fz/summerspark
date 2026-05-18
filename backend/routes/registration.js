import express from 'express';
import { supabase } from '../lib/supabase.js';

const router = express.Router();

router.post('/create-registration', async (req, res) => {
  try {
    const {
      full_name,
      email,
      phone,
      age,
      school,
      preferred_communication,
      course
    } = req.body;

    const { error } = await supabase
      .from('summer_spark')
      .insert([
        {
          full_name,
          email,
          phone,
          age,
          school,
          preferred_communication,
          course
        }
      ]);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Registration successful'
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;