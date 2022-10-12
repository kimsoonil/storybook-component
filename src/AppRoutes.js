import React from 'react';
import loadable from '@loadable/component';
import { Route, Navigate, Routes } from 'react-router-dom';
import 'assets/scss/reset.scss';

const MainDashboard = loadable(() => import('views/Main'));
const Home = loadable(() => import('views/Main/Home'));
const NewFeeds = loadable(() => import('views/Main/NewFeeds'));
const Activity = loadable(() => import('views/Main/Activity'));
const Search = loadable(() => import('views/Search'));
const SearchAll = loadable(() => import('views/Search/SearchAll'));
const SearchClub = loadable(() => import('views/Search/SearchClubs'));
const SearchPosts = loadable(() => import('views/Search/SearchPosts'));
const Club = loadable(() => import('views/Club'));
const ClubHome = loadable(() => import('views/Club/Home'));
const Board = loadable(() => import('views/Club/Board'));
const Writing = loadable(() => import('views/Club/Writing'));
const PostsId = loadable(() => import('views/Club/Posts'));
const Member = loadable(() => import('views/Club/Member'));
const MemberProfile = loadable(() => import('views/Club/MemberProfile'));
const Notfound = loadable(() => import('views/Error/Notfound'));

const Create = loadable(() => import('views/Admin/Create'));
const Admin = loadable(() => import('views/Admin'));
const Dashboard = loadable(() => import('views/Admin/Dashboard'));
const Statistics = loadable(() => import('views/Admin/Statistics'));
const Boards = loadable(() => import('views/Admin/Boards'));
const Posts = loadable(() => import('views/Admin/Posts'));
const Members = loadable(() => import('views/Admin/Members'));
const Permissions = loadable(() => import('views/Admin/Permissions'));
const Information = loadable(() => import('views/Admin/Information'));
const Design = loadable(() => import('views/Admin/Design'));
const Operation = loadable(() => import('views/Admin/Operation'));

function AppRoutes() {
  return (
    <Routes>
      <Route path="/clubs" element={<MainDashboard />}>
        <Route path="" element={<Home />} />
        <Route path="myclubs" element={<Home />} />
        <Route path="newfeeds" element={<NewFeeds />} />
        <Route path="activity" element={<Activity />} />
        <Route path="chat" element={<Home />} />
      </Route>
      <Route path="/create" element={<Create />} />
      <Route path="/clubs/search" element={<Search />}>
        <Route path="all" element={<SearchAll />} />
        <Route path="clubs" element={<SearchClub />} />
        <Route path="posts" element={<SearchPosts />} />
      </Route>
      <Route path="/club/:id" element={<Club />}>
        <Route path="home" element={<ClubHome />} />
        <Route path="member" element={<Member />} />
        <Route path="board/:boardId" element={<Board />} />
        <Route path="writing" element={<Writing />} />
        <Route path="writing/:postId" element={<Writing />} />
        <Route path="post/:postId" element={<PostsId />} />
        <Route path="memberProfile/:memberId" element={<MemberProfile />} />
      </Route>

      <Route path="/manage" element={<Admin visibleMenu={true} />}>
        <Route path="" element={<Navigate replace to={'dashboard'} />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="statistics" element={<Statistics />} />
        <Route path="boards" element={<Boards />} />
        <Route path="posts" element={<Posts />} />
        <Route path="members" element={<Members />} />
        <Route path="permissions" element={<Permissions />} />
        <Route path="information" element={<Information />} />
        <Route path="design" element={<Design />} />
        <Route path="operation" element={<Operation />} />
      </Route>
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}

export default AppRoutes;
