import { fetchCategoryData } from '@/lib/data';
import SidenavClient from './sidenav-client';

export default async function Sidenav() {

  const categories = await fetchCategoryData();
  
  return <SidenavClient categories={categories} />;
} 