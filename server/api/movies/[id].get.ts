// fetch only one movie by pasing the id,
// could be used , to display a single movie info over a pop up or complete detail of a movie

import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const { id }= event.context.params; // could use query as well
    
    const supabase = await serverSupabaseClient(event);

    const { data: singleMovie, error } = await supabase.from('movies').select('*').eq('id', id).single();

    if(error){
        return {
            statusCode: 404,
            body: { error: 'Movie Not Found'},
        };
    }
    return {
        statusCode: 200,
        body: singleMovie
    };
});