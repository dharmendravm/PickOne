import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";

import { getToken } from "next-auth/jwt";
import { headers } from "next/headers";

const token = await getToken({
  req: {
    headers: await headers(),
  } as any,
});

console.log(token);
export default async function Page() {
  const session = await getServerSession(authOptions);
  return(
    <main>
      <p>
        {JSON.stringify(session)}
        
      </p>
      <p>{token as string | null}</p>
    </main>
  );
}
