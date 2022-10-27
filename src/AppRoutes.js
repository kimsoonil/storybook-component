import React from 'react';
import loadable from '@loadable/component';
import { Route, Navigate, Routes } from 'react-router-dom';
import 'assets/scss/reset.scss';

const MainDashboard = loadable(() => import('views/Main'));
const Home = loadable(() => import('views/Main/Home'));
const MyClub = loadable(() => import('views/Main/MyClub'));
const NewFeeds = loadable(() => import('views/Main/NewFeeds'));
const Activity = loadable(() => import('views/Main/Activity'));
const Search = loadable(() => import('views/Search'));
const SearchAll = loadable(() => import('views/Search/SearchAll'));
const SearchClub = loadable(() => import('views/Search/SearchClubs'));
const SearchPosts = loadable(() => import('views/Search/SearchPosts'));
const Club = loadable(() => import('views/Club'));
const ClubHome = loadable(() => import('views/Club/Home'));
const Board = loadable(() => import('views/Club/Board'));
const PostWriting = loadable(() => import('views/Club/PostWriting'));
const PostsId = loadable(() => import('views/Club/Post'));
const Member = loadable(() => import('views/Club/Member'));
const MemberProfile = loadable(() => import('views/Club/Member/MemberProfile'));
const Notfound = loadable(() => import('views/Error/Notfound'));

const Create = loadable(() => import('views/Admin/Create'));
const Admin = loadable(() => import('views/Admin'));
const Dashboard = loadable(() => import('views/Admin/Dashboard'));
const Statistics = loadable(() => import('views/Admin/Statistics'));
const Boards = loadable(() => import('views/Admin/Boards'));
const Reports = loadable(() => import('views/Admin/Reports'));
const ReportsSetting = loadable(() => import('views/Admin/ReportsSetting'));
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
        <Route path="myclubs" element={<MyClub />} />
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
        <Route path="writing" element={<PostWriting />} />
        <Route path="writing/:postId" element={<PostWriting />} />
        <Route path="post/:postId" element={<PostsId />} />
        <Route path="memberProfile/:memberId" element={<MemberProfile />} />
      </Route>

      <Route path="/manage" element={<Admin visibleMenu={true} />}>
        <Route path="" element={<Navigate replace to={'dashboard'} />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="statistics" element={<Statistics />} />
        <Route path="boards" element={<Boards />} />

        <Route path="reports">
          <Route path="" element={<Reports />} />
          <Route path="settings" element={<ReportsSetting />} />
        </Route>

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
