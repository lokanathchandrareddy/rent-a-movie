// Fetch all the movies from the Database
import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async(event)=> {

    const supabase = await serverSupabaseClient(event);

    const { data: movies, error } = await supabase.from('movies').select('*'); // select all the movies in the database 
    // may need to add condition for fetch stock > 0

    if(error){
        return {
            statusCode: 500,
            body: { error: 'Failed to Fetch Movies'},
        };
    }
    return {
        statusCode: 200,
        body: movies
    };
});