'use server';

import { db } from '@/lib/kysely';
import { Company } from '@/schema/company';

export async function getCompanies() {
  let companies: Company[] = [];

  try {
    companies = (await db
      .selectFrom('companies')
      .selectAll()
      .where('deleted_at', 'is', null)
      .execute()) as Company[];
  } catch (error) {
    console.error('Error fetching companies', error);
    throw new Error('Error fetching companies');
  }

  return companies;
}

export async function getCompany(id: string) {
  let company: Company | null = null;

  try {
    company = (await db
      .selectFrom('companies')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst()) as unknown as Company;
  } catch (error) {
    console.error('Error fetching company', error);
    return null;
  }

  return company;
}

export async function updateCompany(id: string, data: Partial<Company>) {
  try {
    await db.updateTable('companies').set(data).where('id', '=', id).executeTakeFirst();
  } catch (error) {
    console.error('Error updating company', error);
    throw new Error('Error updating company');
  }
}
