import postgres from 'postgres';
import { IconList, Category, CategoryName, Tag, TagName, IconDetail, AdminIconList, AdminIconEdit } from './types';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchIconListData(weight: string) {
  try {
    const data = await sql<IconList[]>`SELECT
      icons.id AS icon_id,
      icons.slug,
      icons.name,
      icon_variants.svg
    FROM
      icons
    JOIN
      icon_variants ON icons.id = icon_variants.icon_id
    WHERE
      icon_variants.weight = ${weight};`;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch icon data.');
  }
}

export async function fetchCategoryList() {
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
export async function fetchIconsByCategory(slug: string, weight: string) {
  try {
    const data = await sql<IconList[]>`SELECT
      icons.id AS icon_id,
      icons.slug,
      icons.name,
      icon_variants.svg
    FROM
      icons
    JOIN
      icon_variants ON icons.id = icon_variants.icon_id
    JOIN
      categories ON icons.category_id = categories.id
    WHERE
      icon_variants.weight = ${weight}
      AND categories.slug = ${slug};`;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch icon data.');
  }
}

export async function fetchCategoryNameBySlug(slug: string) {
  try {
    const data = await sql<CategoryName[]>`SELECT
      name
    FROM
      categories
    WHERE
      slug = ${slug};`;

    const categoryName = data[0]?.name || slug;

    return categoryName;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch icon data.');
  }
}

export async function fetchTagList() {
  try {
    console.log(process.env.POSTGRES_URL);
    const data = await sql<Tag[]>`SELECT
      id,
      name,
      slug,
      created_at,
      updated_at
    FROM
      tags
    ORDER BY
      name;`;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch icon data.');
  }
}
export async function fetchIconsByTag(slug: string, weight: string) {
  try {
    const data = await sql<IconList[]>`SELECT
      icons.id AS icon_id,
      icons.slug,
      icons.name,
      icon_variants.svg
    FROM
      icons
    JOIN
      icon_variants ON icons.id = icon_variants.icon_id
    JOIN
      icon_tags ON icons.id = icon_tags.icon_id
    JOIN
      tags ON icon_tags.tag_id = tags.id
    WHERE
      icon_variants.weight =  ${weight}
      AND tags.slug = ${slug};`;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch icon data.');
  }
}

export async function fetchTagNameBySlug(slug: string) {
  try {
    const data = await sql<TagName[]>`SELECT
      name
    FROM
      tags
    WHERE
      slug = ${slug};`;

    const tagName = data[0]?.name || slug;

    return tagName;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch icon data.');
  }
}
export async function fetchIconDetailData(id: string, weight: string) {
  try {
    const data = await sql<IconDetail[]>`SELECT
      icons.id AS icon_id,
      icons.slug,
      icons.name,
      categories.name AS category_name,
      ARRAY_AGG(DISTINCT tags.name) AS tag_names,
      icon_variants.svg
    FROM
      icons
    JOIN
      categories ON icons.category_id = categories.id
    JOIN
      icon_variants ON icons.id = icon_variants.icon_id
    JOIN
      icon_tags ON icons.id = icon_tags.icon_id
    JOIN
      tags ON icon_tags.tag_id = tags.id
    WHERE
      icons.id = ${id}
      AND icon_variants.weight = ${weight}
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

export async function fetchAdminIconList() {
  try {
    const data = await sql<AdminIconList[]>`SELECT
      icons.id AS icon_id,
      icons.slug,
      icons.name,
      icons.created_at,
      categories.name AS category_name,
      ARRAY_AGG(DISTINCT tags.name) AS tag_names,
      icon_variants.svg
    FROM
      icons
    LEFT JOIN
      categories ON icons.category_id = categories.id
    LEFT JOIN
      icon_variants ON icons.id = icon_variants.icon_id 
      AND icon_variants.weight = 'filled'
    LEFT JOIN
      icon_tags ON icons.id = icon_tags.icon_id
    LEFT JOIN
      tags ON icon_tags.tag_id = tags.id
    GROUP BY
      icons.id,
      icons.name,
      icons.created_at,
      categories.name,
      icon_variants.svg
    ORDER BY
      icons.created_at DESC;`;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch admin icon data.');
  }
}

export async function fetchAdminIconEditData(id: string) {
  try {
    const data = await sql<AdminIconEdit[]>`SELECT
      icons.id AS icon_id,
      icons.slug,
      icons.name,
      categories.name AS category_name,
      ARRAY_AGG(DISTINCT tags.name) AS tag_names,
      icon_variants.weight,
      icon_variants.svg
    FROM
      icons
    JOIN
      categories ON icons.category_id = categories.id
    JOIN
      icon_variants ON icons.id = icon_variants.icon_id
    JOIN
      icon_tags ON icons.id = icon_tags.icon_id
    JOIN
      tags ON icon_tags.tag_id = tags.id
    WHERE
      icons.id = ${id}
    GROUP BY
      icons.id,
      icons.name,
      categories.name,
      icon_variants.weight,
      icon_variants.svg;`;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch admin icon data.');
  }
}