import express from 'express';
import { supabase } from '../lib/supabase.js';

const router = express.Router();

router.post('/create-registration', async (req, res) => {
  try {
    console.log("📩 Incoming request to /create-registration");
    console.log("Request body:", req.body);

    const {
      full_name,
      email,
      phone,
      age,
      school,
      preferred_communication,
      course
    } = req.body;

    console.log("Parsed fields:", {
      full_name,
      email,
      phone,
      age,
      school,
      preferred_communication,
      course
    });

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
      console.error("❌ Supabase insert error:", error.message);
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    console.log("✅ Registration inserted successfully for:", email);

    return res.status(200).json({
      success: true,
      message: 'Registration successful'
    });

  } catch (err) {
    console.error("🔥 Server error in /create-registration:", err);
    return res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;
