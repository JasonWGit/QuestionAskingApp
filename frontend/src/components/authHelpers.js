import { supabase } from '../supabase.js';

// returns object { data, error, loggedIn }
export const userLoggedInCheck = async () => {

    const { data , error } = await supabase.auth.getSession();
    if (error) {
      return { error: 'Error fetching user session', loggedIn: false }; 
    } 

    if (!data.session) {
      return { error: 'You must be logged in to perform that action', loggedIn: false };
    }

    return { data: data, loggedIn: true };
}

export const getUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (!data) {
    return null;
  } else {
    return data;
  }
}

// returns object { role, error }
export const getUserRole = async () => {
  const userData = await getUser();
  if (userData == null) {
    return;
  }

  const { data, error } = await supabase.from('profiles').select('role').eq('id', userData?.user?.id);


  if (!data) {
    return null;
  } else {
    return data[0].role;
  }
}

export const canDeleteComment = async () => {

}