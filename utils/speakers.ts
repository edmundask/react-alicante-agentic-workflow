import type { Session } from "@/types/session";

export interface SpeakerWithSessions {
  name: string;
  sessions: Session[];
}

/**
 * The closing panel's `speaker` column holds "Full speaker lineup" — a
 * placeholder for the whole day's speakers, not a real individual. There's no
 * dedicated flag for this in the schema, so it's excluded by value.
 */
const NOT_A_SPEAKER = "Full speaker lineup";

/**
 * Groups sessions by speaker, sorted by speaker name. `fetchSessions` already
 * orders sessions by `startTime`, so each speaker's own sessions stay
 * chronological for free — this only groups, it never re-sorts within a
 * speaker.
 */
export function groupSessionsBySpeaker(
  sessions: Session[],
): SpeakerWithSessions[] {
  const bySpeaker = new Map<string, Session[]>();

  for (const session of sessions) {
    if (session.speaker === NOT_A_SPEAKER) continue;

    const existing = bySpeaker.get(session.speaker);
    if (existing) {
      existing.push(session);
    } else {
      bySpeaker.set(session.speaker, [session]);
    }
  }

  return Array.from(bySpeaker, ([name, speakerSessions]) => ({
    name,
    sessions: speakerSessions,
  })).sort((a, b) => a.name.localeCompare(b.name));
}
