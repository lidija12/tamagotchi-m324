import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://mongodb:27017/tamagotchi";

app.use(cors());
app.use(express.json());

const petSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, default: "Tama" },
    color: { type: String, required: true, default: "lavender" },
    hunger: { type: Number, required: true, default: 80 },
    happiness: { type: Number, required: true, default: 80 },
    energy: { type: Number, required: true, default: 80 },
    cleanliness: { type: Number, required: true, default: 80 },
    health: { type: Number, required: true, default: 100 },
    xp: { type: Number, required: true, default: 0 },
    level: { type: Number, required: true, default: 1 },
    is_sleeping: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const petActionSchema = new mongoose.Schema(
  {
    pet_id: { type: mongoose.Schema.Types.ObjectId, ref: "Pet", required: true },
    action_type: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

petSchema.set("toJSON", {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

petActionSchema.set("toJSON", {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    ret.pet_id = ret.pet_id.toString();
    ret.created_date = ret.createdAt;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const Pet = mongoose.model("Pet", petSchema);
const PetAction = mongoose.model("PetAction", petActionSchema);

const DEFAULT_PET = {
  name: "Tama",
  color: "lavender",
  hunger: 80,
  happiness: 80,
  energy: 80,
  cleanliness: 80,
  health: 100,
  xp: 0,
  level: 1,
  is_sleeping: false,
};

async function getOrCreatePet() {
  let pet = await Pet.findOne().sort({ createdAt: -1 });
  if (!pet) {
    pet = await Pet.create(DEFAULT_PET);
  }
  return pet;
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/pet", async (_req, res) => {
  const pet = await getOrCreatePet();
  res.json(pet.toJSON());
});

app.patch("/api/pet/:id", async (req, res) => {
  const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!pet) {
    return res.status(404).send("Pet not found");
  }
  res.json(pet.toJSON());
});

app.get("/api/pet/:id/actions", async (req, res) => {
  const limit = Number(req.query.limit || 100);
  const query = { pet_id: req.params.id };

  if (req.query.type) {
    query.action_type = req.query.type;
  }

  const actions = await PetAction.find(query).sort({ createdAt: -1 }).limit(limit);
  res.json(actions.map((item) => item.toJSON()));
});

app.post("/api/pet/:id/actions", async (req, res) => {
  const pet = await Pet.findById(req.params.id);
  if (!pet) {
    return res.status(404).send("Pet not found");
  }

  const action = await PetAction.create({
    pet_id: req.params.id,
    action_type: req.body.action_type,
    description: req.body.description,
  });

  res.status(201).json(action.toJSON());
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: error.message || "Internal server error" });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Backend listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  });
