// features/items/items.logic.js
import { COURS } from './items.data';
console.log("COURS =", COURS);
export function getAllCours() {
  return COURS;
}

export function getCoursById(id) {
  return COURS.find(cours => cours.id === Number(id));
}


export function validateForm(nom, email) {
  if (!nom || !email) {
    return { isValid: false, message: "Tous les champs sont obligatoires" };
  }

  if (!email.includes("@")) {
    return { isValid: false, message: "Email invalide" };
  }

  return { isValid: true };
}
