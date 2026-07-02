import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  return(
    <main>
      <p>
        {JSON.stringify(session?.user)}
      </p>
    </main>
  );
}
