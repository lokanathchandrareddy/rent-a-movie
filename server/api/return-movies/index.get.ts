import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
      // Get the authenticated user
  const user = await serverSupabaseUser(event);
  
  // If there's no authenticated user, return an error
  if (!user) {
    return {
      statusCode: 401,
      body: { error: 'Unauthorized' },
    };
  }
    const supabase = await serverSupabaseClient(event);
    // Fetch all return records
    const { data: returnMoviesData, error } = await supabase.from('rented_movies_flat').select('*').eq('user_id', user.id);
    // may need to use the Flattend view rented_movies_flat
  
    if (error) {
      return {
        statusCode: 500,
        body: { error: 'Failed to fetch return records' },
      };
    }
  
    return {
      statusCode: 200,
      body: returnMoviesData,
    };
  });
  