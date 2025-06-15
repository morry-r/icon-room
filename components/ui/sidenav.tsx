import { fetchCategoryList } from '@/lib/data';
import SidenavClient from './sidenav-client';

export default async function Sidenav() {

  const categories = await fetchCategoryList();
  
  return <SidenavClient categories={categories} />;
} 