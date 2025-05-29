export const calculateAge = (birthDate) => {
  if (!birthDate) return 'Не указано';
  return new Date().getFullYear() - new Date(birthDate).getFullYear();
};