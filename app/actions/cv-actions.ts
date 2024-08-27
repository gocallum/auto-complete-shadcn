// /app/actions/cv-actions.ts

import { revalidatePath } from 'next/cache';

export async function searchRoles(query: string): Promise<string[]> {
  const roles = [
    'Full Stack Developer',
    'AWS Cloud Engineer',
    'Business Analyst',
    'DevOps Engineer',
    'Data Scientist',
    // Add more common IT roles here...
  ];

  const filteredRoles = roles
    .filter((role) =>
      role.toLowerCase().startsWith(query.toLowerCase())
    )
    .slice(0, 5);

  return filteredRoles;
}

export async function searchCompanies(query: string): Promise<{ id: string; name: string }[]> {
  const companies = [
    { id: '1', name: 'Google' },
    { id: '2', name: 'Amazon' },
    { id: '3', name: 'Microsoft' },
    { id: '4', name: 'Facebook' },
    { id: '5', name: 'Apple' },
    // Add more companies here...
  ];

  const filteredCompanies = companies
    .filter((company) =>
      company.name.toLowerCase().startsWith(query.toLowerCase())
    )
    .slice(0, 5);

  return filteredCompanies;
}
