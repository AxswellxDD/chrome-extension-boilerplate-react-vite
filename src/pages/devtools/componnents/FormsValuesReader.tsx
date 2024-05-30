import React, { useState, useEffect } from 'react';
import useCurrentUrl from './CurrentUrlComponnent';

type Post = {
  name: string | null;
  type: string;
  id: string | null;
  value: string;
};

const Demo: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const currentUrl = useCurrentUrl();

  const BASE_URL = currentUrl + '/Post';

  useEffect(() => {
    const fetchPosts = async () => {
      if (currentUrl) {
        const response = await fetch(`${BASE_URL}/posts`);
        const posts = (await response.json()) as Post[];
        setPosts(posts);
      }
    };

    fetchPosts();
  }, [currentUrl]);

  return (
    <div className='DemoContainer'>
      <h1>Fetching forms data from</h1>
      <p>{currentUrl}</p>

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.type} {post.name} {post.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Demo;