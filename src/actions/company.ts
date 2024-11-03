import { db } from '@/lib/kysely';
import { Company } from '@/schema';

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
