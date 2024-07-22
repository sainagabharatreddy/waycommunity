import React, { useContext, useState, useRef } from 'react';
import NextImage from 'next/image';
import moment from 'moment';
import { UserDetailContext } from '@/app/_context/userDetailContext';
import GlobalApi from '@/app/_utils/GlobalApi';
import { useUser } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import CommentList from './CommentList';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogDescription
} from "@/components/ui/alert-dialog"; // Import AlertDialog components

function PostItem({ post, updatePostList }) {
  const { userDetail } = useContext(UserDetailContext);
  const [userInputComment, setUserInputComment] = useState('');
  const { toast } = useToast();
  const { user } = useUser();
  const commentListRef = useRef(null);

  const checkIsUserLike = (postLikes) => {
    return postLikes?.some(item => item?._id === userDetail?._id);
  };

  const onLikeClick = (isLike, postId) => {
    if (!userDetail || !userDetail._id) {
      console.error('User detail is not available');
      return;
    }

    const data = {
      userId: userDetail._id,
      isLike: isLike
    };

    GlobalApi.onPostLike(postId, data)
      .then(res => {
        console.log(res);
        updatePostList();
      })
      .catch(err => {
        console.error('Error liking post:', err);
      });
  };

  const addComment = (postId) => {
    const data = {
      commentText: userInputComment,
      createdBy: userDetail._id,
      post: postId,
      createdAt: Date.now().toString()
    };
    GlobalApi.addComment(data)
      .then(resp => {
        if (resp) {
          toast({
            title: "Awesome!",
            description: "Your Comment added successfully",
            variant: "success"
          });
          updatePostList();
        }
      })
      .catch(error => {
        console.error('Error adding comment:', error);
      });
    setUserInputComment('');
  };

  const handleScroll = () => {
    if (commentListRef.current) {
      const { scrollTop, clientHeight, scrollHeight } = commentListRef.current;
      if (scrollTop + clientHeight >= scrollHeight) {
        // At the bottom of the scroll container
        commentListRef.current.classList.remove('scrolling');
      } else {
        // Scrolling up or in the middle
        commentListRef.current.classList.add('scrolling');
      }
    }
  };

  return (
    <div className='p-5 border rounded-lg my-5'>
      <div className='flex gap-2 items-center'>
        <NextImage
          src={post?.createdBy?.image}
          alt="user-image"
          width={35}
          height={35}
          className='rounded-full'
        />
        <div>
          <h2 className='font-bold'>{post?.createdBy?.name}</h2>
          <h2 className='text-[12px] text-gray-500'>{moment(Number(post?.createdAt)).format('DD MMM | hh:mm A')}</h2>
        </div>
      </div>
      <div className='bg-slate-100 p-3 mt-4 rounded-lg'>
        <h2 className=''>{post.postText}</h2>
      </div>
      <div className='flex gap-8 mt-4'>
        <div className='flex gap-1 items-center text-gray-500'>
          {!checkIsUserLike(post?.likes) ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => onLikeClick(true, post._id)}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              onClick={() => onLikeClick(false, post._id)}
              className="w-6 h-6 text-red-500 cursor-pointer"
            >
              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>
          )}
          <h2>{post?.likes?.length} Likes</h2>
        </div>
        <AlertDialog>
          <AlertDialogTrigger> 
            <div className='flex gap-1 items-center text-gray-500'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z" clipRule="evenodd" />
              </svg>
              <h2>{post.comments?.length} Messages</h2>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex justify-between items-center">
                Comments
                <AlertDialogCancel>X</AlertDialogCancel>
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription>
              <div
                ref={commentListRef}
                className="fixed-height-container overflow-y-auto"
                onScroll={handleScroll}
              >
                <CommentList
                  commentList={post?.comments}
                  userDetail={userDetail}
                  updatePostList={() => updatePostList()}
                />
              </div>
            </AlertDialogDescription>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {user && (
        <div className='mt-5'>
          <hr className='mb-5' />
          <div className='flex gap-4 items-center'>
            <NextImage
              src={user?.imageUrl}
              width={30}
              height={30}
              alt='user-image'
              className='rounded-full'
            />
            <input
              type='text'
              value={userInputComment}
              onChange={(e) => setUserInputComment(e.target.value)}
              placeholder='Write a comment'
              className='w-full bg-slate-100 p-2 rounded-full px-5 outline-blue-300'
            />
            <Button
              disabled={!userInputComment}
              onClick={() => addComment(post._id)}
              className="bg-blue-400 text-white p-2 h-8 w-8 rounded-xl hover:bg-blue-600"
            >
              <Send />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostItem;
