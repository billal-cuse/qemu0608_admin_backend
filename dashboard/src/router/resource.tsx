import {
  FileText,
  Hand,
  HandHeart,
  LayoutDashboard,
  Plane,
  Settings,
} from "lucide-react";
import Dashboard from "../pages/statistics/dashboard";
import SubmissionList from "../pages/submissions/list";
import AirlinesList from "../pages/airlines/list";
import AssessmentList from "../pages/assessment/list";
import PaymentList from "../pages/payments/list";
import SettingsPage from "../pages/settings/list";
import { ResourceProps } from "@refinedev/core";

export const resources: ResourceProps[] = [
  {
    name: "statistics",
    list: Dashboard,
    meta: {
      icon: <LayoutDashboard />,
    },
  },
  {
    name: "submissions",
    list: SubmissionList,
    meta: {
      icon: <Hand />,
    },
  },
  {
    name: "airlines",
    list: AirlinesList,
    meta: {
      icon: <Plane />,
    },
  },
  {
    name: "assessments",
    list: AssessmentList,
    meta: {
      icon: <FileText />,
    },
  },
  {
    name: "payments",
    list: PaymentList,
    meta: {
      icon: <HandHeart />,
    },
  },
  {
    name: "user",
    list: SettingsPage,
    meta: {
      icon: <Settings />,
      label: "Settings",
    },
  },
];
