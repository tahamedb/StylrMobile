// userService.ts
import { apiClientWrapper } from "../api/client"; 

export interface User {
  id: string;
  name: string;
}

// Service pour récupérer les utilisateurs
export async function fetchUsers(): Promise<User[]> {
  return apiClientWrapper.get<User[]>('/users'); // il faut un controller qui recherche les utilisateurs selon la recherche 
}
