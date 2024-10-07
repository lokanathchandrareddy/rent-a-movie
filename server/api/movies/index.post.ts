// we may not use this as Movie data is directly pushed to the Database
// lets say we have a admin user, then we can use this to add more movies

import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    
    const supabase = await serverSupabaseClient(event);

    // Need the data fro m the Body
    const body = await readBody(event); 
    // console.log('Parsed Body', body);

    const { data: newMovie, error } = await supabase.from('movies').insert([body])

    if (error) {
        return {
          statusCode: 500,
          body: { error: 'Failed to add movie' },
        };
      }
    
      // Return the new movie
      return {
        statusCode: 201, // created
        body: newMovie,
      };

})