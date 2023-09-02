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

export async function deleteTrip(id) {
  const { error } = await supabase
    .from('travelAppTripData')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
}

export async function getTrips() {
  let { data, error } = await supabase.from('travelAppTripData').select('*');

  if (error) throw new Error(error.message);

  return data;
}

export async function addTripData(expData) {
  const { data, error } = await supabase
    .from('travelAppTripExpenses')
    .insert([expData])
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export async function deleteTripData(expId) {
  const { error } = await supabase
    .from('travelAppTripExpenses')
    .delete()
    .eq('expId', expId);

  if (error) throw new Error(error.message);
}

export async function getTripData(id) {
  let { data, error } = await supabase
    .from('travelAppTripExpenses')
    .select('*')
    .eq('id', id.queryKey.at(0));

  if (error) throw new Error(error.message);

  return data;
}

export async function getTripPin(id) {
  let { data, error } = await supabase
    .from('travelAppTripData')
    .select('pin')
    .eq('id', Number(id));

  if (error) throw new Error(error.message);

  return data.at(0).pin;
}
