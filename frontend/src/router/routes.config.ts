import React from 'react';
import * as Lazy from './LazyComponents';
import { ROUTES } from '../constants/routes';

export interface RouteConfig {
  path: string;
  component: React.ComponentType;
  isPublic: boolean;
  requiredRole?: 'citizen' | 'official';
  title: string;
}

export const ROUTE_CONFIGS: RouteConfig[] = [
  {
    path: ROUTES.HOME,
    component: Lazy.LandingPage,
    isPublic: true,
    title: 'RoadGuard AI — AI Road Damage & Civic Complaint System',
  },
  {
    path: ROUTES.LOGIN,
    component: Lazy.LoginPage,
    isPublic: true,
    title: 'Portal Login — RoadGuard AI',
  },
  {
    path: ROUTES.REGISTER,
    component: Lazy.RegisterPage,
    isPublic: true,
    title: 'Citizen Registration — RoadGuard AI',
  },
  {
    path: ROUTES.CITIZEN_DASHBOARD,
    component: Lazy.CitizenDashboardPage,
    isPublic: false,
    requiredRole: 'citizen',
    title: 'Citizen Dashboard — RoadGuard AI',
  },
  {
    path: ROUTES.OFFICIAL_DASHBOARD,
    component: Lazy.OfficialDashboardPage,
    isPublic: false,
    requiredRole: 'official',
    title: 'Operations Command Center — RoadGuard AI',
  },
];
