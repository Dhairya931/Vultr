import supabaseClient from "@/utils/supabase";

export async function getJobs(token, { location, company_id, searchQuery }) {
    const supabase = await supabaseClient(token);

    let query = supabase.from("jobs").select("*, company:companies(name), saved: saved_jobs(id)");

    if (location){
        query = query.eq("location", location);
    }

    if (company_id){
        query = query.eq("company_id", company_id);
    }

    if (searchQuery){
        query = query.ilike("title", `%${searchQuery}%`);
    }

    const { data, err } = await query;

    if(err){
        console.error("Error fetching Jobs: ", err);
        return null;
    }

    return data;
    
}

export async function saveJob(token, { alreadySaved }, saveData) {
    const supabase = await supabaseClient(token);

    if (alreadySaved) {
        const { data, error:deleteError } = await supabase
        .from("saved_jobs")
        .delete()
        .eq("job_id", saveData.job_id);

        if (deleteError) {
            console.error("Error Deleting Saved Job: ", deleteError);
            return null;
        }

        return data;
    } else{
        const { data, error: insertError } = await supabase
        .from("saved_jobs")
        .insert([saveData])
        .select()

        if(insertError){
            console.error("Error fetching Jobs: ", insertError);
            return null;
        }
    
        return data;
    }
}

export async function getSingleJob(token, {job_id}) {
    const supabase = await supabaseClient(token);

        const { data, error } = await supabase
        .from("jobs")
        .select("*, company:companies(name), applications: applications(*)")
        .eq("job_id",job_id)
        .single();

        if (error) {
            console.error("Error Fetching Job: ", error);
            return null;
        }
        return data;
}

export async function updateHiringStatus(token, {job_id}, isOpen) {
    const supabase = await supabaseClient(token);

        const { data, error } = await supabase
        .from("jobs")
        .update({isOpen})
        .eq("id",job_id)
        .select();

        if (error) {
            console.error("Error Updating Job: ", error);
            return null;
        }
        return data;
}

export async function addNewJob(token, __, jobData) {
    const supabase = await supabaseClient(token);

        const { data, error } = await supabase
        .from("jobs")
        .insert({jobData})
        .select();

        if (error || data.length === 0) {
            console.error("Error Creating Job: ", error);
            return null;
        }
        return data;

}