import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import Submission from './models/Submission.js';
import fs from 'fs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configuration Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configuration Multer (stockage temporaire)
const upload = multer({ dest: 'uploads/' });

// Middleware
app.use(cors());
app.use(express.json());

// Connexion MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connecté à MongoDB'))
  .catch(err => console.error('❌ Erreur de connexion MongoDB:', err));

// Routes
app.get('/api/submissions', async (req, res) => {
  try {
    const submissions = await Submission.find().sort({ submittedAt: -1 });
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Nouvelle route POST avec gestion de fichiers
app.post('/api/submissions', upload.fields([
  { name: 'idCard', maxCount: 1 },
  { name: 'proofOfAddress', maxCount: 1 }
]), async (req, res) => {
  try {
    const files = req.files;
    const body = req.body;

    let idCardUrl = '';
    let proofOfAddressUrl = '';
    let idCardName = '';
    let proofOfAddressName = '';

    // Upload Carte d'identité (Obligatoire)
    if (files['idCard'] && files['idCard'][0]) {
      const file = files['idCard'][0];
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'formulaire_clients',
        resource_type: 'auto'
      });
      idCardUrl = result.secure_url;
      idCardName = file.originalname;
      // Nettoyage du fichier temporaire
      fs.unlinkSync(file.path);
    } else {
      return res.status(400).json({ message: "La carte d'identité est obligatoire." });
    }

    // Upload Justificatif (Optionnel)
    if (files['proofOfAddress'] && files['proofOfAddress'][0]) {
      const file = files['proofOfAddress'][0];
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'formulaire_clients',
        resource_type: 'auto'
      });
      proofOfAddressUrl = result.secure_url;
      proofOfAddressName = file.originalname;
      fs.unlinkSync(file.path);
    }

    const newSubmission = new Submission({
      ...body,
      idCardUrl,
      idCardName,
      proofOfAddressUrl,
      proofOfAddressName
    });

    const savedSubmission = await newSubmission.save();
    res.status(201).json(savedSubmission);

  } catch (error) {
    console.error("Erreur upload:", error);
    res.status(500).json({ message: error.message || "Erreur serveur lors de l'upload" });
  }
});

app.delete('/api/submissions', async (req, res) => {
  try {
    await Submission.deleteMany({});
    res.json({ message: 'Toutes les soumissions ont été supprimées' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
