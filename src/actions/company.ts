import { db } from '@/db';
import { companyTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function getCompanies() {
  try {
    return await db.select().from(companyTable);
  } catch (error) {
    console.error('Failed to get companies from database');
    throw error;
  }
}

export async function getCompany(id: string) {
  try {
    const [company] = await db.select().from(companyTable).where(eq(companyTable.id, id));
    return company;
  } catch (error) {
    console.error('Failed to get company from database');
    throw error;
  }
}
