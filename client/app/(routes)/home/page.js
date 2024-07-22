'use client'
import React, { useEffect } from 'react'
import Banner from './_components/Banner'
import { useUser } from '@clerk/nextjs'
import WritePost from './_components/WritePost'
import PostList from './_components/PostList'
import { useState } from 'react'
import GlobalApi from '@/app/_utils/GlobalApi'



function Home() {
  const {user} = useUser()
  const [postList, setPostList] = useState([]);

  useEffect(() => {
      getAllPost();
  }, []);

  const getAllPost = () => {
      GlobalApi.getAllPost().then((res) => {
          console.log(res.data);
          setPostList(res.data);
      }).catch((err) => {
          console.error("Error fetching posts:", err);
      });
  };
  return (
    <div className='p-5 px-10'>

      {
      !user ?
       <Banner/>:

       <WritePost   getAllPost={()=>getAllPost()}/>
       }


       <PostList postList={postList} 
       updatePostList = {()=>getAllPost()}
       />
       
    </div>
  )
}

export default Home;