import { fetchCategoryList, fetchTagList } from '@/lib/data';
import SidenavClient from './sidenav-client';

export default async function Sidenav() {

  const categories = await fetchCategoryList();
  const tags = await fetchTagList();
  
  return <SidenavClient categories={categories} tags={tags} />;
} 