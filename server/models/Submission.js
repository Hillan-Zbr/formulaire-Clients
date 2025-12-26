import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  id: String,
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  birthDate: { type: String, required: true },
  // On stocke les URLs Cloudinary
  idCardUrl: { type: String, required: true },
  proofOfAddressUrl: String, // Optionnel
  // On garde les noms originaux pour l'affichage
  idCardName: String,
  proofOfAddressName: String,
  submittedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Submission', submissionSchema);
