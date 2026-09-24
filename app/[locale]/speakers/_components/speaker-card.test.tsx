import { describe, expect, it } from "vitest";

import { render, screen } from "@/tests/utils/render";
import type { SpeakerWithSessions } from "@/utils/speakers";

import { SpeakerCard } from "./speaker-card";

const speaker: SpeakerWithSessions = {
  name: "Marta Fernandez",
  sessions: [
    {
      id: "opening-keynote",
      title: "Opening Keynote",
      speaker: "Marta Fernandez",
      track: "Architecture",
      level: "beginner",
      room: "Main Hall",
      startTime: "09:00",
      durationMinutes: 30,
      description: "",
    },
  ],
};

describe("SpeakerCard", () => {
  it("shows the speaker's name and each session's time and title", () => {
    render(<SpeakerCard speaker={speaker} />);

    expect(screen.getByText("Marta Fernandez")).toBeInTheDocument();
    expect(screen.getByText("09:00")).toBeInTheDocument();
    expect(screen.getByText("Opening Keynote")).toBeInTheDocument();
  });

  it("links each session to its session page", () => {
    render(<SpeakerCard speaker={speaker} />);

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/en/sessions/opening-keynote",
    );
  });

  it("renders one link per session when a speaker has more than one", () => {
    const busySpeaker: SpeakerWithSessions = {
      name: "Marta Fernandez",
      sessions: [
        speaker.sessions[0],
        {
          ...speaker.sessions[0],
          id: "closing-panel",
          title: "Closing Panel",
          startTime: "16:30",
        },
      ],
    };

    render(<SpeakerCard speaker={busySpeaker} />);

    expect(screen.getAllByRole("link")).toHaveLength(2);
    expect(screen.getByText("Closing Panel")).toBeInTheDocument();
  });
});
