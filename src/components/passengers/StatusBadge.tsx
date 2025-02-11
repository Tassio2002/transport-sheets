import { cn } from "../../app/lib/utils";

interface StatusBadgeProps {
  status: "NOME CONFIRMADO" | "PAGO" | "PENDENTE";
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        {
          "bg-green-100 text-green-800": status === "PAGO",
          "bg-yellow-100 text-yellow-800": status === "NOME CONFIRMADO",
          "bg-red-100 text-red-800": status === "PENDENTE",
        }
      )}
    >
      {status}
    </span>
  );
};

export default StatusBadge; 