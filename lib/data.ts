import postgres from 'postgres';
import { Icon, IconVariant } from './types';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchIconData() {
    try {
  
      const data = await sql<Icon[]>`SELECT * FROM icons`;
  
      return data;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch icon data.');
    }
}