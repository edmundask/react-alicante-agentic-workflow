import { describe, expect, it } from "vitest";

import type { Session } from "@/types/session";

import { groupSessionsBySpeaker } from "./speakers";

function session(overrides: Partial<Session> = {}): Session {
  return {
    id: "a-session",
    title: "A session",
    speaker: "A speaker",
    track: "React",
    room: "Main Hall",
    startTime: "09:00",
    durationMinutes: 45,
    description: "",
    ...overrides,
  };
}

describe("groupSessionsBySpeaker", () => {
  it("groups sessions under their speaker", () => {
    const speakers = groupSessionsBySpeaker([
      session({ id: "s1", speaker: "Marta Fernandez", title: "Session 1" }),
      session({ id: "s2", speaker: "Iker Otxoa", title: "Session 2" }),
      session({ id: "s3", speaker: "Marta Fernandez", title: "Session 3" }),
    ]);

    expect(speakers).toEqual([
      {
        name: "Iker Otxoa",
        sessions: [
          session({ id: "s2", speaker: "Iker Otxoa", title: "Session 2" }),
        ],
      },
      {
        name: "Marta Fernandez",
        sessions: [
          session({ id: "s1", speaker: "Marta Fernandez", title: "Session 1" }),
          session({ id: "s3", speaker: "Marta Fernandez", title: "Session 3" }),
        ],
      },
    ]);
  });

  it("sorts speakers by name", () => {
    const speakers = groupSessionsBySpeaker([
      session({ id: "s1", speaker: "Sofia Almeida" }),
      session({ id: "s2", speaker: "Diego Castellanos" }),
    ]);

    expect(speakers.map((speaker) => speaker.name)).toEqual([
      "Diego Castellanos",
      "Sofia Almeida",
    ]);
  });

  it("keeps a speaker's own sessions in the order they arrive", () => {
    const speakers = groupSessionsBySpeaker([
      session({ id: "later", speaker: "Marta Fernandez", startTime: "14:00" }),
      session({
        id: "earlier",
        speaker: "Marta Fernandez",
        startTime: "09:00",
      }),
    ]);

    expect(speakers[0].sessions.map((s) => s.id)).toEqual(["later", "earlier"]);
  });

  it("excludes the closing panel's placeholder speaker", () => {
    const speakers = groupSessionsBySpeaker([
      session({ id: "s1", speaker: "Marta Fernandez" }),
      session({ id: "closing-panel", speaker: "Full speaker lineup" }),
    ]);

    expect(speakers).toEqual([
      {
        name: "Marta Fernandez",
        sessions: [session({ id: "s1", speaker: "Marta Fernandez" })],
      },
    ]);
  });

  it("returns nothing for no sessions", () => {
    expect(groupSessionsBySpeaker([])).toEqual([]);
  });
});
