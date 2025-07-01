import {
  IconAperture,
  IconLayoutDashboard,
  IconSchool,
  IconLogin,
  IconUsers,
  IconMoodHappy,
  IconCalendarWeek,
  IconFileCheck,
  IconNotebook,
  IconList,
  IconUser,
  IconFileAnalytics,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "HOME",
    roles: ["ADMIN", "EVALUATOR", "KA_HRD", "REKTOR"],
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
    roles: ["ADMIN", "EVALUATOR", "KA_HRD", "REKTOR"],
  },
  {
    navlabel: true,
    subheader: "PENILAIAN",
    roles: ["ADMIN", "EVALUATOR", "KA_HRD", "REKTOR"],
  },
  {
    id: uniqueId(),
    title: "Penilaian",
    icon: IconFileCheck,
    href: "/penilaian",
    roles: ["ADMIN", "EVALUATOR", "KA_HRD", "REKTOR"],
  },
  {
    id: uniqueId(),
    title: "Report",
    icon: IconFileAnalytics,
    href: "/report",
    roles: ["ADMIN", "EVALUATOR", "KA_HRD", "REKTOR"],
  },
  {
    navlabel: true,
    subheader: "MASTER DATA",
    roles: ["ADMIN"],
  },
  {
    id: uniqueId(),
    title: "Kriteria",
    icon: IconNotebook,
    href: "/kriteria",
    roles: ["ADMIN"],
  },
  {
    id: uniqueId(),
    title: "Sub Kriteria",
    icon: IconList,
    href: "/sub-kriteria",
    roles: ["ADMIN"],
  },
  {
    id: uniqueId(),
    title: "Dosen",
    icon: IconSchool,
    href: "/dosen",
    roles: ["ADMIN"],
  },
  {
    id: uniqueId(),
    title: "Periode",
    icon: IconCalendarWeek,
    href: "/periode",
    roles: ["ADMIN"],
  },
  {
    id: uniqueId(),
    title: "Homebase",
    icon: IconCalendarWeek,
    href: "/homebase",
    roles: ["ADMIN"],
  },
  {
    navlabel: true,
    subheader: "USER",
    roles: ["ADMIN"],
  },
  {
    id: uniqueId(),
    title: "User",
    icon: IconUsers,
    href: "/user",
    roles: ["ADMIN"],
  },
];

export default Menuitems;
