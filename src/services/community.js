import { supabase } from './supabase';

// Posts
export const createPost = async (postData) => {
  const { data, error } = await supabase
    .from('community_posts')
    .insert(postData)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const getPosts = async (filters = {}) => {
  let query = supabase
    .from('community_posts')
    .select('*');

  // Apply filters
  if (filters.category && filters.category !== 'all') {
    query = query.eq('category', filters.category);
  }
  if (filters.subject && filters.subject !== 'all') {
    query = query.eq('subject', filters.subject);
  }
  if (filters.search) {
    query = query.or(`title.ilike.%${filters.search}%,content.ilike.%${filters.search}%`);
  }

  // Apply sorting
  if (filters.sortBy === 'popular') {
    query = query.order('upvotes', { ascending: false });
  } else {
    query = query.order('created_at', { ascending: false });
  }

  const { data, error } = await query.limit(filters.limit || 20);
  if (error) throw error;
  return data;
};

export const votePost = async (userId, postId, voteType) => {
  // Check existing vote
  const { data: existingVote } = await supabase
    .from('community_votes')
    .select('*')
    .eq('user_id', userId)
    .eq('post_id', postId)
    .maybeSingle();

  if (existingVote) {
    if (existingVote.vote_type === voteType) {
      // Remove vote if same type
      const { error } = await supabase
        .from('community_votes')
        .delete()
        .eq('id', existingVote.id);
      if (error) throw error;
      return { action: 'removed' };
    } else {
      // Update vote type
      const { error } = await supabase
        .from('community_votes')
        .update({ vote_type: voteType })
        .eq('id', existingVote.id);
      if (error) throw error;
      return { action: 'updated' };
    }
  } else {
    // Create new vote
    const { error } = await supabase
      .from('community_votes')
      .insert({
        user_id: userId,
        post_id: postId,
        vote_type: voteType
      });
    if (error) throw error;
    return { action: 'created' };
  }
};
