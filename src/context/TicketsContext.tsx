import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { triage, type TriageResult, type Priority } from "@/lib/triage";
import { findCategory, type Department } from "@/data/categories";
import { pickOfficer } from "@/lib/officers";

export type TicketStatus = "submitted" | "acknowledged" | "in-progress" | "resolved";

export interface Ticket {
  id: string;
  userId: string;
  categoryId: string;
  subcategoryEn?: string;
  description: string;
  priority: Priority;
  slaHours: number;
  department: Department;
  secondaryDepartments: Department[];
  reason: string;
  firstResponse: string;
  status: TicketStatus;
  officer: string;
  area: string;
  coords?: { lat: number; lng: number };
  photos: string[];                 // data URLs
  createdAt: string;                // ISO
  acknowledgedAt?: string;
  inProgressAt?: string;
  resolvedAt?: string;
  rating?: number;                  // 1..5
}

export interface AppNotification {
  id: string;
  kind: "personal" | "broadcast";
  title: string;
  body: string;
  ticketId?: string;
  createdAt: string;
  read: boolean;
}

interface Ctx {
  tickets: Ticket[];
  notifications: AppNotification[];
  unreadCount: number;
  createTicket: (
    input: {
      userId: string; categoryId: string; subcategoryEn?: string; description: string;
      area: string; coords?: { lat: number; lng: number }; photos?: string[];
    },
  ) => { ticket: Ticket; triage: TriageResult } | { error: "rate-limit" };
  advanceStatus: (id: string, status: TicketStatus) => void;
  rateTicket: (id: string, rating: number) => void;
  markAllRead: () => void;
  reset: () => void;
}

const TicketsContext = createContext<Ctx | null>(null);
const TICKETS_KEY = "gramsewa.tickets";
const NOTIFS_KEY = "gramsewa.notifications";

const seedBroadcasts = (): AppNotification[] => [
  {
    id: "B-1001",
    kind: "broadcast",
    title: "Planned water outage — Adajan zone",
    body: "Water supply will be interrupted on Saturday 9am–1pm for pipeline repairs.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    read: false,
  },
  {
    id: "B-1002",
    kind: "broadcast",
    title: "Swachh Bharat drive — Sunday",
    body: "Volunteers welcome at the village square from 7am. Bags & gloves provided.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    read: true,
  },
];

export const TicketsProvider = ({ children }: { children: ReactNode }) => {
  const [tickets, setTickets] = useState<Ticket[]>(() => {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(localStorage.getItem(TICKETS_KEY) ?? "[]") as Ticket[]; } catch { return []; }
  });
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    if (typeof window === "undefined") return seedBroadcasts();
    try {
      const raw = localStorage.getItem(NOTIFS_KEY);
      if (raw) return JSON.parse(raw) as AppNotification[];
    } catch { /* ignore */ }
    return seedBroadcasts();
  });

  useEffect(() => { try { localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets)); } catch { /* ignore */ } }, [tickets]);
  useEffect(() => { try { localStorage.setItem(NOTIFS_KEY, JSON.stringify(notifications)); } catch { /* ignore */ } }, [notifications]);

  const pushNotif = useCallback((n: Omit<AppNotification, "id" | "createdAt" | "read">) => {
    setNotifications((prev) => [
      { ...n, id: `N-${Date.now()}-${Math.floor(Math.random() * 1000)}`, createdAt: new Date().toISOString(), read: false },
      ...prev,
    ]);
  }, []);

  const createTicket: Ctx["createTicket"] = (input) => {
    // Rate limit: max 3 tickets per 24h per user
    const since = Date.now() - 1000 * 60 * 60 * 24;
    const recent = tickets.filter((t) => t.userId === input.userId && new Date(t.createdAt).getTime() > since);
    if (recent.length >= 3) return { error: "rate-limit" };

    const result = triage(input.categoryId, input.description);
    const cat = findCategory(input.categoryId);
    const officer = pickOfficer(result.department);
    const ticket: Ticket = {
      id: `SUR-${Date.now().toString().slice(-6)}`,
      userId: input.userId,
      categoryId: input.categoryId,
      subcategoryEn: input.subcategoryEn,
      description: input.description,
      priority: result.priority,
      slaHours: result.slaHours,
      department: result.department,
      secondaryDepartments: result.secondaryDepartments,
      reason: result.reason,
      firstResponse: result.firstResponse,
      status: "submitted",
      officer,
      area: input.area,
      coords: input.coords,
      photos: input.photos ?? [],
      createdAt: new Date().toISOString(),
    };

    setTickets((prev) => [ticket, ...prev]);
    pushNotif({
      kind: "personal",
      title: `Ticket ${ticket.id} submitted`,
      body: `${cat?.label.en ?? "Issue"} • ${result.priority} • ${result.department}`,
      ticketId: ticket.id,
    });

    // Mock progression: acknowledged after 8s
    setTimeout(() => {
      setTickets((prev) => prev.map((t) => t.id === ticket.id && t.status === "submitted"
        ? { ...t, status: "acknowledged", acknowledgedAt: new Date().toISOString() } : t));
      pushNotif({ kind: "personal", title: `Ticket ${ticket.id} acknowledged`, body: `Officer ${officer} reviewing now.`, ticketId: ticket.id });
    }, 8000);

    // In-progress after 18s for visible demo flow
    setTimeout(() => {
      setTickets((prev) => prev.map((t) => t.id === ticket.id && (t.status === "acknowledged" || t.status === "submitted")
        ? { ...t, status: "in-progress", inProgressAt: new Date().toISOString() } : t));
      pushNotif({ kind: "personal", title: `Ticket ${ticket.id} in progress`, body: `${result.department} is working on it.`, ticketId: ticket.id });
    }, 18000);

    return { ticket, triage: result };
  };

  const advanceStatus: Ctx["advanceStatus"] = (id, status) => {
    setTickets((prev) => prev.map((t) => {
      if (t.id !== id) return t;
      const stamp = new Date().toISOString();
      const next: Ticket = { ...t, status };
      if (status === "acknowledged") next.acknowledgedAt = stamp;
      if (status === "in-progress") next.inProgressAt = stamp;
      if (status === "resolved") next.resolvedAt = stamp;
      return next;
    }));
    if (status === "resolved") {
      pushNotif({ kind: "personal", title: `Ticket ${id} resolved`, body: "Please rate the resolution.", ticketId: id });
    }
  };

  const rateTicket: Ctx["rateTicket"] = (id, rating) =>
    setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, rating } : t)));

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const reset = () => { setTickets([]); setNotifications(seedBroadcasts()); };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <TicketsContext.Provider value={{ tickets, notifications, unreadCount, createTicket, advanceStatus, rateTicket, markAllRead, reset }}>
      {children}
    </TicketsContext.Provider>
  );
};

export const useTickets = () => {
  const ctx = useContext(TicketsContext);
  if (!ctx) throw new Error("useTickets must be used within TicketsProvider");
  return ctx;
};
