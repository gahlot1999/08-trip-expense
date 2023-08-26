import { supabase } from './supabase';

export async function createTrip(obj) {
  const { data, error } = await supabase
    .from('travelAppTripData')
    .insert([obj])
    .select();

  if (error) throw new Error(error.message);

  console.log(data);
  return data;
}

export async function getTrips() {
  let { data, error } = await supabase.from('travelAppTripData').select('*');

  if (error) throw new Error(error.message);

  return data;
}
