import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { configLinks, GameType } from "../lib/config";

// Types
export interface Participant {
  id: string;
  tickets: number;
}

export interface RegisterResponse {
  status: string; // GAS returns "ok" or "error"
  message?: string;
  tickets?: number;
}

// ─── GAS compatibility helpers ────────────────────────────────────────────────

// Google Apps Script expects human-readable game names, not camelCase keys
const gasGameName: Record<GameType, string> = {
  freeFire: "Free Fire",
  roblox: "Roblox",
  fortnite: "Fortnite",
};

// GAS response key for each game tab
const gasGameKey: Record<GameType, "freeFire" | "roblox" | "fortnite"> = {
  freeFire: "freeFire",
  roblox: "roblox",
  fortnite: "fortnite",
};

/**
 * Fetch that is compatible with Google Apps Script.
 *
 * GAS requirements:
 *   - redirect: "follow"  — GAS issues a redirect before serving the response
 *   - Content-Type: text/plain;charset=utf-8 for POST — avoids CORS preflight
 *     (application/json triggers an OPTIONS preflight that GAS does not handle)
 *   - Parse response as text first, then JSON — GAS may return text/html content-type
 */
async function gasFetch(url: string, options?: RequestInit): Promise<unknown> {
  const res = await fetch(url, {
    redirect: "follow",
    ...options,
  });
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`Invalid JSON from GAS: ${text.slice(0, 200)}`);
  }
}

// ─── Placeholder / mock ────────────────────────────────────────────────────────

const isPlaceholderUrl =
  configLinks.apiUrl === "URL_DE_TU_GOOGLE_APPS_SCRIPT_AQUI";

const generateMockParticipants = (): Participant[] => [
  { id: "GamerPro99", tickets: 7 },
  { id: "NoobMaster", tickets: 3 },
  { id: "CatLover_x", tickets: 7 },
  { id: "NinjaStrike", tickets: 2 },
  { id: "ShadowX", tickets: 5 },
];

const mockTicketStore: Record<string, number> = {};

// ─── Hooks ─────────────────────────────────────────────────────────────────────

export function useParticipants(game: GameType) {
  return useQuery({
    queryKey: ["participants", game],
    queryFn: async (): Promise<Participant[]> => {
      if (isPlaceholderUrl) {
        await new Promise((resolve) => setTimeout(resolve, 800));
        return generateMockParticipants();
      }

      try {
        const data = (await gasFetch(configLinks.apiUrl)) as Record<
          string,
          Participant[]
        >;
        // GAS returns { freeFire: [...], roblox: [...], fortnite: [...] }
        const key = gasGameKey[game];
        return Array.isArray(data[key]) ? data[key] : [];
      } catch (error) {
        console.warn("API Fetch failed, using fallback:", error);
        return generateMockParticipants();
      }
    },
    refetchInterval: 15000, // Auto-refresh every 15 seconds
  });
}

export function useRegisterTicket() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      juego,
    }: {
      id: string;
      juego: GameType;
    }): Promise<RegisterResponse> => {
      if (isPlaceholderUrl) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const currentTickets = mockTicketStore[id] || 0;
        if (currentTickets >= 7) {
          return { status: "error", message: "Maximum tickets reached" };
        }
        mockTicketStore[id] = currentTickets + 1;
        return { status: "ok", tickets: mockTicketStore[id] };
      }

      // POST to GAS:
      // - Content-Type must be text/plain;charset=utf-8 to avoid CORS preflight
      // - Body is still a JSON string — GAS reads it via e.postData.contents
      const data = (await gasFetch(configLinks.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({ id, juego: gasGameName[juego] }),
      })) as RegisterResponse;

      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["participants", variables.juego],
      });
    },
  });
}
