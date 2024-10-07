
import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);

  if (!user) {
    return { statusCode: 401, body: { error: "Unauthorized" } };
  }
  const body = await readBody(event); // Parse the request body
  const { movies } = body; 

  console.log('Movies passed', movies);

  const supabase = await serverSupabaseClient(event);

  
  for (const movie of movies) {
    // Increase stock by 1 for each returned movie
    const { error: stockError } = await supabase
      .from("movies")
      .update({ stock: movie.stock + 1 })
      .eq("id", movie.id);

    if (stockError) {
      return {
        statusCode: 500,
        body: { error: `Failed to update stock for movie ${movie.title}` },
      };
    }

    // Remove the movie from the rented_movies table (delete the rental)
    const { error: returnError } = await supabase
      .from("rented_movies")
      .delete() // may be remove the delete to store it as a history.
      .eq("movie_id", movie.id)
      .eq("user_id", user.id); // Make sure to delete only for the logged-in user

    if (returnError) {
      return {
        statusCode: 500,
        body: { error: `Failed to return movie ${movie.title}` },
      };
    }
  }

  return {
    statusCode: 200,
    body: { message: "Movies returned successfully" },
  };
});
