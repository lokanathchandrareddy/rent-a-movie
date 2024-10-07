// Used to push all the checkedout Movies/ rented movies
// need to add types

import {serverSupabaseClient, serverSupabaseUser} from '#supabase/server';

export default defineEventHandler(async(event)=> {
    const user = await serverSupabaseUser(event);

    if (!user) {
      return {
        statusCode: 401,
        body: { error: 'Unauthorized' },
      };
    }

    const supabase = await serverSupabaseClient(event);

    const body = await readBody(event);
    const { movies } = body;  

    for (const movie of movies) {
        // Reduce stock for the movie
        const { error: stockError } = await supabase
          .from('movies')
          .update({ stock: movie.stock - 1 }) // Reduce stock by 1
          .eq('id', movie.id);
    
        if (stockError) {
          return {
            statusCode: 500,
            body: { error: `Failed to update stock for movie ${movie.title}` },
          };
        }
    
        // Add the movie to the rented_movies table
        const { error: rentalError } = await supabase
          .from('rented_movies')
          .insert({
            movie_id: movie.id,
            user_id: user.id, // Associate the rental with the authenticated user
            rented_on: new Date(), // Set the rented date to current date
          });
    
        if (rentalError) {
          return {
            statusCode: 500,
            body: { error: `Failed to create rental for movie ${movie.title}` },
          };
        }
      }
    
      return {
        statusCode: 200,
        body: { message: 'Checkout successful for all movies' },
      };
})