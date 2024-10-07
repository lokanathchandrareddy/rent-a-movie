// This may not be needed as we may need to store it as a history, when it was rented and when it was returned
import {serverSupabaseClient} from '#supabase/server';

export default defineEventHandler(async (event) => {
    const { id } = event.context.params;
  
    const supabase = await serverSupabaseClient(event); 
  
    // Delete the return record by ID
    const { data: deletedReturn, error } = await supabase.from('return_movies').delete().eq('id', id);
  
    if (error) {
      return {
        statusCode: 500,
        body: { error: 'Failed to delete the return record' },
      };
    }
  
    return {
      statusCode: 200,
      body: deletedReturn,
    };
  });
  