import {
  Activity, ArrowDown, ArrowLeft, ArrowRight, Award, ChartColumn, Check, ChevronDown, CircleCheck, ClipboardCheck,
  Cloud, Globe, LifeBuoy, Mail, Menu, MessagesSquare, Phone, Rocket, Server, Settings2, ShieldCheck,
  Smartphone, Wifi, X, BrainCircuit, type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Activity, ArrowDown, ArrowLeft, ArrowRight, Award, BarChart3: ChartColumn, Check, ChevronDown,
  CircleCheck, ClipboardCheck, Cloud, Globe, LifeBuoy, Mail, Menu, MessagesSquare, Phone, Rocket, Server, Settings2,
  ShieldCheck, Smartphone, Wifi, X, BrainCircuit,
};

export function Icon({ name, size = 18 }: { name: string; size?: number }) {
  const C = ICONS[name];
  return C ? <C size={size} strokeWidth={1.5} style={{ display: "block", flex: "none" }} aria-hidden /> : null;
}
