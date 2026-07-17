import { CalendarClockIcon } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";

import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Battle } from "@/lib/battle";
import BattleCartMenu from "./BattleCartMenu";

export default function BattleCard({ battle }: { battle: Battle }) {
  return (
    <Card className="gap-0 py-0 shadow-sm">
      <Image
        src={battle.image}
        alt={battle.title}
        width={800}
        height={500}
        className="aspect-16/10 w-full object-cover"
      />
      <CardHeader className="pt-5">
        <CardTitle>{battle.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {battle.description}
        </CardDescription>
        <CardAction>
          <BattleCartMenu battle={battle} />
        </CardAction>
      </CardHeader>
      <CardFooter className="gap-2 border-0 bg-transparent pt-0 text-xs text-muted-foreground">
        <CalendarClockIcon className="size-3.5" aria-hidden="true" />
        Expires {format(new Date(battle.expires_at), "PPP")}
      </CardFooter>
    </Card>
  );
}
