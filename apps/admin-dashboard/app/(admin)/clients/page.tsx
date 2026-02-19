import Link from "next/link";
import { clientService } from "@klema/db";
import { getTier } from "@klema/shared";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default async function ClientsPage() {
  const clients = await clientService.getAll();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-bold text-text">Clients</h1>
          <p className="text-[14px] text-text-dim mt-1">
            {clients.length} client{clients.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link href="/clients/new">
          <Button>+ New Client</Button>
        </Link>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-[12px] font-medium text-text-dim uppercase tracking-wider px-6 py-3">
                Client
              </th>
              <th className="text-left text-[12px] font-medium text-text-dim uppercase tracking-wider px-6 py-3">
                Tier
              </th>
              <th className="text-left text-[12px] font-medium text-text-dim uppercase tracking-wider px-6 py-3">
                Status
              </th>
              <th className="text-left text-[12px] font-medium text-text-dim uppercase tracking-wider px-6 py-3">
                Open Tasks
              </th>
              <th className="text-left text-[12px] font-medium text-text-dim uppercase tracking-wider px-6 py-3">
                Created
              </th>
              <th className="w-[60px]" />
            </tr>
          </thead>
          <tbody>
            {clients.map((client: Record<string, unknown>) => {
              const tier = getTier(client.tier_id as number);
              return (
                <tr
                  key={client.id as string}
                  className="border-b border-border last:border-0 hover:bg-card-hover transition-colors group"
                >
                  <td className="px-6 py-4">
                    <Link
                      href={`/clients/${client.id}`}
                      className="text-[14px] font-medium text-text hover:text-accent transition-colors"
                    >
                      {client.name as string}
                    </Link>
                    <p className="text-[12px] text-text-dim mt-0.5">
                      {client.primary_contact_email as string}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-[14px] text-text-dim">
                    {tier.name}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={client.status as string}>
                      {(client.status as string).replace("_", " ")}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-[14px] text-text-dim">
                    {client.open_tasks as number}
                  </td>
                  <td className="px-6 py-4 text-[13px] text-text-dim">
                    {new Date(client.created_at as string).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/clients/${client.id}`}
                      className="text-[13px] text-text-dim opacity-0 group-hover:opacity-100 transition-opacity hover:text-accent"
                    >
                      Open &rarr;
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {clients.length === 0 && (
          <div className="text-center py-12 text-text-dim text-[14px]">
            No clients yet.{" "}
            <Link href="/clients/new" className="text-accent hover:text-accent-hover">
              Create your first client
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
