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
    throw new Error('Error fetching company');
  }

  return company;
}
