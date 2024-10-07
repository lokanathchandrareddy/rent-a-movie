// fetch only one movie by pasing the id, - A little differnt than the movie, as this contains Rented information as well
// another use case could be - admin user to find out who all a particular movie is rented to
// could be used , to display a single movie info over a pop up or complete detail of a movie

import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const user = await serverSupabaseUser(event);
    if (!user) {
        return {
          statusCode: 401,
          body: { error: 'Unauthorized' },
        };
    }

    const { id } = event.context.params;  // Get the return record ID from the URL params
  
    const supabase = await serverSupabaseClient(event);  // Get Supabase client
  
    // Fetch the return record by ID
    const { data: returnRecord, error } = await supabase.from('rented_movies_flat').select('*').eq('id', id).eq('user_id', user.id).single();
       // may need to use the Flattend view rented_movies_flat instead of rented_movies table
  
    if (error) {
      return {
        statusCode: 404,
        body: { error: 'Return record not found' },
      };
    }
  
    return {
      statusCode: 200,
      body: returnRecord,
    };
  });
  