import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  id: String, // On garde l'ID généré par le front ou on laisse Mongo gérer le _id
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  birthDate: { type: String, required: true },
  // Pour le prototype, on stocke juste les noms des fichiers
  idCardName: String,
  proofOfAddressName: String,
  submittedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Submission', submissionSchema);

