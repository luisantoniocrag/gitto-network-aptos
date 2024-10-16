module actions_addr::identity {

    use std::string::{Self, String};
    use std::vector::{Self};
    use std::signer;
    use std::timestamp;
    
    struct Profile has key {
        username: String,
        posts: vector<Post>,
        likes: vector<Like>,
        shares: vector<SharedPost>
    }


    struct Post has key, store {
        id: u64,
        content: String,
        author: address,
        timestamp: u64,
        likes: u64,
        comments: vector<Comment>
    }

    struct Comment has store {
        commenter: address,
        content: String,
        timestamp: u64
    }

    struct Like has store {
        post_id: u64,
        author: address,
        timestamp: u64
    }

    struct SharedPost has store {
        original_author: address,
        post_id: u64,
        shared_by: address,
        timestamp: u64
    }

    struct PostCounter has key {
        count: u64
    }
    
    /// Create a new Identity profile with a given username
    public entry fun create_profile(account: &signer, username: String) {
        let addr = signer::address_of(account);
        assert!(!exists<Profile>(addr), 1);
        let profile = Profile {
            username,
            posts: vector::empty<Post>(),
            likes: vector::empty<Like>(),
            shares: vector::empty<SharedPost>()
        };
        move_to(account, profile);
        initialize_counter(account);
    }

    /// Create a new post with a given content URL to IPFS
    public entry fun create_post(account: &signer, content: String)  acquires Profile, PostCounter {
        let addr = signer::address_of(account);
        let profile = borrow_global_mut<Profile>(addr);
        let counter = borrow_global_mut<PostCounter>(addr);

        let next_post_id = counter.count + 1;

        let post = Post {
            id: next_post_id,
            content,
            author: addr,
            timestamp: timestamp::now_seconds(),
            likes: 0,
            comments: vector::empty<Comment>()
        };
        
        vector::push_back(&mut profile.posts, post);
    }

    public entry fun like_post(account: &signer, author: address, post_id: u64,) acquires Profile {        
        let liker_addr = signer::address_of(account);

        let author_profile = borrow_global_mut<Profile>(author);
        let post_index = find_post_index(&author_profile.posts, post_id); 
        let post_ref = vector::borrow_mut(&mut author_profile.posts, post_index);

        post_ref.likes = post_ref.likes + 1;

        let like = Like {
            post_id,
            author,
            timestamp: timestamp::now_seconds()
        };

        let liker_profile = borrow_global_mut<Profile>(liker_addr);
        vector::push_back(&mut liker_profile.likes, like);
    }

    public entry fun comment_on_post(account: &signer, author: address, post_id: u64, content: String) acquires Profile {
        let commenter_address = signer::address_of(account);

        let author_profile = borrow_global_mut<Profile>(author);
        let post_index = find_post_index(&author_profile.posts, post_id);
        let post_ref = vector::borrow_mut(&mut author_profile.posts, post_index);

        let comment = Comment {
            commenter: commenter_address,
            content,
            timestamp: timestamp::now_microseconds(),
        };


        vector::push_back(&mut post_ref.comments, comment);
    }

    public entry fun share_post(account: &signer, original_author: address, post_id: u64) acquires Profile {
        let sharer_address = signer::address_of(account);
        let sharer_profile = borrow_global_mut<Profile>(sharer_address);

        let shared_post = SharedPost {
            original_author,
            post_id,
            shared_by: sharer_address,
            timestamp: timestamp::now_microseconds(),
        };

        vector::push_back(&mut sharer_profile.shares, shared_post);
    }

    
    fun initialize_counter(account: &signer) {
        assert!(signer::address_of(account) == @gitto_addr, 0);
        move_to(account, PostCounter{ count: 0 });
    }


    fun find_post_index(posts: &vector<Post>, post_id: u64): u64 {
        let len = vector::length(posts);
        let i = 0;
        while (i < len) {
            let post = vector::borrow(posts, i);
            if (post.id == post_id)  {
                return i;
            };
            i = i + 1;
        };
        abort 0
    }

    /// Unit Tests
    #[test(account = @0x1)]
    public entry fun create_profile_test(account: signer) {
        let username = string::utf8(b"tony");
        create_profile(&account, username);

        // check if profile exists and post counter is initialized in cero
        assert!(exists<Profile>(@0x1), 0);
        assert!(exists<PostCounter>(@0x1), 1);
    }

    #[test(account = @0x1)]
    public entry fun create_post_test(account: signer) acquires Profile, PostCounter {
        timestamp::set_time_has_started_for_testing(&account);   

        let username = string::utf8(b"tony");
        create_profile(&account, username);
        let content = string::utf8(b"hello world");
        create_post(&account, content);

        // check if post is added to profile
        assert!(exists<Profile>(@0x1), 0);
        let profile = borrow_global<Profile>(@0x1);
        assert!(vector::length(&profile.posts) == 1, 1);
    }
    

    #[test(account = @0x1)]
    public entry fun like_post_test(account: signer) acquires Profile, PostCounter {
        timestamp::set_time_has_started_for_testing(&account);   

        let username = string::utf8(b"tony");
        create_profile(&account, username);
        let content = string::utf8(b"hello world");
        create_post(&account, content);

        let post_id = 1;
        like_post(&account, @0x1, post_id);

        // check if like is added to profile
        assert!(exists<Profile>(@0x1), 0);
        let profile = borrow_global<Profile>(@0x1);
        assert!(vector::length(&profile.likes) == 1, 1);
    }

    #[test(account = @0x1)]
    public entry fun comment_on_post_test(account: signer) acquires Profile, PostCounter {
        timestamp::set_time_has_started_for_testing(&account);

        let username = string::utf8(b"tony");
        create_profile(&account, username);
        let content = string::utf8(b"hello world");
        create_post(&account, content);

        let post_id = 1;
        comment_on_post(&account, @0x1, post_id, string::utf8(b"comment"));

        // check if comment is added to post
        assert!(exists<Profile>(@0x1), 0);
        let profile = borrow_global<Profile>(@0x1);
        assert!(vector::length(&profile.posts) == 1, 1);

        let post = vector::borrow(&profile.posts, 0);
        assert!(vector::length(&post.comments) == 1, 1);
        let comment = vector::borrow(&post.comments, 0);
        assert!(comment.content == string::utf8(b"comment"), 1);
    }

    #[test(account = @0x1)]
    public entry fun share_post_test(account: signer) acquires Profile, PostCounter {
        timestamp::set_time_has_started_for_testing(&account);

        let username = string::utf8(b"tony");
        create_profile(&account, username);
        let content = string::utf8(b"hello world");
        create_post(&account, content);

        let post_id = 1;
        share_post(&account, @0x1, post_id);

        // check if share is added to profile
        assert!(exists<Profile>(@0x1), 0);
        let profile = borrow_global<Profile>(@0x1);
        assert!(vector::length(&profile.shares) == 1, 1);
        let share = vector::borrow(&profile.shares, 0);
        assert!(share.post_id == post_id, 1);
        assert!(share.original_author == @0x1, 1);
        assert!(share.shared_by == @0x1, 1);
    }
    
}
