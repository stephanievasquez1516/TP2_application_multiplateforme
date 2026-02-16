import { z } from "zod";

const API_KEY = 'WQdi1KCst2dXSxNeHYWTKSMlDjOIDvdtmqAu85Bs'; 

// Schéma avec champs optionnels
const ExerciseSchema = z.object({
  name: z.string(),
  type: z.string().optional(),
  muscle: z.string().optional(),
  equipment: z.string().optional(), 
  difficulty: z.string().optional(),
  instructions: z.string().optional(),
});

const ExercisesResponseSchema = z.array(ExerciseSchema);

export const fetchExercises = async (muscle = 'biceps') => {
  console.log("Fetching:", muscle);
  
  const response = await fetch(
    `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`,
    {
      headers: {
        'X-Api-Key': API_KEY,
      },
    }
  );
  
  console.log("Status:", response.status);
  
  if (!response.ok) {
    throw new Error('Erreur API');
  }
  
  const data = await response.json();
  console.log("Data:", data.length, "exercices");
  
  const result = ExercisesResponseSchema.safeParse(data);
  
  if (!result.success) {
    console.error("ZOD ERROR:", result.error.issues);
    throw new Error('Validation échouée');
  }
  
  console.log("Validation réussie!", result.data.length, "exercices");
  return result.data;
};

export const MUSCLES = [
  'biceps',
  'triceps', 
  'chest',
  'abdominals',
  'quadriceps',
  'hamstrings',
  'calves',
  'glutes',
];