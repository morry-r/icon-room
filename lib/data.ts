import postgres from 'postgres';
import { IconWithSvg,Category } from './types';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchIconData() {
    try {
      console.log(process.env.POSTGRES_URL);
      const data = await sql<IconWithSvg[]>`SELECT
        icons.id AS icon_id,
        icons.slug,
        icons.name,
        categories.name AS category_name,
        ARRAY_AGG(DISTINCT tags.name) AS tag_names,
        icon_variants.svg
      FROM
        icons
      JOIN
        icon_variants ON icons.id = icon_variants.icon_id
      LEFT JOIN
        categories ON icons.category_id = categories.id
      LEFT JOIN
        icon_tags ON icons.id = icon_tags.icon_id
      LEFT JOIN
        tags ON icon_tags.tag_id = tags.id
      WHERE
        icon_variants.weight = 'filled'
      GROUP BY
        icons.id,
        icons.name,
        categories.name,
        icon_variants.svg;`;

      return data;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch icon data.');
    }
}

export async function fetchCategoryData() {
  try {
    console.log(process.env.POSTGRES_URL);
    const data = await sql<Category[]>`SELECT
      id,
      name,
      slug,
      created_at,
      updated_at
    FROM
      categories
    ORDER BY
      name;
    `;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch icon data.');
  }
}
// export async function fetchInvoicesPages(query: string) {
//   try {
//     const data = await sql`SELECT COUNT(*)
//     FROM invoices
//     JOIN customers ON invoices.customer_id = customers.id
//     WHERE
//       customers.name ILIKE ${`%${query}%`} OR
//       customers.email ILIKE ${`%${query}%`} OR
//       invoices.amount::text ILIKE ${`%${query}%`} OR
//       invoices.date::text ILIKE ${`%${query}%`} OR
//       invoices.status ILIKE ${`%${query}%`}
//   `;

//     const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
//     return totalPages;
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch total number of invoices.');
//   }
// }