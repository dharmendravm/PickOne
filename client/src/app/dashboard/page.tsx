import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import type { CustomUser } from "../api/auth/[...nextauth]/options";

import Navbar from "@/components/Navbar";
import AddBattle from "@/components/battle/AddBattle";
import BattleCard from "@/components/battle/BattleCard";
import { SwordsIcon } from "lucide-react";
import { getBattles, type Battle } from "@/lib/battle";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user as CustomUser | undefined;
  const firstName = session?.user?.name?.split(" ")[0] ?? "there";
  let battles: Battle[] = [];

  if (user?.token) {
    try {
      battles = await getBattles(user.token);
    } catch (error) {
      console.error("Failed to fetch battles", error);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto max-w-5xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {firstName}</h1>
            <p className="mt-1 text-muted-foreground">
              Create and manage your battles.
            </p>
          </div>

          {user && <AddBattle user={user} />}
        </div>

        {battles.length === 0 ? (
          <div className="flex min-h-87.5 flex-col items-center justify-center rounded-lg border border-dashed">
            <SwordsIcon className="mb-4 h-10 w-10 text-muted-foreground" />

            <h2 className="text-xl font-semibold">No battles yet</h2>

            <p className="mt-2 max-w-sm text-center text-sm text-muted-foreground">
              Create your first battle to get started.
            </p>

            <div className="mt-6">{user && <AddBattle user={user} />}</div>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {battles.map((battle) => (
              <BattleCard key={battle.id} battle={battle} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
