import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "../../app/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  className?: string;
}

const MetricCard = ({ title, value, description, className }: MetricCardProps) => {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricCard; 