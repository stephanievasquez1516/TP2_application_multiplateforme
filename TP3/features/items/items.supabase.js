import { supabase } from '../../lib/supabase';
import { z } from 'zod';

// Schéma Zod pour un cours
const CoursSchema = z.object({
  id: z.number(),
  nom: z.string(),
  duree: z.string().nullable(),
  niveau: z.string().nullable(),
  horaire: z.string().nullable(),
  description: z.string().nullable(),
  instructeur: z.string().nullable(),
  created_at: z.string().optional(),
});

const CoursListSchema = z.array(CoursSchema);

// GET - Récupérer tous les cours
export const getAllCoursFromDB = async () => {
  console.log('Fetching cours from Supabase...');
  
  const { data, error } = await supabase
    .from('cours')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.error('Supabase error:', error);
    throw new Error('Erreur lors de la récupération des cours');
  }

  console.log('Raw data from Supabase:', data);

  // Validation Zod
  const result = CoursListSchema.safeParse(data);

  if (!result.success) {
    console.error('Zod validation failed:', result.error.format());
    throw new Error('Données invalides de la base de données');
  }

  console.log('Validation Zod réussie!', result.data.length, 'cours');
  return result.data;
};

// GET - Récupérer un cours par ID
export const getCoursByIdFromDB = async (id) => {
  console.log('Fetching cours ID:', id);

  const { data, error } = await supabase
    .from('cours')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Supabase error:', error);
    throw new Error('Cours non trouvé');
  }

  // Validation Zod
  const result = CoursSchema.safeParse(data);

  if (!result.success) {
    console.error('Zod validation failed:', result.error.format());
    throw new Error('Données invalides');
  }

  return result.data;
};

// POST - Créer un nouveau cours
export const createCours = async (cours) => {
  console.log('Creating cours:', cours);

  const { data, error } = await supabase
    .from('cours')
    .insert([cours])
    .select()
    .single();

  if (error) {
    console.error('Supabase error:', error);
    throw new Error('Erreur lors de la création du cours');
  }

  const result = CoursSchema.safeParse(data);

  if (!result.success) {
    console.error('Zod validation failed:', result.error.format());
    throw new Error('Données invalides');
  }

  console.log('Cours créé avec succès!');
  return result.data;
};

// PUT - Modifier un cours existant
export const updateCours = async (id, updates) => {
  console.log('Updating cours ID:', id, 'with:', updates);

  const { data, error } = await supabase
    .from('cours')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Supabase error:', error);
    throw new Error('Erreur lors de la modification du cours');
  }

  const result = CoursSchema.safeParse(data);

  if (!result.success) {
    console.error('Zod validation failed:', result.error.format());
    throw new Error('Données invalides');
  }

  console.log('Cours modifié avec succès!');
  return result.data;
};

// DELETE - Supprimer un cours
export const deleteCours = async (id) => {
  console.log('Deleting cours ID:', id);

  const { error } = await supabase
    .from('cours')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Supabase error:', error);
    throw new Error('Erreur lors de la suppression du cours');
  }

  console.log('Cours supprimé avec succès!');
  return true;
};